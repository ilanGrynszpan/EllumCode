from django.shortcuts import render

from django.http import HttpResponse

from rest_framework import generics
from .models import Servico
from .serializers import ServicoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets

import datetime
from datetime import timedelta
from django.utils import timezone

from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt

from carteira.models import Carteira 
from pagamento.models import Pagamento
from credito.models import Credito 

from carteira.serializers import CarteiraSerializer

from uuid import uuid4

import json

# Create your views here.

class ServicoViewSet(viewsets.ModelViewSet):

    serializer_class = ServicoSerializer
    queryset = Servico.objects.all()

    def list(self, request):

        queryset = Servico.objects.all()
        serializer = ServicoSerializer(queryset, many = True)
        print(request)
        return Response(serializer.data)

    def retrieve(self, request, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        selected_service = Servico.objects.get(id_servico = pk)
        serializer = ServicoSerializer(selected_service)
        return Response(serializer.data)
    
    def create(self, request):

        create_data = request.data

        id_servico = str(create_data['id_usuario']) + str(int(datetime.datetime.now().timestamp()))
        id_usuario = str(create_data['id_usuario'])
        area_atuacao = str(create_data['area_atuacao'])
        nome_servico = str(create_data['nome_servico'])

        novo_servico = Servico(area_atuacao, nome_servico, id_usuario, id_servico)
        novo_servico.clean()
        novo_servico.save()

        service_wallet = Carteira(id_usuario = id_usuario,\
        id_servico = id_servico,\
        credito = 0.00)

        service_wallet.clean()
        service_wallet.save()

        return(Response({"flag":"service_created", "service_data":ServicoSerializer(novo_servico).data, "service_wallet":CarteiraSerializer(service_wallet).data}))

    def destroy(self, request, pk = None):

        if pk is None or len(pk) < 1:
            return(HttpResponseNotFound("notfound"))
        
        instance = self.aux_destroy(pk)
        return(Response({"flag":"destroyed", "data":instance}))

    def aux_destroy(pk):

        pagamento_comprador = Pagamento.objects.filter(id_pagador = pk)
        pagamento_vendedor = Pagamento.objects.filter(id_receptor = pk)
        creditos = Credito.objects.filter(servico_id = pk)
        carteiras = Carteira.objects.filter(id_servico = pk)

        print("ok begins")

        for compra in pagamento_comprador:
            compra.destroy()
            
        for venda in pagamento_vendedor:
            venda.destroy()
            
        for credito in creditos:
            credito.destroy()
            
        for carteira in carteiras:
            carteira.destroy()

        print("ateh aqui chega " + str(pk))
            
        instance = Servico.objects.get(id_servico = pk)

        print(instance)
        instance.delete()

        return ServicoSerializer(instance).data

    @action(detail = False, methods = ['get'])
    def get_service_list(self, request):

        user_id = self.request.query_params['user_id']

        if user_id is None or len(user_id) < 1:
            return Response({"user_id":"wrong_entry"})

        services_get = Servico.objects.filter(id_usuario = str(user_id))

        if len(services_get) < 1:
            return Response({"service_list":"user_not_found"})

        service_list = []
        for service in services_get:
            service_list.append(ServicoSerializer(service).data)

        return Response({"service_list": service_list})
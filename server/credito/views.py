from django.shortcuts import render
from rest_framework import generics
from .models import Credito
from .serializers import CreditoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from usuario.models import Usuario 
from carteira.models import Carteira
from carteira.serializers import CarteiraSerializer
from devolucao.models import Devolucao
from devolucao.serializers import DevolucaoSerializer
from rest_framework import viewsets
from rest_framework.decorators import action

from django.views.decorators.csrf import csrf_exempt

import datetime
from datetime import timedelta
from django.utils import timezone

class CreditoViewSet(viewsets.ModelViewSet):

    queryset = Credito.objects.all()
    serializer_class = CreditoSerializer

    def list(self, request):

        queryset = Credito.objects.all()
        serializer = CreditoSerializer(queryset, many = True)
        print(request)
        return Response(serializer.data)

    def retrieve(self, request, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        selected_credit = Credito.objects.get(id_servico = pk)
        serializer = CreditoSerializer(selected_credit)
        return Response(serializer.data)
    
    def create(self, request):

        create_data = request.data
        
        credit_id = str(create_data['servico_id']) + str(datetime.datetime.now().timestamp())
        service_id = str(create_data['servico_id'])
        user_id = str(create_data['user_id'])
        valor = float(create_data['valor'])

        novo_credito_cadastrado = Credito(credit_id, service_id, user_id, valor)
        novo_credito_cadastrado.clean()
        novo_credito_cadastrado.save()

        #self.validar_credito(credit_id)

        return Response('ok')

    # metodo auxiliar

    @action(detail = True, methods = ['get','post'])
    def validar_credito(self, pk = None):

        if len(pk) < 1:
            return Response("entry_error")
        
        selected_credit = Credito.objects.get(credito_id = pk)
        serializer = CreditoSerializer(selected_credit)

        if serializer.data['situacao'] != "pendente":
            return Response("previously_conceeded")
        
        print(serializer.data['servico_id'])
        selected_wallet = Carteira.objects.get(id_servico = str(serializer.data['servico_id']))
        selected_wallet_serialized = CarteiraSerializer(selected_wallet)

        credito_atual_servico = CarteiraSerializer(Carteira.objects.get(id_servico = serializer.data['servico_id']))\
        .data['credito']
        
        Credito.objects.filter(credito_id = pk).update(situacao = "aprovado")
        Carteira.objects.filter(id_servico = serializer.data['servico_id'])\
        .update(credito = float(credito_atual_servico) + float(serializer.data['valor']))

        # devolucao

        devolucao_id = pk
        user_id = CarteiraSerializer(selected_wallet).data['id_usuario']
        valor_dev = float(serializer.data['valor']) * (1 + float(serializer.data['taxa_juros']))
        data_vencimento = timezone.now() + timedelta(days=30)

        cadastro_devolucao = Devolucao(devolucao_id, user_id, valor_dev, data_vencimento)
        cadastro_devolucao.clean()
        cadastro_devolucao.save()

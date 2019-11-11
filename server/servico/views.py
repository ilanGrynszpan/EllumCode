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

from django.views.decorators.csrf import csrf_exempt

from carteira.models import Carteira 

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

        id_servico = str(create_data['id_usuario']) + str(datetime.datetime.now().timestamp())
        id_usuario = str(create_data['id_usuario'])
        area_atuacao = str(create_data['area_atuacao'])
        nome_servico = str(create_data['nome_servico'])

        novo_servico = Servico(id_servico, id_usuario, area_atuacao, nome_servico)
        novo_servico.clean()
        novo_servico.save()

        return(Response({"flag":"service_created", "data":ServicoSerializer(novo_servico).data}))

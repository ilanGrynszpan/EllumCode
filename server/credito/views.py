from django.shortcuts import render
from rest_framework import generics
from .models import Credito
from .serializers import CreditoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from usuario.models import Usuario 

from uuid import uuid4

# Create your views here.

class CreditList(generics.ListCreateAPIView):

    queryset = Credito.objects.all()
    serializer_class = CreditoSerializer

    parser_classes = (JSONParser,)

    def perform_create(self, serializer):
        
        credito_id_str = str(self.request.data['servico_id']) + "crd" + str(uuid4())
        serializer.save(credito_id=credito_id_str, valor = self.request.data['valor'])

        cscore = Usuario.objects.get(user_id = "ff1cdf8949da41a58a9ffbbd822fdffb").credit_score

        credit_dispatcher = CreditDispatcher(self.request.data['valor'], cscore)
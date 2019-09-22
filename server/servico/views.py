from django.shortcuts import render

from django.http import HttpResponse

from rest_framework import generics
from .models import Servico
from .serializers import ServicoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.decorators.csrf import csrf_exempt

from carteira.models import Carteira 

from uuid import uuid4

import json

# Create your views here.

class ServicoList(generics.ListCreateAPIView):

    serializer_class = ServicoSerializer

    parser_classes = (JSONParser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        queryset = Servico.objects.all()
        serializer_class = ServicoSerializer(many = True)

        return queryset
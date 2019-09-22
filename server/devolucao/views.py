from django.shortcuts import render
from rest_framework import generics
from .models import Devolucao
from .serializers import DevolucaoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from uuid import uuid4

# Create your views here.

class DevolucaoList(generics.ListCreateAPIView):

    queryset = Devolucao.objects.all()
    serializer_class = DevolucaoSerializer

    parser_classes = (JSONParser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        queryset = Devolucao.objects.all()
        serializer_class = DevolucaoSerializer(many = True)

        return queryset
from django.http import HttpResponse

from django.shortcuts import render
from rest_framework import generics
from .models import Conta
from .serializers import ContaSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.decorators.csrf import csrf_exempt

class ContaList(generics.ListCreateAPIView):

    queryset = Conta.objects.all()
    serializer_class = ContaSerializer

    parser_classes = (JSONParser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        queryset = Conta.objects.all()
        serializer_class = ContaSerializer(many = True)

        usuario_id = self.request.query_params.get('usuario_id', None)
        
        if usuario_id is not None:
            queryset = queryset.filter(usuario_id=usuario_id)

        return queryset
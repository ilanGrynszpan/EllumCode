from django.http import HttpResponse

from django.shortcuts import render
from rest_framework import generics
from .models import Pagamento
from .serializers import PagamentoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.decorators.csrf import csrf_exempt

class PagamentoList(generics.ListCreateAPIView):

    queryset = Pagamento.objects.all()
    serializer_class = PagamentoSerializer

    parser_classes = (JSONParser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        queryset = Pagamento.objects.all()
        serializer_class = PagamentoSerializer(many = True)

        return queryset
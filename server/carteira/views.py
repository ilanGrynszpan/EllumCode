from django.http import HttpResponse

from django.shortcuts import render
from rest_framework import generics
from .models import Carteira
from .serializers import CarteiraSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.decorators.csrf import csrf_exempt

class CarteiraList(generics.ListCreateAPIView):

    queryset = Carteira.objects.all()
    serializer_class = CarteiraSerializer

    parser_classes = (JSONParser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        queryset = Carteira.objects.all()
        serializer_class = CarteiraSerializer(many = True)

        service_id = self.request.query_params.get('service_id', None)
        
        if service_id is not None:
            queryset = queryset.filter(service_id=service_id)

        return queryset
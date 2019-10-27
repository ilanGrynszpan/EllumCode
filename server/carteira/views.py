from django.http import HttpResponse

from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import generics
from .models import Carteira
from .serializers import CarteiraSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import viewsets

from django.views.decorators.csrf import csrf_exempt

class CarteiraViewSet(viewsets.ModelViewSet):

    queryset = Carteira.objects.all()
    serializer_class = CarteiraSerializer

    def list(self, request):

        queryset = Carteira.objects.all()
        print("aqui irmao")
        serializer = CarteiraSerializer(queryset, many = True)
        print(request)
        return Response(serializer.data)

    def retrieve(self, request, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        selected_wallet = Carteira.objects.get(id_servico = pk)
        serializer = CarteiraSerializer(selected_wallet)
        return Response(serializer.data)
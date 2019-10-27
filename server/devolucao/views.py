from django.http import HttpResponse

from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import generics
from .models import Devolucao
from .serializers import DevolucaoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import viewsets

from django.views.decorators.csrf import csrf_exempt

class DevolucaoViewSet(viewsets.ModelViewSet):

    queryset = Devolucao.objects.all()
    serializer_class = DevolucaoSerializer

    def list(self, request):

        queryset = Devolucao.objects.all()
        serializer = DevolucaoSerializer(queryset, many = True)
        print(request)
        return Response(serializer.data)

    def retrieve(self, request, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        selected_dev = Devolucao.objects.get(id_devolucao = pk)
        serializer = DevolucaoSerializer(selected_dev)
        return Response(serializer.data)
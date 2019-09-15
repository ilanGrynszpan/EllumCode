from django.shortcuts import render

from .models import Usuario
from .serializers import UsuarioSerializer

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

class UsuarioView(generics.ListCreateAPIView):

    serializer_class = UsuarioSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Usuario.objects.all()

        try:
        
            celular = self.kwargs['celular']
            senha = self.kwargs['senha']

            if celular is not None and senha is not None:
                
                queryset = queryset.filter(celular = celular)
                passcode_check = UsuarioSerializer(queryset[0]).data['senha']

                print(passcode_check)

                if passcode_check != senha:

                    queryset = Usuario.objects.all()
        
        except KeyError:

            print("there was a key error")

        return queryset
        
        
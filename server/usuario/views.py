from django.shortcuts import render

from .models import Usuario
from .serializers import UsuarioSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import viewsets

from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import action

class UsuarioViewSet(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def list(self, request):

        queryset = Usuario.objects.all()
        serializer = UsuarioSerializer(queryset, many = True)
        print(request)
        return Response(serializer.data)

    def retrieve(self, request, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        selected_user = Usuario.objects.get(id_usuario = pk)
        serializer = UsuarioSerializer(selected_user)
        return Response(serializer.data)

    @action(detail = True, methods = ['get','post'])
    def auth_user(self, request, pk = None):

        if 'cpf' not in request.data:
            return Response("no_cpf_was_sent")
 
        elif len(request.data['cpf']) == 0:
            return Response("no_cpf_input")

        user = Usuario.objects.filter(cpf = request.data['cpf'])

        if len(user) == 0:
            return Response("no_such_cpf_on_records")

        user_serialized = UsuarioSerializer(user[0])

        pk = user_serialized.data['id_usuario']

        if request.data['senha'] == user_serialized.data['senha']:

            Usuario.objects.filter(id_usuario = pk).update(is_logged = True)
            return Response(user_serialized.data)
            
        elif request.data['senha'] != user_serialized.data['senha'] and len(request.data['senha']) > 0:
            return Response("not_auth_wrong_passcode")
            
        return Response("no_passcode_received")
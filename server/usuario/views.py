from django.shortcuts import render

from .models import Usuario
from .serializers import UsuarioSerializer

from carteira.models import Carteira
from carteira.serializers import CarteiraSerializer

from conta.models import Conta
from conta.serializers import ContaSerializer

from servico.models import Servico
from servico.serializers import ServicoSerializer
from servico.views import ServicoViewSet

from devolucao.models import Devolucao
from devolucao.serializers import DevolucaoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import viewsets, filters

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
    
    def destroy(self, request, pk = None):

        if pk is None or len(pk) < 1:
            return(HttpResponseNotFound("notfound"))
        
        devolucoes = Devolucao.objects.filter(id_usuario = pk)
        contas = Conta.objects.filter(id_usuario = pk)
        servicos = Servico.objects.filter(id_usuario = pk)

        print("eh ate aqui")

        for dev in devolucoes:
            dev.destroy()
        
        for conta in contas:
            conta.destroy()
        
        for servico in servicos:
            print("gets 1")
            serv_pk = ServicoSerializer(servico).data['id_servico']
            print("gets here mate")
            ServicoViewSet.aux_destroy(serv_pk)
        
        instance = Usuario.objects.get(id_usuario = pk)
        instance.delete()

        return(Response({"flag":"destroyed", "data":UsuarioSerializer(instance).data}))

    def create(self, request):

        create_data = request.data

        if 'nome' not in create_data:
            return Response("no_name_sent")
        
        elif 'cpf' not in create_data:
            return Response("no_cpf_sent")
        
        elif 'celular' not in create_data:
            return Resposne('no_cellphone_sent')
        
        elif 'senha' not in create_data:
            return Response('no_passcode_sent')

        check_cpf_exists = Usuario.objects.filter(cpf = create_data['cpf'])
        check_celular_exists = Usuario.objects.filter(celular = create_data['celular'])
        
        if len(check_cpf_exists) > 0:
            return Response('user_cpf_already_registered')
        
        elif len(check_celular_exists) > 0:
            return Response('user_celular_already_registered')

        new_user = Usuario(nome = create_data['nome'],\
        cpf = create_data['cpf'],\
        celular = create_data['celular'],\
        senha = create_data['senha'])

        new_user.clean()
        new_user.save()

        user_get = Usuario.objects.filter(cpf = create_data['cpf'])
        user_get_data = UsuarioSerializer(user_get[0])

        #return Response(user_get_data.data)
        
        first_service = Servico(id_usuario = user_get_data.data['id_usuario'],\
        area_atuacao = 'master',\
        nome_servico = 'service_master_name3558')

        first_service.clean()
        first_service.save()

        service_data = ServicoSerializer(first_service)
        
        #return Response(service_data.data)

        user_wallet = Carteira(id_usuario = user_get_data.data['id_usuario'],\
        id_servico = service_data.data['id_servico'],\
        credito = 0.00)

        user_wallet.clean()
        user_wallet.save()

        wallet_get_data = CarteiraSerializer(user_wallet)
        return Response([user_get_data.data, service_data.data, wallet_get_data.data])

    @action(detail = False, methods = ['get'])
    def get_user_id(self, request):

        cpf = self.request.query_params['cpf']

        if cpf is None or len(cpf) < 1:
            return Response({"user_id":"wrong_entry"})

        
        print("cpf = " + str(cpf))
        user_get = Usuario.objects.filter(cpf = str(cpf))
        print(user_get)
        if len(user_get) < 1:
            return Response({"user_id":"cpf_not_found"})

        user_id = (UsuarioSerializer(user_get[0]).data)['id_usuario']
        user_name = (UsuarioSerializer(user_get[0]).data)['nome']
        user_cell = (UsuarioSerializer(user_get[0]).data)['celular']
        return Response({"user_id":user_id, "nome":user_name, "celular":user_cell})


    @action(detail = True, methods = ['get','post'])
    def get_user_data(self, request, pk= None):

        if pk is None:
            return Response("no_primary_key_flag")

        user = Usuario.objects.get(id_usuario = pk)
        user_serialized = UsuarioSerializer(user)
        user_services = []
        service_data = Servico.objects.filter(id_usuario = pk)

        devolution_data = Devolucao.objects.filter(id_usuario = pk)
        devolution_series = []

        for devolution in devolution_data:
            devolution_serialized = DevolucaoSerializer(devolution)
            devolution_series.append(devolution_serialized.data)
        
        for service in service_data:

            service_serialized = ServicoSerializer(service)
            service_wallet = Carteira.objects.filter(id_servico = service_serialized.data["id_servico"])

            if len(service_wallet) > 0:
                service_wallet_serialized = CarteiraSerializer(service_wallet[0])
                user_services.append({"servico":service_serialized.data, "carteira":service_wallet_serialized.data})

        return Response({"usuario":user_serialized.data, "devolucoes":devolution_series, "servicos":user_services})
    
    @action(detail = True, methods = ['get','post'])
    def auth_user(self, request, pk = None):

        if 'cpf' not in request.data:
            return Response("no_cpf_was_sent")
 
        elif len(request.data['cpf']) == 0:
            return Response("no_cpf_input")
        
        if 'senha' not in request.data:
            return Response("no_passcode_was_sent")
 
        elif len(request.data['senha']) == 0:
            return Response("no_passcode_input")

        user = Usuario.objects.filter(cpf = request.data['cpf'])

        if len(user) == 0:
            return Response("no_such_cpf_on_records")

        user_serialized = UsuarioSerializer(user[0])

        pk = user_serialized.data['id_usuario']

        if request.data['senha'] == user_serialized.data['senha']:

            Usuario.objects.filter(id_usuario = pk).update(is_logged = True)
            return Response({"flag":"auth_ok", "user_id":pk})
            
        elif request.data['senha'] != user_serialized.data['senha'] and len(request.data['senha']) > 0:
            return Response("not_auth_wrong_passcode")
            
        return Response("no_passcode_received")

    @action(detail = True, methods = ['get','post'])
    def set_banking_information(self, request, pk = None):
        
        if 'banco' not in request.data:
            return Response("no_bank_was_sent")
        
        elif 'conta' not in request.data:
            return Response("no_acc_was_sent")
        
        elif 'agencia' not in request.data:
            return Response("no_agency_was_sent")
 
        elif len(request.data['banco']) == 0:
            return Response("no_banco_input")
        
        elif len(request.data['conta']) == 0:
            return Response("no_acc_input")
        
        elif len(request.data['agencia']) == 0:
            return Response("no_agency_input")

        user = Usuario.objects.filter(id_usuario = pk)

        if len(user) == 0:
            return Response("no_such_user_id_on_records")
        
        elif len(user) > 1:
            return Response("error_user_id_repeated_on_records")

        user.update(banco = request.data['banco'],\
        conta = request.data['conta'],\
        agencia = request.data['agencia'])

        user_serialized = UsuarioSerializer(user[0])
        return Response(user_serialized.data)
    
    @action(detail = True, methods = ['get','post'])
    def set_user_unlogged(self, request, pk = None):

        if pk is None or len(str(pk)) == 0:
            return Response("no_user_sent")
        
        user = Usuario.objects.filter(id_usuario = pk)

        if len(user) == 0:
            return Response("no_such_user_id_on_records")
        
        elif len(user) > 1:
            return Response("error_user_id_repeated_on_records")

        user_serialized = UsuarioSerializer(user[0])

        if user_serialized.data['is_logged'] == True:
            Usuario.objects.filter(id_usuario = pk).update(is_logged = False)
            user_serialized = UsuarioSerializer(user[0])
            return Response("user_is_now_logged_out")
        
        return Response("user_is_already_logged_out")

    @action(detail = True, methods = ['get','post'])
    def set_user_logged(self, request, pk = None):

        if pk is None or len(str(pk)) == 0:
            return Response("no_user_sent")
        
        user = Usuario.objects.filter(id_usuario = pk)

        if len(user) == 0:
            return Response("no_such_user_id_on_records")
        
        elif len(user) > 1:
            return Response("error_user_id_repeated_on_records")

        user_serialized = UsuarioSerializer(user[0])

        if user_serialized.data['is_logged'] == False:
            user.update(is_logged = True)
            user_serialized = UsuarioSerializer(user[0])
            return Response("user_is_now_logged_in")
        
        return Response("user_is_already_logged_in")
        

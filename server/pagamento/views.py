from django.http import HttpResponse

from django.shortcuts import render
from rest_framework import generics
from .models import Pagamento
from .serializers import PagamentoSerializer

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import viewsets

from rest_framework.decorators import action

from django.views.decorators.csrf import csrf_exempt

from carteira.models import Carteira
from carteira.serializers import CarteiraSerializer

import datetime
from datetime import timedelta
from django.utils import timezone

class PagamentoViewSet(viewsets.ModelViewSet):

    queryset = Pagamento.objects.all()
    serializer_class = PagamentoSerializer

    def list(self, request):

        queryset = Pagamento.objects.all()
        serializer = PagamentoSerializer(queryset, many = True)
        print(request)
        return Response(serializer.data)

    def retrieve(self, request, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        selected_payment = Pagamento.objects.get(id_pagamento = pk)
        serializer = PagamentoSerializer(selected_payment)
        return Response(serializer.data)

    @action(detail = False, methods = ['get'])
    def get_pending_payments_for_service(self, request):

        id_pagador = self.request.query_params['id_servico']

        if id_pagador is None or len(id_pagador) < 1:
            return Response({"payment_list":"wrong_entry"})

        payment_list = Pagamento.objects.filter(id_pagador = id_pagador)

        if len(payment_list) < 1:
            return Response({"payment_list":"no_records_found"})

        payment_records = []
        for payment_record in payment_list:
            payment_serialized = PagamentoSerializer(payment_record).data

            if payment_serialized['situacao'] == "pendente":
                payment_records.append(PagamentoSerializer(payment_record).data)

        return Response({"payment_list":payment_records})

    def create(self, request):
        create_data = request.data
        
        payment_id = (str(create_data['id_pagador']) + str(create_data['id_receptor']) + str(int(datetime.datetime.now().timestamp()))).replace("-", "")
        
        if 'id_pagador' in create_data:
            pagador_id = create_data['id_pagador']
        else:
            pagador_id = ""

        receptor_id = create_data['id_receptor']
        valor = float(create_data['valor'])
        situacao = "pendente"
        #token = payment_id[-4:]

        new_payment = Pagamento(id_pagamento = payment_id, \
        id_pagador = pagador_id, \
        id_receptor = receptor_id, \
        valor = valor, \
        situacao = situacao
        )
        new_payment.clean()
        new_payment.save()

        return Response({"payment_id":payment_id})
    
    @action(detail = True, methods = ['get'])
    def auth_payment(self, request, pk = None):
        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        try:
            payment = Pagamento.objects.get(id_pagamento = pk)
        except Pagamento.DoesNotExist:
            payment = None
        

        if payment is None:
            return Response("payment_not_filed")

        payment_serialized = PagamentoSerializer(payment).data

        if payment_serialized['situacao'] == "realizado":
            return Response("already_done")

        if payment_serialized['situacao'] == "no_funds":
            return Response("no_funds")

        elif payment_serialized['situacao'] == "pendente":
            Pagamento.objects.filter(id_pagamento = pk).update(id_pagador = payment_serialized['id_pagador'])
            Pagamento.objects.filter(id_pagamento = pk).update(situacao = "auth_payment")
            status = self.transfer_payment(pk)
            return Response(status)
            
            #elif request.data['token'] != payment_serialized.data['token'] and len(request.data['token']) > 0:
            #    return Response("not_auth_wrong_token")
            
            #return Response("no_token_received")
        
        #return Response("not_auth_no_token")
        return Response("not_auth")

    def transfer_payment(self, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        payment = self.get_object()
        payment_serialized = PagamentoSerializer(payment)

        if payment_serialized.data['situacao'] == "realizado":
            return Response("already_done")   

        # verificar se o pagamento esta sendo computado duas vezes

        elif payment_serialized.data['situacao'] == "pendente":
            return Response("not_auth")    
        
        payer_wallet = Carteira.objects.get(id_servico = payment_serialized.data['id_pagador'])
        payer_wallet_serialized = CarteiraSerializer(payer_wallet)

        receiver_wallet = Carteira.objects.get(id_servico = payment_serialized.data['id_receptor'])
        receiver_wallet_serialized = CarteiraSerializer(receiver_wallet)

        # verificar se usuario possui credito o suficiente para realizar pagamento

        credito_restante = float(payer_wallet_serialized.data['credito']) - float(payment_serialized.data['valor'])

        if credito_restante > 0:
            payer_wallet_update = Carteira.objects.filter(id_servico = payment_serialized.data['id_pagador'])\
            .update(credito = credito_restante)

            receiver_wallet_update = Carteira.objects.filter(id_servico = payment_serialized.data['id_receptor'])\
            .update(credito = float(receiver_wallet_serialized.data['credito']) + float(payment_serialized.data['valor']))

            Pagamento.objects.filter(id_pagamento = pk)\
            .update(situacao = "realizado")

            return Response(CarteiraSerializer(Carteira.objects.get(id_servico = payment_serialized.data['id_pagador'])).data)
        
        # nao ha credito suficiente para pagamento

        Pagamento.objects.filter(id_pagamento = pk)\
            .update(situacao = "no_funds")

        return Response({'status':'nao_procede', 'valor':str(credito_restante)})
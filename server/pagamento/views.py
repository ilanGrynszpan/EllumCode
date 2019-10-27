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
    
    @action(detail = True, methods = ['get','post'])
    def validate_payment(self, request, pk = None):

        if len(pk) < 1:
            return HttpResponseNotFound("notfound")
        
        payment = self.get_object()
        payment_serialized = PagamentoSerializer(payment)
        
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
            return Response(CarteiraSerializer(Carteira.objects.get(id_servico = payment_serialized.data['id_pagador'])).data)
        
        # nao ha credito suficiente para pagamento
        return Response({'status':'nao_procede', 'valor':str(credito_restante)})
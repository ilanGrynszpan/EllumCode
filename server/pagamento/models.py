from django.db import models
from uuid import uuid4
from datetime import date, timedelta

# Create your models here.

class Pagamento(models.Model):

    class Meta:

        db_table = 'pagamentos'

    id_pagamento = models.CharField(primary_key = True, max_length=150, default = uuid4)
    id_pagador = models.CharField(max_length=150, default = uuid4)
    id_receptor = models.CharField(max_length=150, default = uuid4)
    valor = models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00)
    situacao = models.CharField(editable = True, max_length = 20)
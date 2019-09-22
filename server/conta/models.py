from django.db import models
from uuid import uuid4
from datetime import date, timedelta

# Create your models here.

class Conta(models.Model):

    class Meta:

        db_table = 'conta'

    id_usuario = models.CharField(primary_key = True, editable=True, max_length=150)
    banco = models.CharField(editable = True, max_length = 150)
    agencia = models.CharField(editable = True, max_length = 10)
    numero_conta = models.CharField(editable = True, max_length = 10)
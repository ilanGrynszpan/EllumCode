
from django.db import models
from uuid import uuid4
from datetime import date, timedelta

# Create your models here.

class Devolucao(models.Model):

    class Meta:

        db_table = 'devolucao'

    id_devolucao = models.CharField(primary_key = True, editable=True, max_length=150)
    id_usuario = models.CharField(editable = True, max_length = 150)
    valor = models.DecimalField(max_digits=8, decimal_places=2)
    vencimento = models.DateField(editable = True, auto_now = False, auto_now_add = False)
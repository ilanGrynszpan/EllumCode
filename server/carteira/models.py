from django.db import models
from uuid import uuid4
from datetime import date, timedelta

from servico.models import Servico

# Create your models here.

class Carteira(models.Model):

    class Meta:

        db_table = 'carteira'

    credito = models.DecimalField(max_digits=8, decimal_places=2)
    id_usuario = models.CharField(editable=True, max_length=150)
    id_servico = models.CharField(primary_key = True, editable=True, max_length=150)
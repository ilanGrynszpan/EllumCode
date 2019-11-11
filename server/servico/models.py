from django.db import models
from uuid import uuid4

# Create your models here.

class Servico(models.Model):

    class Meta:

        db_table = 'servico'

    area_atuacao = models.CharField(max_length = 20)
    nome_servico = models.CharField(max_length = 30)
    id_usuario = models.CharField(max_length = 150)
    id_servico = models.CharField(primary_key=True, default = str(uuid4()).replace('-',''), editable=False, max_length = 150)
from django.db import models
from uuid import uuid4

from django.utils.timezone import now

# Create your models here.

class Usuario(models.Model):

    class Meta:

        db_table = 'usuario'

    id_usuario = models.CharField(primary_key=True, max_length = 150, default = str(uuid4()).replace('-', ''), editable=False)
    nome = models.CharField(max_length = 50)
    cpf = models.CharField(max_length = 14)
    celular = models.CharField(max_length = 9)
    senha = models.CharField(max_length = 15)
    is_logged = models.BooleanField(default = False)

    # banking information

    banco = models.CharField(max_length = 50, default = '')
    agencia = models.CharField(max_length = 10, default = '')
    conta = models.CharField(max_length = 10, default = '')

    # profile information

    creation_date = models.DateTimeField(default = now, blank = True, editable = False)
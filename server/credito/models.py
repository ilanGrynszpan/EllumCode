
from django.db import models
from uuid import uuid4

# Create your models here.

class Credito(models.Model):

    class Meta:

        db_table = 'credito'

    credito_id = models.CharField(primary_key=True, default = str(uuid4()), editable=False, max_length = 150)
    servico_id = models.CharField(max_length = 150)
    user_id = models.CharField(max_length = 150, default = "user_unknown")
    valor = models.DecimalField(max_digits=8, decimal_places=2)
    situacao = models.CharField(max_length = 10, default = "pendente")
    taxa_juros = models.DecimalField(max_digits=10, decimal_places=7, default = 0.035)
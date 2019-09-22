from rest_framework import serializers
from .models import Devolucao

class DevolucaoSerializer(serializers.ModelSerializer):

    class Meta:

        model = Devolucao
        fields = '__all__'
from rest_framework import serializers
from .models import Conta

class ContaSerializer(serializers.ModelSerializer):

    class Meta:

        model = Conta
        fields = '__all__'
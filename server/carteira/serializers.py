from rest_framework import serializers
from .models import Carteira

class CarteiraSerializer(serializers.ModelSerializer):

    class Meta:

        model = Carteira
        fields = '__all__'
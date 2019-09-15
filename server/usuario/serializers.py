from rest_framework import serializers
from .models import Usuario

## Usuario definition for serializing data from front-end

class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:

        model = Usuario
        fields = '__all__'
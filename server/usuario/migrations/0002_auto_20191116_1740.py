# Generated by Django 2.2.5 on 2019-11-16 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='celular',
            field=models.CharField(max_length=11),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='cpf',
            field=models.CharField(max_length=11),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='id_usuario',
            field=models.CharField(default='b0f52afd88e04138b3e09cfe49e90e79', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
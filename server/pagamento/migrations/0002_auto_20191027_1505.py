# Generated by Django 2.2.5 on 2019-10-27 18:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pagamento', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pagamento',
            old_name='id_empreendedor',
            new_name='id_pagador',
        ),
        migrations.RenameField(
            model_name='pagamento',
            old_name='id_fornecedor',
            new_name='id_receptor',
        ),
    ]

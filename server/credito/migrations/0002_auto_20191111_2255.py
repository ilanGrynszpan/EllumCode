# Generated by Django 2.2.5 on 2019-11-12 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credito', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credito',
            name='credito_id',
            field=models.CharField(default='5c190bf1-494f-4476-bcb7-43b51b38d188', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='credito',
            name='servico_id',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='credito',
            name='user_id',
            field=models.CharField(default='user_unknown', max_length=150),
        ),
    ]

# Generated by Django 2.2.5 on 2019-10-27 18:05

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0007_auto_20191026_1759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servico',
            name='id_servico',
            field=models.CharField(default=uuid.UUID('b9d56dec-47f0-4efb-8ebc-2c822481397e'), editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]

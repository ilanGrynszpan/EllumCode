# Generated by Django 2.2.5 on 2019-10-27 22:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0008_auto_20191027_1505'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servico',
            name='id_servico',
            field=models.CharField(default=uuid.UUID('6af9282f-925a-4382-9130-f6a7486bf333'), editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
# Generated by Django 2.2.5 on 2019-10-21 00:11

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0003_auto_20191019_2249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servico',
            name='servico_id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]

# Generated by Django 2.2.5 on 2019-10-26 20:59

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0003_auto_20191020_2120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='id_usuario',
            field=models.UUIDField(default=uuid.UUID('3791f750-6036-4b75-8972-a08336531b48'), editable=False, primary_key=True, serialize=False),
        ),
    ]

# Generated by Django 2.2.5 on 2019-10-20 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0002_auto_20191019_2234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servico',
            name='servico_id',
            field=models.CharField(default='<function uuid4 at 0x039A4030>', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
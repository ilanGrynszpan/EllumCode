# Generated by Django 2.2.5 on 2019-10-30 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0014_auto_20191030_1618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servico',
            name='id_servico',
            field=models.CharField(default='1347a55e49fa4df2b1cce7f6460b1b31', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]

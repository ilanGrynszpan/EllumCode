# Generated by Django 2.2.5 on 2019-11-17 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0003_auto_20191116_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servico',
            name='id_servico',
            field=models.CharField(default='96747b317827471aa3904754ae51cc3b', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
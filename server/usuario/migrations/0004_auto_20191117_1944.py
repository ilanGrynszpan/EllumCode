# Generated by Django 2.2.5 on 2019-11-17 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0003_auto_20191116_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='id_usuario',
            field=models.CharField(default='6c54c49af89548a5be0061d8b10df4bb', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
# Generated by Django 2.2.5 on 2019-11-16 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0002_auto_20191116_1740'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='id_usuario',
            field=models.CharField(default='cfa367895978495eb0e864f33c6a1981', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]

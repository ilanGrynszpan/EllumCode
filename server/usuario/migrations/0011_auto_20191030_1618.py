# Generated by Django 2.2.5 on 2019-10-30 19:18

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0010_auto_20191030_1600'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='creation_date',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='id_usuario',
            field=models.CharField(default='8d501fcf724249ab9ee91995a98a4d36', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]

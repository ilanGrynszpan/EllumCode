# Generated by Django 2.2.5 on 2019-10-21 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credito', '0004_auto_20191020_2111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credito',
            name='credito_id',
            field=models.CharField(default='2b6c194e-cb7a-4f1d-9779-74eedea3a623', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]

# Generated by Django 2.2.5 on 2019-10-27 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credito', '0007_auto_20191026_1759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credito',
            name='credito_id',
            field=models.CharField(default='f8ef9783-12d2-4c10-9f10-f885e58f10fa', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
# Generated by Django 2.2.5 on 2019-10-27 23:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credito', '0009_auto_20191027_1921'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credito',
            name='credito_id',
            field=models.CharField(default='71ddbb69-c74b-4138-80ad-14d10b049283', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
# Generated by Django 2.2.5 on 2019-10-21 00:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credito', '0003_auto_20191019_2249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credito',
            name='credito_id',
            field=models.CharField(default='0ecaaf13-1897-4f4a-9204-58922dc86402', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]
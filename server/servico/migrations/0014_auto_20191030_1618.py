# Generated by Django 2.2.5 on 2019-10-30 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servico', '0013_auto_20191030_1600'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servico',
            name='id_servico',
            field=models.CharField(default='060aa88bcd754ef581c8197b7244e801', editable=False, max_length=150, primary_key=True, serialize=False),
        ),
    ]

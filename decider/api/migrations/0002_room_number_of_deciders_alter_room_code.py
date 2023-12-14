# Generated by Django 5.0 on 2023-12-14 13:59

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='number_of_deciders',
            field=models.IntegerField(default=2),
        ),
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default=api.models.generate_unique_room_code, max_length=8, unique=True),
        ),
    ]

# Generated by Django 4.2.4 on 2023-11-05 05:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('springboard_api', '0016_admin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='template',
            name='teacher_fk',
        ),
    ]
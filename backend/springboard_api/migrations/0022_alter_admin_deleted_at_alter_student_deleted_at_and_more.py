# Generated by Django 4.2.4 on 2023-12-19 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('springboard_api', '0021_alter_project_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admin',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]

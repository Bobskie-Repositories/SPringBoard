# Generated by Django 4.2.4 on 2023-08-16 14:15

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_code', models.CharField(max_length=6)),
                ('class_name', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(default='0000-00-00 00:00:00')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(default='0000-00-00 00:00:00')),
                ('classroom_fk', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='springboard_api.classroom')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(default='0000-00-00 00:00:00')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(default='0000-00-00 00:00:00')),
                ('group_fk', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='springboard_api.group')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectBoard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boardtype', models.IntegerField()),
                ('content', models.TextField()),
                ('novelty', models.IntegerField()),
                ('capability', models.IntegerField()),
                ('technical_feasibility', models.IntegerField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(default='0000-00-00 00:00:00')),
                ('project_fk', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='springboard_api.project')),
            ],
        ),
        migrations.AddField(
            model_name='group',
            name='project_fk',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='springboard_api.project'),
        ),
        migrations.AddField(
            model_name='classroom',
            name='teacher_fk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='springboard_api.teacher'),
        ),
    ]

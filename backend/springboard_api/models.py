from django.utils import timezone
from django.db import models
import string
import random
# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=timezone.now)


class ProjectBoard(models.Model):
    boardtype = models.IntegerField()
    content = models.TextField()
    novelty = models.IntegerField()
    capability = models.IntegerField()
    technical_feasibility = models.IntegerField()
    project_fk = models.ForeignKey(
        Project, on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')


class Teacher(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')


class Classroom(models.Model):
    class_code = models.CharField(max_length=6)
    class_name = models.CharField(max_length=200)
    teacher_fk = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')


class Group(models.Model):
    name = models.CharField(max_length=50)
    project_fk = models.ForeignKey(
        Project, on_delete=models.SET_NULL, null=True, default=None)
    classroom_fk = models.ForeignKey(
        Classroom, on_delete=models.SET_NULL, null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')


class Student(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    group_fk = models.ForeignKey(
        Group, on_delete=models.SET_NULL, null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default='0000-00-00 00:00:00')
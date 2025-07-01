from django.db import models
import uuid

# Create your models here.

class Events(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True)
    title  = models.CharField(max_length=255)
    description = models.TextField(default="")
    venue = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

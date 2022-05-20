from django.db import models, migrations
from django.contrib.postgres.operations import UnaccentExtension
from .manager import WorkerManager

# Create your models here.
class Migration(migrations.Migration):
    operations = [
        UnaccentExtension(),
    ]

class Worker(models.Model):
    id_worker = models.IntegerField(blank=False, null=False, primary_key = True)
    name = models.CharField(max_length=100, blank=False, null=False)
    credito = models.IntegerField(blank=False, null=False)
    ventaTotal = models.IntegerField(blank=False, null=False)
    promedio = models.FloatField(blank=False, null=False)
    
    objects = WorkerManager()

    class Meta:
        ordering = ['name']
        
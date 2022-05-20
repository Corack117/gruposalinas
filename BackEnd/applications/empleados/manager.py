from django.db import models
from django.db.models import Q

class WorkerManager(models.Manager):
    
    def getAll(self):
        return self.all()
        
    def findByName(self, filters):
        q = Q()
        name = filters['name'] if filters.get('name') else ''
        if name:
            q |= Q(name__icontains=name)
        query = (self.filter(q))
        return query
from django.db import models
from django.db.models import Q

class WorkerManager(models.Manager):
    
    def getAll(self):
        return self.all()
        
    def findByName(self, filters):
        q = Q()
        id_worker = filters['id_worker'] if filters.get('id_worker') else ''
        name = filters['name'] if filters.get('name') else ''
        if id_worker:
            q |= Q(id_worker__icontains=id_worker)
        if name:
            q |= Q(name__icontains=name)
        query = (self.filter(q))
        return query
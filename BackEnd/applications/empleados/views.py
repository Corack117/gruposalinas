from django.http.response import HttpResponse
from django.http import JsonResponse
from django.views.generic import View
from .serializers import WorkerModelForm, WorkerSerializer
from .models import Worker
from django.http import Http404
import json

# Create your views here.
class WorkerView(View):
    worker = Worker.objects
    content_type='application/json'
    serialaizer = WorkerSerializer()
    
    def get_object(self, pk):
        try:
            return self.worker.get(id_worker=pk)
        except Worker.DoesNotExist:
            raise Http404
    
    def get(self, request, *args, **kwargs):
        filters = request.GET
        pk = self.kwargs.get('pk')
        self.serialaizer
        if not pk:
            query = self.worker.findByName(filters)
            workersList = self.serialaizer.serialize(query)
        else:
            workerFinded = self.get_object(pk)
            workersList = self.serialaizer.serialize([workerFinded])
        return HttpResponse(workersList, self.content_type, status=200)
     
     
    # ------------- Métodos Adicionales -------------
    def post(self, request, *args, **kwargs):
        data = request.POST
        info = data.get('info')
        pk = self.kwargs.get('pk')
        status = 200
        if info == 'new':
            workerFound = Worker()
            status = 201
        elif info == 'update':
            workerFound = self.get_object(pk)
            workerFound.delete()
        if info =='delete':
            workerFound = self.get_object(pk)
            workerFound.delete()
            return JsonResponse({}, status=status)
        
        worker = WorkerModelForm(data=data, instance=workerFound)
        if worker.is_valid():
            worker.save()
            return JsonResponse(worker.data, status=status)
        status = 400
        return JsonResponse({} ,status=status)

from django.middleware.csrf import get_token
class getCSRF(View):
    def get(self, request, *args, **kwargs):
        get_token(request)
        return JsonResponse({}, status=200)
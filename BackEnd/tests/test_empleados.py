import pytest
from django.urls import reverse
from django.test import Client
from random import randint
from applications.empleados.serializers import WorkerModelForm
    
@pytest.mark.django_db
def test_worker_getAll():
    params = {
        "name": ""
    }
    for x in range(5):
        create_worker()
    client = Client()
    url = reverse('apiWorker')
    print(url, params)
    response = client.get(url, params, format='json')
    assert(response.status_code == 200)
    assert(len(response.json()) > 0)
    
@pytest.mark.django_db
def test_worker_getFilter():
    params = {
        "name": "Sergio",
    }
    create_workerWithName('Sergio Andrade Mendez')
    create_workerWithName('Carlos Gutierrez Salazas')
    create_workerWithName('Sergio Ordaz Romero')
    create_workerWithName('Enrique Serralde Romero')
    create_workerWithName('Sergio Hernandez Hernandez')
    client = Client()
    url = reverse('apiWorker')
    response = client.get(url, params, format='json')
    assert(response.status_code == 200)
    assert(len(response.json()) > 0)
    
@pytest.mark.django_db
def test_worker_getEmptyFilter():
    params = {
        "name": "Parangaricutirimicuaro",
        "area": "ª"
    }
    create_workerWithName('Sergio Andrade Mendez')
    create_workerWithName('Carlos Gutierrez Salazas')
    create_workerWithName('Sergio Ordaz Romero')
    create_workerWithName('Enrique Serralde Romero')
    create_workerWithName('Sergio Hernandez Hernandez')
    client = Client()
    url = reverse('apiWorker')
    response = client.get(url, params, format='json')
    assert(response.status_code == 200)
    assert(len(response.json()) == 0)
    
@pytest.mark.django_db(reset_sequences=True)
def test_worker_getOne():
    create_worker()
    create_worker()
    create_worker()
    create_worker()
    worker = create_worker()
    id = worker.data.get('id_worker')
    client = Client()
    url = reverse('apiWorker') + '/{}'.format(id)
    response = client.get(url, format='json')
    assert(response.status_code == 200)
    
@pytest.mark.django_db
def test_worker_post():
    worker = create_worker()
    assert(worker.is_valid())

@pytest.mark.django_db(reset_sequences=True)
def test_worker_put():
    worker = create_worker()
    client = Client()
    id = worker.data.get('id_worker')
    url = reverse('apiWorker') + '/{}'.format(id)
    params = getDefinedWorker()
    params['info'] = 'update'
    response = client.post(url, params, format='json')
    assert(response.status_code == 200)
    
@pytest.mark.django_db(reset_sequences=True)
def test_worker_putError():
    with pytest.raises(Exception):
        create_worker()
        client = Client()
        url = reverse('apiWorker') + '/100'
        params = getDefinedWorker()
        params['info'] = 'update'
        response = client.post(url, params, format='json')
        assert(response.status_code == 200)
    
@pytest.mark.django_db(reset_sequences=True)
def test_worker_delete():
    worker = create_worker()
    client = Client()
    id = worker.data.get('id_worker')
    url = reverse('apiWorker') + '/{}'.format(id)
    params = { 'info': 'delete' }
    response = client.post(url, params,format='json')
    assert(response.status_code == 200)
    
@pytest.mark.django_db(reset_sequences=True)
def test_worker_deleteError():
    with pytest.raises(Exception):
        create_worker()
        client = Client()
        url = reverse('apiWorker') + '/100'
        params = { 'info': 'delete' }
        response = client.post(url, params,format='json')
        assert(response.status_code == 200)

def create_worker():
    worker = WorkerModelForm(data={
        "info": "new",
        "id_worker": randint(100000, 999999),
        "name": "Josue Vela Dominguez",
        "credito": 28192,
        "ventaTotal": 194829,
        "promedio": 92.28
    })
    if worker.is_valid():
        worker.save()
    return worker
    
def create_workerWithName(name):
    worker = WorkerModelForm(data={
        "info": "new",
        "id_worker": randint(100000, 999999),
        "name": name,
        "credito": 28192,
        "ventaTotal": 194829,
        "promedio": 92.28
    })
    if worker.is_valid():
        worker.save()
    return worker
    
def getDefinedWorker():
    return {
        "id_worker": 810492,
        "name": "Josue Vela Dominguez",
        "credito": 28192,
        "ventaTotal": 194829,
        "promedio": 92.28
    }
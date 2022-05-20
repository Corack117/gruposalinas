from django.urls import path
from . import views as vw

urlpatterns = [
    path('api/worker', vw.WorkerView.as_view(), name="apiWorker"),
    path('api/worker/<int:pk>', vw.WorkerView.as_view()),
    path('getcsrf', vw.getCSRF.as_view()),
]
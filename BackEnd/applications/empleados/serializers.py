from django.core.serializers.json import Serializer
from django import forms
from .models import Worker

class WorkerModelForm(forms.ModelForm):
    class Meta:
        model = Worker
        fields = '__all__'


class WorkerSerializer(Serializer):
    
    def get_dump_object(self, obj):
        self._current['id_worker'] = obj._get_pk_val()
        return self._current
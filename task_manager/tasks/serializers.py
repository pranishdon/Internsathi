from rest_framework import serializers
from .models import Task

class BaseTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task', 'completed']

class TaskSerializer(BaseTaskSerializer):
    pass  # You can add more fields or override methods if needed

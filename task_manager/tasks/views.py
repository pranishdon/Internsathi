from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view





@api_view(["GET", "POST"])
def TaskView(request):
    from .views import TaskDetail 
    if request.method == "GET":
        tasks = Task.objects.all()  # Fixed typo here
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET", "PATCH", "PUT", "DELETE"])
def TaskDetail(request, pk):
    from .views import TaskView  
    task = get_object_or_404(Task, id=pk)

    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PATCH":
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def update_task_status(request, id):
    task = Task.objects.get(pk=id)
    task.completed = request.data.get('completed', task.completed)
    task.save()
    return Response(TaskSerializer(task).data)


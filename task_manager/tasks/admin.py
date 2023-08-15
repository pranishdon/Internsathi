from django.contrib import admin

from .models import Task # Only import the Task model
# Register your models here.
admin.site.register(Task)





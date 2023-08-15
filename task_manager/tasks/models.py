from django.db import models

class Task(models.Model):
    task = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)  # Corrected argument here

    def __str__(self):
        return self.task



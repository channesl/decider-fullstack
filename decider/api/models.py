from django.db import models
import string
import random

def generate_unique_room_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code


# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_room_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=10, default='Movie', unique=False)
    number_of_deciders = models.IntegerField(null=False, default=2)
    created_at = models.DateTimeField(auto_now_add=True)

class Movies(models.Model):
    list_name = models.CharField(max_length=20, unique=True)
    movie_list = models.JSONField()

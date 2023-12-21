from rest_framework import serializers
from .models import Room
from .models import Movies


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'category', 'number_of_deciders', 'created_at') 

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('category', 'number_of_deciders',)

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = ('id', 'list_name', 'movie_list')

class CreateMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = ('id', 'list_name',)
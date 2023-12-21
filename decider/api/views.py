from django.shortcuts import render
from rest_framework import generics, status
from .models import Room, Movies
from .serializers import RoomSerializer, CreateRoomSerializer, MoviesSerializer, CreateMoviesSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .tmdbAPI import get_JSON_movie_list


# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            number_of_deciders = serializer.data.get('number_of_deciders')
            category = serializer.data.get('category')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.number_of_deciders = number_of_deciders
                room.category = category

                room.save(update_fields=['number_of_deciders', 'category'])

                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, number_of_deciders=number_of_deciders, category = category)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code Parameter Not Found In Request'}, status=status.HTTP_400_BAD_REQUEST)
    
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)
    
class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            user_id = self.request.session.session_key
            room_results = Room.objects.filter(host=user_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
    

class MoviesView(generics.ListAPIView):
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer

class CreateMoviesView(APIView):
    serializer_class = CreateMoviesSerializer

    def post(self, request, format=None):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            list_name = serializer.data.get('list_name')
            queryset = Movies.objects.filter(list_name=list_name)
            if queryset.exists():
                movies = queryset[0]
                movies.movie_list = get_JSON_movie_list()

                movies.save(update_fields=['movie_list'])

                return Response(MoviesSerializer(movies).data, status=status.HTTP_200_OK)
            else:
                movies = Movies(list_name=list_name, movie_list=get_JSON_movie_list())
                movies.save()
                return Response(MoviesSerializer(movies).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetMovies(APIView):
    serializer_class = MoviesSerializer
    lookup_url_kwarg = 'list_name'

    def get(self, request, format=None):
        list_name = request.GET.get(self.lookup_url_kwarg)
        if list_name != None:
            movies = Movies.objects.filter(list_name=list_name)
            if len(movies) > 0:
                data = MoviesSerializer(movies[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Movies Not Found': 'Invalid List Name'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'List Name Parameter Not Found In Request'}, status=status.HTTP_400_BAD_REQUEST)
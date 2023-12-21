from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, MoviesView, CreateMoviesView, GetMovies

urlpatterns = [
    path('rooms', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('movies', MoviesView.as_view()),
    path('create-movies', CreateMoviesView.as_view()),
    path('get-movies', GetMovies.as_view())
]
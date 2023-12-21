import requests
import json

def get_JSON_movie_list():

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDYyYmU4YTFmNDlmNjU1NWU4YmYyZDVjYzJkYzVhYyIsInN1YiI6IjY1ODFlZmUwMjI2YzU2MDhhZDlkYmY3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ABX-m1Mgu3oWL6iKY25sDBY5xcG3mT4TIish8TPZzL4"
    }
    movie_list = []

    for i in range(1, 6, 1):
        url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + str(i)
        response = requests.get(url, headers=headers)
        json_dict = json.loads(response.text)
        movie_list = movie_list + json_dict['results']

    movie_dict = {'movies': movie_list}

    movie_json = json.dumps(movie_dict)

    return movie_json

        

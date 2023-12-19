import requests
import json

headers = {
    "accept": "application/json",
    "Authorization": 
}

movie_list = []

for i in range(1, 6, 1):
    url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + str(i)
    response = requests.get(url, headers=headers)
    json_dict = json.loads(response.text)
    movie_list = movie_list + json_dict['results']

movie_dict = {'movies': movie_list}

movie_json = json.dumps(movie_dict)

print(movie_json)


    

import tmdbsimple as tmdb
import json
tmdb.API_KEY = '595fdbd6d1eb77a8affa09cf219ab6ae'
search = tmdb.Search()
movie_list = ['john', "word", "love", "and", "the" ]
movie_object_list = [] 
for movie in movie_list:
	response = search.movie(query=movie)
	for movie_detail in search.results:
		movie_object = {}
		movie_object["model"]="movieapp.movie"
		movie_object["pk"]=movie_detail["id"]
		movie_detail.pop("genre_ids", None)
		movie_detail.pop("id", None)
		movie_object["fields"] = movie_detail
		final_movie_object = json.dumps(movie_object)
		movie_object_list.append(final_movie_object)
f = open('./movie_app/fixture.json', 'w')
f.write(str(movie_object_list))
f.close()


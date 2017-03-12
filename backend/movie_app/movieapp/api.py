from rest_framework.viewsets import ModelViewSet
from .serializer import MovieSerializer
from .models import Movie

class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
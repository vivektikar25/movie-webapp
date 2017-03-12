from __future__ import unicode_literals


from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    release_date = models.CharField(max_length=30)
    popularity = models.FloatField(default=0.0)
    original_title = models.CharField(max_length=100)
    backdrop_path = models.CharField(max_length=300, null=True)
    poster_path = models.CharField(max_length=300, null=True)
    vote_count = models.IntegerField(default=0)
    video = models.BooleanField(default=True)
    adult = models.BooleanField(default=True)
    vote_average = models.FloatField(default=0.0)
    original_language = models.CharField(max_length=30)
    overview = models.TextField(default="")

    def __str__(self):
        return "List: {}".format(self.title)



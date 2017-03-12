# from django.conf.urls import url
# from .api import MovieViewSet
#
# urlpatterns = [
#     url(r'^movie$', MovieViewSet.as_view())
# ]

from .api import MovieViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'movie', MovieViewSet)

urlpatterns = router.urls

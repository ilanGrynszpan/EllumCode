  
from django.urls import path, include
from .views import CarteiraViewSet
from rest_framework import routers
from rest_framework.routers import DefaultRouter

router = routers.SimpleRouter()
router.register(r'carteiras', CarteiraViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls')),
]

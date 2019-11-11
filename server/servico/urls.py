from django.urls import path, include
from .views import ServicoViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'servicos', ServicoViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls')),
]
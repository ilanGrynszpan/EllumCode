from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.UsuarioView.as_view(), name='usersview'),
    path('<celular>/<senha>', views.UsuarioView.as_view(), name='userget')
]
from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.ContaList.as_view(), name='accountlist')
]
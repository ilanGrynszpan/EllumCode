from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.CreditList.as_view(), name='creditlist')
]
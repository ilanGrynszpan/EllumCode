  
from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.PagamentoList.as_view(), name='paymentlist')
]
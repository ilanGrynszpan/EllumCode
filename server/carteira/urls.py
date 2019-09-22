  
from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.CarteiraList.as_view(), name='walletlist'),
    path('<service_id>', views.CarteiraList.as_view(), name='walletget')
]
from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.ServicoList.as_view(), name='servicelist'),
    path('<user_id>', views.ServicoList.as_view(), name='serviceslistget'),
]
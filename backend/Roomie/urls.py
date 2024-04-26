"""
URL configuration for Roomie project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from Roomie import views
from Roomie.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register, name='register'),
    path('homepage/', views.homepage, name='homepage'),
    path('login/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('main/', views.main, name='main'),
    path('main/sign-out-url', auth_views.LogoutView.as_view(next_page='homepage'), name='logout'),
    path('<str:id>/getPets/',getPets, name='getPets'),
    path('<str:id>/addPet/', addPet, name='addPet'),
    path('<str:id>/editPet/', editPet, name='editPet'),
    path('<str:id>/<str:petName>/<str:petType>/', deletePet, name='deletePet'),
    path('budgeting/', budgeting_view, name='budgeting_api'),
    path('listings/', listing_view, name='apartment_units'),
    path('advanced-search/', advanced_search, name='advanced_search'),
]

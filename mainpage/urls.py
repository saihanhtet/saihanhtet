from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="Home"),
    path("about-me/", views.aboutme, name="AboutMe")
]

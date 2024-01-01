# Import your train_and_save_model function
from django.shortcuts import render, HttpResponse
import json
# Create your views here.


def index(request):
    return render(request, template_name="scenes/home_page.html")


def aboutme(request):
    return render(request, template_name="scenes/aboutme.html")

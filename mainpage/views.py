# Import your train_and_save_model function
from django.shortcuts import render, HttpResponse
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponseNotFound
from rest_framework import status
import json
from django.conf import settings
from django.contrib.staticfiles import finders
# Create your views here.


def fetch_data():
    file_path = finders.find('data.json')
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        return {"msg": "File not found", "status": status.HTTP_404_NOT_FOUND}
    except json.JSONDecodeError:
        return {"msg": "Error parsing JSON", "status": status.HTTP_500_INTERNAL_SERVER_ERROR}


def index(request):
    context = {'data': fetch_data()}
    return render(request, template_name="scenes/home_page.html", context=context)


def aboutme(request):
    context = {'data': fetch_data()}
    return render(request, template_name="scenes/aboutme.html", context=context)

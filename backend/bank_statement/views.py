from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework.response import Response
from rest_framework import status

fileurl = ""

def render_react(request):
    context = { }
    return render(request, "index.html", context)

@api_view(['POST'])
def process_image(request):
    if request.method == 'POST':
        print(request.FILES)
        request_file = request.FILES['image'] if 'image' in request.FILES else None
        if request_file:
            fs = FileSystemStorage()
            file = fs.save(request_file.name, request_file)
            fileurl = fs.url(file)
            return Response("File saved in: " + fileurl, status=status.HTTP_201_CREATED)

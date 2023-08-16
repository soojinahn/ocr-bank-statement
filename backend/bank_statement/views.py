from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from pytesseract import pytesseract
from django.core.files.storage import FileSystemStorage
from PIL import Image
from io  import StringIO
import os

def render_react(request):
    context = { }
    return render(request, "index.html", context)

@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST':
        request_file = request.FILES['image'] if 'image' in request.FILES else None
        if request_file:
            fs = FileSystemStorage()
            file = fs.save(request_file.name, request_file)
            fileurl = fs.url(file)

            cwd = os.getcwd()
            image_path = cwd+"/build"+fileurl
            print(image_path)
            print(call_ocr(image_path))
            return Response("Successfully received.", status=status.HTTP_200_OK)

def call_ocr(image_path):
    text = str(pytesseract.image_to_string(Image.open(image_path)))
    return text
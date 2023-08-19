from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from pytesseract import pytesseract
from django.core.files.storage import FileSystemStorage
from PIL import Image
import os

headers = []
data = {}

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

            call_ocr(image_path)
            return Response("Successfully received.", status=status.HTTP_200_OK)

@api_view(['POST'])
def set_heading(request):
    if request.method == 'POST':
        new_header = request.POST['heading']
        if new_header:
            data[new_header] = []
            headers.append(new_header)
        return Response("Successfully received.", status=status.HTTP_200_OK)
    
@api_view(['GET'])
def return_table(request):
    if request.method == 'GET':
        #transaction_data = dict(map(lambda i: (headers[i], body[i]), range(len(headers))))
        #return Response(data={"headers":headers, "body":body}, status=status.HTTP_200_OK)
        headers = list(data.keys())
        body = list(data.values())
        return Response(data={"headers":headers, "body":body}, status=status.HTTP_200_OK)

def call_ocr(image_path):
    text = str(pytesseract.image_to_string(Image.open(image_path)))
    text = text.strip().splitlines()
    text = list(filter(lambda x: x!="", text)) #removes empty strings in list
    if len(headers) > 0:
        curr_header = headers[-1]
        data[curr_header].extend(text) #adding to existing list

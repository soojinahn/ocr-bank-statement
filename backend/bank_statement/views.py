from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

def render_react(request):
    context = { }
    return render(request, "index.html", context)

@api_view(['POST'])
def save_image(request):
    if request.method == 'POST':
        request_file = request.FILES['document'] if 'document' in request.FILES else None
        if request_file:
            fs = FileSystemStorage()
            file = fs.save(request_file.name, request_file)
            fileurl = fs.url(file)
            print("Save successful")

    return render(request, "index.html", {"img": fileurl})


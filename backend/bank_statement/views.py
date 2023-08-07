from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse

def render_react(request):
    context = { }
    return render(request, "index.html", context)

@api_view(['POST'])
def save_image(request):
    if request.method == 'POST':
        print("Image upload request receieved.")
        print(request.data)

    return JsonResponse({"status":"Sucess"})
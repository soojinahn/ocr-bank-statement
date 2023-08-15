from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

def render_react(request):
    context = { }
    return render(request, "index.html", context)

@api_view(['POST'])
def process_image(request):
    if request.method == 'POST':
        print(request.FILES)
        request_file = request.FILES['image'] if 'image' in request.FILES else None
        if request_file:
            return Response("Successfully received.", status=status.HTTP_201_OK)
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from .models import Events
from datetime import datetime
from http import HTTPStatus
from django.contrib.auth.models import User
from django.http import HttpRequest
from django.db import transaction
import json
from .serializer import EventSerializer,SingleEvent

# Create your views here.
@api_view(['GET'])
@permission_classes([])
def get_all_event(request):
    events = Events.objects.all()
    event_serialiezer = EventSerializer(events,many=True)
    return Response(data=event_serialiezer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
@transaction.atomic()
def add_events(request):
    try:
        data={}
        body = json.loads(request.body)
        title = body.get("title")
        desc = body.get("description")
        venue = body.get("venue")
        date = body.get("date")
        time = body.get("time")
        Events.objects.create(
            title=title,
            description = desc,
            venue = venue,
            date = date,
            time = time
        )
        data["msg"] = "Event added successfully"
        state = status.HTTP_200_OK
    except Exception as er:
        data["msg"] = str(er)
        transaction.set_rollback(True)
        state = status.HTTP_400_BAD_REQUEST
    return Response(data=data,status=state)

@api_view(['GET'])
def dashboard(request):
    data = {}
    data["event_count"]= Events.objects.count()
    data["last_login"] = datetime.now().strftime("%d-%m-%Y %I:%m %p") 
    return Response(data=data,status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([])
def get_event(request,id):
    event = Events.objects.get(id=id)
    serialize = SingleEvent(event)
    return Response(data=serialize.data,status=status.HTTP_200_OK)

@api_view(['POST'])
@transaction.atomic()
def update_event(request:HttpRequest):
    try:
        data={}
        updated_fields=[]
        body = json.loads(request.body)
        id = body.get("id")
        title = body.get("title")
        desc = body.get("description")
        venue = body.get("venue")
        date = body.get("date")
        time = body.get("time")
        event = Events.objects.get(id=id)
        event.title=title
        updated_fields.append("title")
        if title:
            event.description = desc
            updated_fields.append("description")
        if venue:
            event.venue = venue
            updated_fields.append("venue")
        if date:
            event.date = date
            updated_fields.append("date")
        if time:
            event.time = time
            updated_fields.append("time")
        event.save(update_fields=updated_fields)
        data["msg"] = "Event updated successfully"
        state = status.HTTP_202_ACCEPTED
    except Exception as er:
        data["msg"] = str(er)
        state = status.HTTP_400_BAD_REQUEST
    return Response(data=data,status=state)

@api_view(['GET'])
def delete_event(request,id):
    try:
        data={}
        print("ID recevied",id)
        event = Events.objects.get(id=id)
        event.delete()
        data["msg"] = "Event deleted successfully"
        state = status.HTTP_200_OK
    except Exception as er:
        data["msg"] = str(er)
        state = status.HTTP_400_BAD_REQUEST
    return Response(data=data,status=status.HTTP_200_OK)

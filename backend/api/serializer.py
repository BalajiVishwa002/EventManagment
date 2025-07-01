from rest_framework import serializers
from .models import Events

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model=Events
        fields = "__all__"


class SingleEvent(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = ["id","title","description","venue","date","time"]
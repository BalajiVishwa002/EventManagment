from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView
from .views import *

urlpatterns = [
    
    path("login/",TokenObtainPairView.as_view(),name="logintoken"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("get-all-event/",get_all_event,name="getevents"),
    path("add-event/",add_events,name="addevent"),
    path("delete-event/<str:id>/",delete_event,name="deleteevent"),
    path("dashboard/",dashboard,name="dashboard"),

    path("get-event/<str:id>/",get_event,name="getvent"),
    path("update-event/",update_event,name="updateevent")
    

]



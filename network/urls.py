from django.urls import path, re_path

from . import views
from .api_views import api

app_name = "network"


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("api/", api.urls),  # type: ignore
    # Match every url, except if starts with "media" or "static"
    re_path(r"^(?!media|static)", views.index, name="react_root"),
]

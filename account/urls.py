from django.urls import path
from .views import AccountView, AccountDetailView

urlpatterns = [
    path('', AccountView().as_view()),
    path('<int:pk>/', AccountDetailView().as_view())
    ]
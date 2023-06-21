from django.urls import path
from .views import BillListView, BillDetailView

urlpatterns = [
  path('', BillListView.as_view()),
  path('<int:pk>/', BillDetailView.as_view()),
]
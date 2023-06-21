from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  first_name = models.CharField(
    max_length=100,
    default=None, 
    blank=True
    )
  middle_name = models.CharField(
    max_length=100,
    default=None, 
    blank=True
    )
  last_name = models.CharField(
    max_length=100,
    default=None, 
    blank=True
    )
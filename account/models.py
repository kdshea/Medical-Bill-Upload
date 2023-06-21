from django.db import models

# Create your models here.
from django.db import models


class Account(models.Model):
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name="account",
    on_delete= models.CASCADE,
  )

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

  date_of_birth = models.DateField(
    "Date of Birth", 
    auto_now=False, 
    auto_now_add=False, 
    default=None, 
    null=True
    )
  
  address1 = models.CharField(
      "Address line 1",
      max_length=1000,
      default=None, 
      null=True
  )
  address2 = models.CharField(
      "Address line 2",
      max_length=1000,
      default=None, 
      null=True
  )

  zip_code = models.CharField(
      "ZIP / Postal code",
      max_length=12,
      default=None, 
      null=True
  )

  city = models.CharField(
      "City",
      max_length=100,
      default=None, 
      null=True
  )

  state = models.CharField(
      "State",
      max_length=100,
      default=None, 
      null=True
  )

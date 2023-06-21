from django.db import models


class Bill(models.Model):
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name="bills",
    on_delete= models.CASCADE
  )
  hospital_name = models.CharField(
    "Hospital Name", 
    max_length=200, 
    default=None
    )
  hospital_city = models.CharField(
      "Hospital City",
      max_length=100,
  )
  hospital_state = models.CharField(
      "Hospital State",
      max_length=100,
  )
  date_of_service = models.DateField(
    "Date of Service", 
    auto_now=False, 
    auto_now_add=False, 
    default=None, 
    blank=True
    )
  bill_amount = models.DecimalField(
    "Bill Amount",
    max_digits=100, 
    decimal_places=2,
    default=None)
  bill_image_url = models.URLField(
    "Bill Image URL",
    max_length=500, 
    default=None, 
    blank=True)
  eob_image_url = models.URLField(
    "EOB Image URL",
    max_length=500, 
    default=None, 
    blank=True)

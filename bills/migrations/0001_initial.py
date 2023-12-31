# Generated by Django 4.2.2 on 2023-06-19 15:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hopsital_name', models.CharField(default=None, max_length=200, verbose_name='Hospital Name')),
                ('hospital_city', models.CharField(max_length=100, verbose_name='Hospital City')),
                ('hospital_state', models.CharField(max_length=100, verbose_name='Hospital State')),
                ('date_of_service', models.DateField(blank=True, default=None, verbose_name='Date of Service')),
                ('bill_amount', models.DecimalField(decimal_places=2, default=None, max_digits=100, verbose_name='Bill Amount')),
                ('bill_image_url', models.URLField(blank=True, default=None, max_length=500, verbose_name='Bill Image URL')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bills', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

from rest_framework import serializers
from ..models import Bill


class PopulatedBillSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Bill
        fields = "__all__"
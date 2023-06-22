from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
User = get_user_model()
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({
                "password_confirmation": "Does not match password"
            })
        
        password_validation.validate_password(password)
        data['password'] = make_password(password)
        return data

    def to_representation(self, instance):
        # Exclude 'password' and 'password_confirmation' fields
        representation = super().to_representation(instance)
        representation.pop('password', None)
        representation.pop('password_confirmation', None)
        return representation

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name','middle_name', 'last_name', 'password', 'password_confirmation')
        

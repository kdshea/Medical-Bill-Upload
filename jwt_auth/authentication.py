from rest_framework.authentication import BasicAuthentication 
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings # for our SECRET_KEY
import jwt

User = get_user_model()


class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        print("HITS AUTHENTICATE MIDDLEWARE")
        header = request.headers.get('Authorization')
        if not header:
            print('No header')
            return None
        if not header.startswith('Bearer'):
            print("FAILED AT TOKEN SYNTAX")
            raise PermissionDenied("Invalid Token")
        token = header.replace('Bearer ', '')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, ["HS256"])
            user = User.objects.get(pk=payload.get('sub'))
            print("User Authenticated")
        except jwt.exceptions.InvalidTokenError:
            print("FAILED AT TOKEN DECODE")
            raise PermissionDenied("Invalid Token")
        except User.DoesNotExist:
            print("FAILED AT USER LOOKUP")
            raise PermissionDenied("User not found")
        return (user, token)
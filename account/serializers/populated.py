from .common import AccountSerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedBillSerializer(AccountSerializer):
    owner = UserSerializer()
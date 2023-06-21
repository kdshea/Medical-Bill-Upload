from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Account
from .serializers.common import AccountSerializer
# from .serializers.populated import PopulatedAccountSerializer

from rest_framework.permissions import IsAuthenticated

class AccountView(APIView):
    # POST
    # Create account
    def post(self, request):
      account_to_add = AccountSerializer(data=request.data)
      try:
        account_to_add.is_valid(raise_exception=True)
        account_to_add.save()
        return Response(account_to_add.data, status=status.HTTP_201_CREATED)
      except Exception as e:
        print('ERROR')
        return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class AccountDetailView(APIView):
  permission_classes = [IsAuthenticated]

  # GET
  # Get account info
  def get(self, request, pk):
      try:
        account = Account.objects.get(pk=pk)
        serialized_account = AccountSerializer(account)
        return Response(serialized_account.data, status=status.HTTP_200_OK)
      except Account.DoesNotExist:
        return Response(status=404)

  # UPDATE
  def put(self, request, pk):
    account = Account.objects.get(pk=pk)
    if account.owner != request.user:
      raise PermissionDenied("Unauthorized")
    updated_account = AccountSerializer(account, data=request.data)
    try:
      updated_account.is_valid(raise_exception=True)
      updated_account.save()
      return Response(updated_account.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(e)
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

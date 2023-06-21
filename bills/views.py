from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Bill
from .serializers.common import BillSerializer
from .serializers.populated import PopulatedBillSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import APIException
from rest_framework.serializers import ValidationError

class UnprocessableEntity(APIException):
    status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    default_detail = 'Unprocessable Entity'

class BillListView(APIView):
  permission_classes = [IsAuthenticated]

  # GET
  # Get all bills
  def get(self, request):
    bills = Bill.objects.filter(owner=request.user)
    serialized_bills = PopulatedBillSerializer(bills, many=True)
    return Response(serialized_bills.data, status=status.HTTP_200_OK)

  # POST 
  # Add a new bill
  # def post(self, request):
  #   bill_to_add = BillSerializer(data=request.data)
  #   try:
  #     bill_to_add.is_valid(raise_exception=True)
  #     bill_to_add.save()
  #     return Response(bill_to_add.data, status=status.HTTP_201_CREATED)
  #   except Exception as e:
  #     return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  def post(self, request):
    bill_to_add = BillSerializer(data=request.data)
    try:
        bill_to_add.is_valid(raise_exception=True)
        bill_to_add.save()
        return Response(bill_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        if isinstance(e, APIException) and e.status_code == status.HTTP_400_BAD_REQUEST:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        elif isinstance(e, ValidationError):
            return Response(e.detail, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        else:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BillDetailView(APIView):
  permission_classes = [IsAuthenticated]

  def get_bill(self, pk):
    try:
      return Bill.objects.get(pk=pk)
    except Bill.DoesNotExist:
      raise NotFound(detail="Bill not found.")

  # GET
  # Get bill by id
  def get(self, request, pk):
      bill = self.get_bill(pk=pk)
      if bill.owner != request.user:
          raise PermissionDenied("Unauthorized")
      serialized_bill = PopulatedBillSerializer(bill)
      return Response(serialized_bill.data)

  # UPDATE
  def put(self, request, pk):
    bill_to_update = self.get_bill(pk=pk)
    if bill_to_update.owner != request.user:
      raise PermissionDenied("Unauthorized")
    updated_bill = BillSerializer(bill_to_update, data=request.data) 
    try:
        updated_bill.is_valid(raise_exception=True)
        updated_bill.save()
        return Response(updated_bill.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


  # DELETE
  def delete(self, request, pk):
      bill_to_delete = self.get_bill(pk)
      if bill_to_delete.owner != request.user:
          raise PermissionDenied("Unauthorized")
      bill_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
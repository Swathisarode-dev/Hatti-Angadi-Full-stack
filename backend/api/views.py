from rest_framework import viewsets
from .models import Category, MenuItem, Review, Inquiry, TableBooking
from .serializers import CategorySerializer, MenuItemSerializer, ReviewSerializer, InquirySerializer, TableBookingSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer

class TableBookingViewSet(viewsets.ModelViewSet):
    queryset = TableBooking.objects.all().order_by('-created_at')
    serializer_class = TableBookingSerializer

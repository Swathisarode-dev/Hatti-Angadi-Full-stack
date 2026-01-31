from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, MenuItemViewSet, ReviewViewSet, InquiryViewSet, TableBookingViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'menu-items', MenuItemViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'inquiries', InquiryViewSet)
router.register(r'table-bookings', TableBookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

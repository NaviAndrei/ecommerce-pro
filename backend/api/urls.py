from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    RegisterView, ProfileView, CategoryViewSet, ProductViewSet,
    CartView, CartItemView, OrderViewSet,
    FeaturedProductListView
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet, basename='orders')

urlpatterns = [
    # Featured Products (Moved up)
    path('products/featured/', FeaturedProductListView.as_view(), name='featured-products'),

    # Router URLs (Now checked after specific paths)
    path('', include(router.urls)),
    
    # Authentication
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User profile
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    
    # Cart
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/items/', CartItemView.as_view(), name='cart-add'),
    path('cart/items/<int:item_id>/', CartItemView.as_view(), name='cart-item'),
]

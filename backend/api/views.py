from rest_framework import viewsets, generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import get_object_or_404
import os
import subprocess
import hmac
import hashlib
from django.http import HttpResponseForbidden, HttpResponseServerError, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import requests # Import requests

from .models import Category, Product, Profile, Cart, CartItem, Order, OrderItem
from .serializers import (
    UserSerializer, RegisterSerializer, ProfileSerializer,
    CategorySerializer, ProductSerializer, CartSerializer,
    CartItemSerializer, OrderSerializer, OrderCreateSerializer
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user.profile


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        
        # Filter by category (ID or name)
        category_param = self.request.query_params.get('category', None)
        if category_param is not None:
            # Check if the parameter is numeric (an ID) or a string (slug)
            if category_param.isdigit():
                queryset = queryset.filter(category__id=category_param)
            else:
                # Filter by category name (case-insensitive) since there's no slug field
                queryset = queryset.filter(category__name__iexact=category_param)
        
        # Search functionality
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search)
            )
        
        # Price range filtering
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        return queryset


class FeaturedProductListView(generics.ListAPIView):
    """Returns the 4 most recently added active products."""
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return Product.objects.filter(is_active=True).order_by('-created_at')[:4]


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Add item to cart"""
        cart = get_object_or_404(Cart, user=request.user)
        
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            quantity = serializer.validated_data['quantity']
            
            product = get_object_or_404(Product, id=product_id, is_active=True)
            
            # Check if product is in stock
            if product.stock < quantity:
                return Response(
                    {"detail": "Not enough items in stock."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if item already exists in cart
            try:
                cart_item = CartItem.objects.get(cart=cart, product=product)
                cart_item.quantity += quantity
                cart_item.save()
            except CartItem.DoesNotExist:
                CartItem.objects.create(
                    cart=cart,
                    product=product,
                    quantity=quantity
                )
            
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, item_id):
        """Update cart item quantity"""
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        
        quantity = request.data.get('quantity', 1)
        
        # Check if product is in stock
        if cart_item.product.stock < quantity:
            return Response(
                {"detail": "Not enough items in stock."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart_item.quantity = quantity
        cart_item.save()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    def delete(self, request, item_id):
        """Remove item from cart"""
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        
        cart_item.delete()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
    
    def create(self, request):
        serializer = OrderCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            order = serializer.save()
            return Response(
                OrderSerializer(order).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get secrets from environment variables (will be set on PythonAnywhere)
# For local testing, these might not be set, handle appropriately if testing locally.
WEBHOOK_SECRET = os.environ.get('PA_WEBHOOK_SECRET', 'local_secret_placeholder') # Use a placeholder for local testing if needed
PA_API_TOKEN = os.environ.get('PA_API_TOKEN')
PA_USERNAME = 'SyncWIvan' # Your PythonAnywhere username
PA_WEBAPP_DOMAIN = 'syncwivan.pythonanywhere.com' # Your webapp domain


@csrf_exempt # Disable CSRF for this webhook endpoint
def trigger_deployment_webhook(request):
    # 1. Verify the request method
    if request.method != 'POST':
        return HttpResponseForbidden('Invalid request method.')

    # 2. Verify the secret key (passed in a header for basic security)
    provided_secret = request.headers.get('X-Deploy-Secret')
    if not provided_secret:
        return HttpResponseForbidden('Missing deployment secret header.')

    if not WEBHOOK_SECRET:
            return HttpResponseServerError('Webhook secret not configured on server.')

    # Securely compare secrets
    if not hmac.compare_digest(provided_secret, WEBHOOK_SECRET):
        # Log the mismatch for debugging ONLY if needed, avoid logging secrets
        print(f"Secret mismatch. Provided: '{provided_secret[:5]}...', Expected: '{WEBHOOK_SECRET[:5]}...'")
        return HttpResponseForbidden('Invalid deployment secret.')

    # 3. Execute deployment commands
    try:
        # Define paths relative to where manage.py is
        # Ensure settings.BASE_DIR points to the 'backend' directory
        base_dir = settings.BASE_DIR
        repo_dir = os.path.dirname(base_dir) # Assumes BASE_DIR is 'backend', so repo_dir is project root
        venv_activate = f"/home/{PA_USERNAME}/.virtualenvs/venv/bin/activate" # Adjust venv path if needed

        # --- Deployment Commands ---
        commands = [
            f"cd {repo_dir}", # Change to project root first
            "echo '--- Pulling latest code ---'",
            "git status", # Check status before pull
            "git pull origin main",
            f"echo '--- Activating virtualenv ---'",
            f"source {venv_activate}",
            "echo '--- Installing dependencies ---'",
            # Install from requirements in the project root
            f"pip install -r {repo_dir}/requirements.txt",
            "echo '--- Running migrations ---'",
            # Run manage.py from the backend directory
            f"python {base_dir}/manage.py migrate --noinput",
            "echo '--- Deployment script finished ---'"
        ]

        # Combine commands into a single string to run in a shell
        full_command = " && ".join(commands)
        print(f"Executing deployment command: {full_command}") # Log the command being run

        # Run the commands - Increased timeout for potentially long installs/migrations
        result = subprocess.run(full_command, shell=True, capture_output=True, text=True, check=False, executable='/bin/bash', timeout=300) # Use check=False initially for debugging

        # Log output regardless of success for debugging
        print("Deployment Subprocess STDOUT:")
        print(result.stdout)
        print("Deployment Subprocess STDERR:")
        print(result.stderr)

        # Check if the process actually failed after logging
        if result.returncode != 0:
             raise subprocess.CalledProcessError(result.returncode, full_command, output=result.stdout, stderr=result.stderr)


        # 4. Reload Webapp via PythonAnywhere API (Only after successful commands)
        if PA_API_TOKEN:
                reload_url = f"https://www.pythonanywhere.com/api/v0/user/{PA_USERNAME}/webapps/{PA_WEBAPP_DOMAIN}/reload/"
                print(f"Attempting to reload webapp via API: {reload_url}")
                try:
                    response = requests.post(
                        reload_url,
                        headers={'Authorization': f'Token {PA_API_TOKEN}'},
                        timeout=30 # Add a timeout for the API call
                    )
                    print(f"Reload API status code: {response.status_code}")
                    if response.status_code != 200:
                        print(f"Reload API response text: {response.text}")
                        # Consider this a soft failure; deployment might have worked but reload failed
                except requests.exceptions.RequestException as api_e:
                     print(f"Error calling PythonAnywhere reload API: {api_e}")
                     # Consider this a soft failure
        else:
            print("PA_API_TOKEN environment variable not set, skipping webapp reload via API.")


        return JsonResponse({"status": "success", "message": "Deployment triggered and commands executed."})

    except subprocess.CalledProcessError as e:
        error_message = f"Deployment script failed.
Return Code: {e.returncode}
STDOUT: {e.stdout}
STDERR: {e.stderr}"
        print(f"ERROR: {error_message}")
        return HttpResponseServerError(error_message)
    except subprocess.TimeoutExpired as e:
         error_message = f"Deployment script timed out after {e.timeout} seconds.
STDOUT: {e.stdout}
STDERR: {e.stderr}"
         print(f"ERROR: {error_message}")
         return HttpResponseServerError(error_message)
    except Exception as e:
        # Catch any other unexpected exceptions
        error_message = f"An unexpected error occurred during deployment: {str(e)}"
        import traceback
        print(f"ERROR: {error_message}")
        traceback.print_exc() # Print full traceback for unexpected errors
        return HttpResponseServerError(error_message)

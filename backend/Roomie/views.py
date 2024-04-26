from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.views.generic.edit import CreateView
from django.shortcuts import render, redirect
from django.db import connection
from Roomie.forms import RegistrationForm
from .forms import PetRegistrationForm
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import json
from .serializers import *

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        form = RegistrationForm({
            'username': request.data.get('username'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'email': request.data.get('email'),
            'phone': request.data.get('phone'),
            'password': request.data.get('password'),
            'password2': request.data.get('password2'),
            'dob': request.data.get('dob'),
            'gender': request.data.get('gender'),
        })
        print(form.errors)
        if form.is_valid():
        #     # Extract data from POST request
            username = request.data.get('username')
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            email = request.data.get('email')
            password = request.data.get('password')
            dob = request.data.get('dob')
            gender = request.data.get('gender')  # Make sure this is an integer
            phone = request.data.get('phone')
            
            # Check if user already exists in MySql
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT * 
                    FROM users
                    WHERE username = %s
                    """, [username])
                userNameExists = cursor.fetchone()
            
            if userNameExists:
                response_data = {'message': "Invalid Credentials: Username Possibly Already Taken"}
                return Response(response_data)

            # Create New User Object
            user = User.objects.create_user(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password  # Password is hashed automatically
            )


            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO users (username, first_name, last_name, DOB, gender, email, Phone, passwd)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """, [username, first_name, last_name, dob, gender, email, phone, make_password(password)])

            response_data = {'message': "User created successfully"}
            return Response(response_data)
        else:
            response_data = {'message': "Invalid Credentials: Username Possibly Already Taken"}
            return Response(response_data)
    else:
        response_data = {'message': "Invalid Request"}
        return Response(response_data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        
        data = super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        authenticate(self.context['request']._request, username=attrs["username"], password=attrs["password"])
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

def homepage(request):
    # This view will render a template called 'homepage.html'
    return render(request, 'homepage.html')

def main(request):
    # Logic for the main view
    return render(request, 'main.html')

class PetView(CreateView):
    form_class = PetRegistrationForm
    template_name='pet.html'



@api_view(['GET'])
def getPets(request, id):
    username=id

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT PetName, PetType, PetSize
            FROM pets
            WHERE username = %s
            """, [username])

        pets = cursor.fetchall()
    
    print(pets)
    return Response({"pets": pets})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def addPet(request, id):
    username=id
    form = PetRegistrationForm({
        "username": request.data.get('username'),
        "petName": request.data.get('petName'),
        "petType": request.data.get('petType'),
        "petSize": request.data.get('petSize'),
    })

    print(form.errors)

    if form.is_valid():
        username = request.data.get('username')
        petName = request.data.get('petName')
        petType = request.data.get('petType')
        petSize = request.data.get('petSize')

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO pets (PetName, PetType, PetSize, username)
                VALUES (%s, %s, %s, %s)
                """, [petName, petType, petSize, username])

            pets = cursor.fetchall()
    
    return Response({"pets": pets})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def editPet(request, id):
    username=id
    form = PetRegistrationForm({
        "username": request.data.get('username'),
        "petName": request.data.get('petName'),
        "petType": request.data.get('petType'),
        "petSize": request.data.get('petSize'),
    })
    print(request.data)
    print(form.errors)

    if form.is_valid():
        username = request.data.get('username')
        petName = request.data.get('petName')
        petType = request.data.get('petType')
        petSize = request.data.get('petSize')
        oldPetName = request.data.get('oldPetName')
        oldPetType = request.data.get('oldPetType')
        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE pets
                SET PetName = %s, PetType = %s, PetSize = %s
                WHERE username = %s AND PetName = %s AND PetType = %s
                """, [petName, petType, petSize, username, oldPetName, oldPetType])


    
    return Response({"message": "Pet successfully updated."})


@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def deletePet(request, id, petName, petType):
    print(request)
    username = id
    with connection.cursor() as cursor:
        cursor.execute("""
            DELETE
            FROM pets
            WHERE username = %s AND PetName = %s AND PetType = %s
            """, [username, petName, petType])


    
    return Response({"message": "Pet successfully deleted."})

@csrf_exempt  # Use this decorator to exempt this view from CSRF verification.
@require_http_methods(["POST"])  # This view only accepts POST requests.
def budgeting_view(request):
    if request.method == 'POST':
        # Assuming the body of the request is JSON
        data = json.loads(request.body)
        zipcode = data.get('zipcode')
        numBathrooms = int(data.get('numBathrooms'))
        numBedrooms = int(data.get('numBedrooms'))
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT AVG(AU.MonthlyRent) AS AverageRent
                FROM ApartmentUnit AU
                JOIN ApartmentBuilding AB ON AU.CompanyName = AB.CompanyName AND AU.BuildingName = AB.BuildingName
                WHERE AB.AddrZipCode = %s
                AND (SELECT COUNT(*) FROM Rooms WHERE UnitRentID = AU.UnitRentID AND description LIKE 'bedroom%%') = %s
                AND (SELECT COUNT(*) FROM Rooms WHERE UnitRentID = AU.UnitRentID AND description LIKE 'bathroom%%') = %s
            """, [zipcode, numBedrooms, numBathrooms])
            result = cursor.fetchone()

        if result:
            average_rent = result[0]
            return JsonResponse({
                'status': 'success',
                'data': {
                    'zipcode': zipcode,
                    'numBedrooms': numBedrooms,
                    'numBathrooms': numBathrooms,
                    'averageRent': average_rent
                }
            }, status=200)
        else:
            return JsonResponse({'status': 'error', 'message': 'No data found'}, status=404)

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

@csrf_exempt  # Use this decorator to exempt this view from CSRF verification.
@require_http_methods(["POST"])
def listing_view(request):
    try:
        # Parse JSON data from the request
        data = json.loads(request.body)
        building_name = data.get('BuildingName')
        company_name = data.get('CompanyName')

        # Validate input
        if not building_name or not company_name:
            return JsonResponse({'error': 'Missing BuildingName or CompanyName'}, status=400)

        # SQL Query to fetch data from ApartmentUnit table
        query = """
            SELECT * FROM ApartmentUnit
            WHERE BuildingName = %s AND CompanyName = %s;
        """

        with connection.cursor() as cursor:
            cursor.execute(query, [building_name, company_name])
            columns = [col[0] for col in cursor.description]
            results = [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]

        return JsonResponse(results, safe=False)  # Use safe=False when returning a list

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt  # Use this decorator to exempt this view from CSRF verification.
@require_http_methods(["POST"])
def advanced_search(request):
    # MonthlyRent, AvailableDateForMoveIn from apartmentunit
    # AddrCity, AddrState from apartmentbuilding
    # aType from amenities
    # aType from amenitiesin

    # Extract parameters from request
    min_rent = request.GET.get('min_rent')
    max_rent = request.GET.get('max_rent')
    in_door_washing_machine = request.GET.get('in_door_washing_machine') == 'true'
    gym = request.GET.get('gym') == 'true'
    city = request.GET.get('city')
    state = request.GET.get('state')

    # Start building the SQL query
    query = """
        SELECT u.MonthlyRent, u.AvailableDateForMoveIn, b.AddrCity, b.AddrState, a.aType
        FROM apartmentunit u
        INNER JOIN apartmentbuilding b ON u.BuildingID = b.BuildingID
        LEFT JOIN amenitiesin ai ON u.UnitID = ai.UnitID
        LEFT JOIN amenities a ON ai.AmenityID = a.AmenityID
        WHERE 1=1
        """
    params = []

    # Filter by monthly rent
    if min_rent:
        query += " AND u.MonthlyRent >= %s"
        params.append(min_rent)
    if max_rent:
        query += " AND u.MonthlyRent <= %s"
        params.append(max_rent)

    # Filter by city and state
    if city:
        query += " AND b.AddrCity = %s"
        params.append(city)
    if state:
        query += " AND b.AddrState = %s"
        params.append(state)

    # Filter by amenities
    amenity_conditions = []
    if in_door_washing_machine:
        amenity_conditions.append(" a.aType = 'In-door Washing Machine'")
    if gym:
        amenity_conditions.append(" a.aType = 'Gym'")
    if amenity_conditions:
        query += " AND (" + " OR ".join(amenity_conditions) + ")"

    # Execute the query safely
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        columns = [col[0] for col in cursor.description]
        data = [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]

    return JsonResponse(data, safe=False)


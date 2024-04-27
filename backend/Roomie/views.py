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
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        authenticate(self.context['request']._request, username=attrs["username"], password=attrs["password"])
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def homepage(request):
    # This view will render a template called 'homepage.html'
    return render(request, 'homepage.html')


def main(request):
    # Logic for the main view
    return render(request, 'main.html')


class PetView(CreateView):
    form_class = PetRegistrationForm
    template_name = 'pet.html'


@api_view(['GET'])
def getPets(request, id):
    username = id

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
    username = id
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
    username = id
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


@csrf_exempt
@require_http_methods(["POST"])
def budgeting_view(request):
    if request.method == 'POST':
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


@csrf_exempt
@require_http_methods(["POST"])
def listing_view(request):
    try:
        data = json.loads(request.body)
        building_name = data.get('BuildingName')
        company_name = data.get('CompanyName')
        unit_number = data.get('UnitNumber')

        print(building_name)
        print(company_name)
        print(unit_number)
        if not building_name or not company_name:
            return JsonResponse({'error': 'Missing BuildingName or CompanyName'}, status=400)


        query = """
                SELECT 
                    AU1.UnitRentID,
                    AU1.CompanyName,
                    AU1.BuildingName,
                    AU1.unitNumber,
                    AU1.MonthlyRent,
                    AU1.squareFootage,
                    AU1.AvailableDateForMoveIn,
                    ROUND(AVG(AU2.MonthlyRent), 0) AS AvgMktRate,
                    (SELECT COUNT(*) FROM Rooms WHERE UnitRentID = AU1.UnitRentID AND description LIKE '%%bathroom%%') AS NumBathrooms,
                    (SELECT COUNT(*) FROM Rooms WHERE UnitRentID = AU1.UnitRentID AND description LIKE '%%bedroom%%') AS NumBedrooms
                FROM 
                    ApartmentUnit AU1
                INNER JOIN 
                    ApartmentBuilding AB1 ON AU1.CompanyName = AB1.CompanyName AND AU1.BuildingName = AB1.BuildingName
                LEFT JOIN 
                    ApartmentUnit AU2 ON AU1.CompanyName = AU2.CompanyName AND AU1.BuildingName = AU2.BuildingName AND AU2.squareFootage BETWEEN AU1.squareFootage * 0.9 AND AU1.squareFootage * 1.1
                INNER JOIN 
                    ApartmentBuilding AB2 ON AU2.CompanyName = AB2.CompanyName AND AU2.BuildingName = AB2.BuildingName AND AB1.AddrCity = AB2.AddrCity
                WHERE 
                    AU1.BuildingName = %s AND AU1.CompanyName = %s
                GROUP BY 
                    AU1.UnitRentID, AU1.unitNumber, AU1.MonthlyRent, AU1.squareFootage, AU1.AvailableDateForMoveIn, AU1.CompanyName, AU1.BuildingName;
            """

        with connection.cursor() as cursor:
            cursor.execute(query, [building_name, company_name])
            columns = [col[0] for col in cursor.description]
            results = [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]
        responseunit=[]
        if unit_number:
            for result in results:
                if result['unitNumber'] == unit_number:
                    responseunit=result
                    break
        print(responseunit)
        if responseunit:
            return JsonResponse(responseunit, safe=False)
        else:
            print(results)
            return JsonResponse(results, safe=False)  # Use safe=False when returning a list


    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt  # Use this decorator to exempt this view from CSRF verification.
@require_http_methods(["POST"])
def advanced_search(request):
    data = json.loads(request.body.decode('utf-8'))
    appliance_keys = [
        'CentralAC', 'DishWasher', 'Dryer', 'GasStove',
        'InductionCooker', 'WashingMachine', 'WasteShredder'
    ]


    UnitAmenities = []
    BuildingAmenities = []

    for key, value in data.items():
        if value is True:  # Check if the value is True
            if key in appliance_keys:
                UnitAmenities.append(key)
            else:
                BuildingAmenities.append(key)


    if not UnitAmenities and not BuildingAmenities:
        query = """SELECT
            au.UnitRentID,
            au.unitNumber,
            au.MonthlyRent,
            au.squareFootage,
            au.AvailableDateForMoveIn
        FROM
            ApartmentUnit au
        JOIN
            ApartmentBuilding ab ON au.CompanyName = ab.CompanyName AND au.BuildingName = ab.BuildingName
        WHERE
            au.MonthlyRent BETWEEN %s AND %s
            AND ab.AddrCity = %s
            AND ab.AddrState = %s
            AND au.AvailableDateForMoveIn >= %s"""
        with connection.cursor() as cursor:
            cursor.execute(query,
                           [data['minRent'], data['maxRent'], data['city'], data['state'],
                            data['AvailableDateForMoveIn']])
            rows = cursor.fetchall()
    elif UnitAmenities and BuildingAmenities:
        unitamlength=len(UnitAmenities)
        buildingamlength=len(BuildingAmenities)
        query = """SELECT
        au.UnitRentID,
        au.unitNumber,
        au.MonthlyRent,
        au.squareFootage,
        au.AvailableDateForMoveIn
    FROM
        ApartmentUnit au
    JOIN
        ApartmentBuilding ab ON au.CompanyName = ab.CompanyName AND au.BuildingName = ab.BuildingName
    WHERE
        au.MonthlyRent BETWEEN %s AND %s
        AND ab.AddrCity = %s
        AND ab.AddrState = %s
        AND au.AvailableDateForMoveIn >= %s
        AND EXISTS (
            SELECT 1 FROM AmenitiesIn ai 
            WHERE ai.UnitRentID = au.UnitRentID AND ai.aType IN %s
            GROUP BY ai.UnitRentID
            HAVING COUNT(DISTINCT ai.aType) = %s
        )
        AND EXISTS (
            SELECT 1 FROM Provides p
            WHERE p.CompanyName = ab.CompanyName AND p.BuildingName = ab.BuildingName AND p.aType IN %s
            GROUP BY p.CompanyName, p.BuildingName
            HAVING COUNT(DISTINCT p.aType) = %s
        )
        """
        with connection.cursor() as cursor:
            cursor.execute(query,
                           [data['minRent'], data['maxRent'], data['city'], data['state'],
                            data['AvailableDateForMoveIn'],
                            tuple(UnitAmenities),unitamlength, tuple(BuildingAmenities),buildingamlength])
            rows = cursor.fetchall()
    elif UnitAmenities and not BuildingAmenities:
        unitamlength=len(UnitAmenities)
        query = """SELECT
            au.UnitRentID,
            au.unitNumber,
            au.MonthlyRent,
            au.squareFootage,
            au.AvailableDateForMoveIn
        FROM
            ApartmentUnit au
        JOIN
            ApartmentBuilding ab ON au.CompanyName = ab.CompanyName AND au.BuildingName = ab.BuildingName
        WHERE
            au.MonthlyRent BETWEEN %s AND %s
            AND ab.AddrCity = %s
            AND ab.AddrState = %s
            AND au.AvailableDateForMoveIn >= %s
            AND EXISTS (
                SELECT 1 FROM AmenitiesIn ai 
                WHERE ai.UnitRentID = au.UnitRentID AND ai.aType IN %s
                GROUP BY ai.UnitRentID
                HAVING COUNT(DISTINCT ai.aType) = %s
            )"""
        with connection.cursor() as cursor:
            cursor.execute(query,
                           [data['minRent'], data['maxRent'], data['city'], data['state'],
                            data['AvailableDateForMoveIn'],
                            tuple(UnitAmenities),unitamlength])
            rows = cursor.fetchall()
    else:
        buildingamlength = len(BuildingAmenities)
        query = """SELECT
                au.UnitRentID,
                au.unitNumber,
                au.MonthlyRent,
                au.squareFootage,
                au.AvailableDateForMoveIn
            FROM
                ApartmentUnit au
            JOIN
                ApartmentBuilding ab ON au.CompanyName = ab.CompanyName AND au.BuildingName = ab.BuildingName
            WHERE
                au.MonthlyRent BETWEEN %s AND %s
                AND ab.AddrCity = %s
                AND ab.AddrState = %s
                AND au.AvailableDateForMoveIn >= %s
                AND EXISTS (
                    SELECT 1 FROM Provides p
                    WHERE p.CompanyName = ab.CompanyName AND p.BuildingName = ab.BuildingName AND p.aType IN %s
                    GROUP BY p.CompanyName, p.BuildingName
                     HAVING COUNT(DISTINCT p.aType) = %s
                )
                """
        with connection.cursor() as cursor:
            cursor.execute(query,
                           [data['minRent'], data['maxRent'], data['city'], data['state'],
                            data['AvailableDateForMoveIn'], tuple(BuildingAmenities),buildingamlength])
            rows = cursor.fetchall()

    response_data = [
        {
            "UnitRentID": row[0],
            "unitNumber": row[1],
            "MonthlyRent": row[2],
            "SquareFootage": row[3],
            "AvailableDateForMoveIn": row[4].isoformat() if row[4] else None
        } for row in rows
    ]

    return JsonResponse(response_data, safe=False)

@require_http_methods(["GET"])
def get_interest_view(request, UnitRentID):
    query = """
        SELECT 
            I.UnitRentID,
            I.MoveInDate,
            I.RoommateCnt AS RoommateCount,
            U.Phone AS PhoneNumber,
            U.email
        FROM 
            Interests I
        JOIN 
            Users U ON I.username = U.username
        WHERE 
            I.UnitRentID = %s;
    """

    # Execute the query
    with connection.cursor() as cursor:
        cursor.execute(query, [UnitRentID])
        columns = [col[0] for col in cursor.description]
        results = [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]

    formatted_results = [
        {
            "unitRentID": result['UnitRentID'],
            "MoveInDate": result['MoveInDate'].strftime('%m-%d-%Y'),
            "RoommateCount": str(result['RoommateCount']),
            "PhoneNumber": result['PhoneNumber'],
            "email": result['email']
        }
        for result in results
    ]

    return JsonResponse(formatted_results, safe=False)


@csrf_exempt
@require_http_methods(["POST"])
def post_interest_view(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        unit_rent_id = data['unitRentID']
        roommate_count = data['roommateCount']
        move_in_date = data['MoveInDate']
    except (KeyError, json.JSONDecodeError) as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    query = """
        INSERT INTO Interests (username, UnitRentID, RoommateCnt, MoveInDate)
        VALUES (%s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
        RoommateCnt = VALUES(RoommateCnt), MoveInDate = VALUES(MoveInDate);
    """

    # Execute the query
    with connection.cursor() as cursor:
        try:
            cursor.execute(query, [username, unit_rent_id, roommate_count, move_in_date])
            connection.commit()
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    # Successful response
    return JsonResponse({'status': 'success'}, status=200)


@require_http_methods(["GET"])
def get_favourite_view(request, username):
    query = """
        SELECT UnitRentID
        FROM Favourite
        WHERE username = %s;
    """
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, [username])
            unit_rent_ids = [row[0] for row in cursor.fetchall()]
        return JsonResponse({'username': username, 'favourites': unit_rent_ids}, status=200)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])  # Allows only POST requests to this view.
def add_favourite_view(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        unitRentID = data['unitRentID']
        # Insert into the Favourite table
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO Favourite (username, UnitRentID)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE UnitRentID=UnitRentID;
            """, [username, unitRentID])
            connection.commit()
        return JsonResponse({'status': 'success', 'message': 'Favourite added successfully.'}, status=201)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


@api_view(['GET'])
def detailedUnitInfo(request, pk):
    try:
        unitRentID = int(pk)

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT *
                FROM apartmentunit
                WHERE UnitRentID = %s;
                """, [unitRentID])
            
            unitInfo = cursor.fetchone()
        print(unitInfo)

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT aType 
                FROM apartmentunit AS apt
                NATURAL JOIN amenitiesin AS ai
                # JOIN rooms AS r ON apt.UnitRentID = r.UnitRentID
                WHERE apt.UnitRentID = %s;
                """, [unitRentID])
            
            unitAmenities = cursor.fetchall()
        
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT (SELECT COUNT(*) FROM Rooms WHERE UnitRentID = apt.UnitRentID AND description LIKE '%%bathroom%%') AS NumBathrooms, 
                           (SELECT COUNT(*) FROM Rooms WHERE UnitRentID = apt.UnitRentID AND description LIKE '%%bedroom%%') AS NumBedrooms
                FROM apartmentunit AS apt
                WHERE apt.UnitRentID = %s;
                """, [unitRentID])
            
            unitRooms = cursor.fetchall()

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT *, 
                           (SELECT COUNT(*)
                            FROM ApartmentUnit AS a
                            WHERE a.CompanyName = %s AND a.BuildingName = %s
                            GROUP BY a.CompanyName, a.BuildingName 
                           )
                FROM ApartmentBuilding as b1
                WHERE b1.CompanyName = %s AND b1.BuildingName = %s;
                """, [unitInfo[1], unitInfo[2], unitInfo[1], unitInfo[2]])
            
            buildingInfo = cursor.fetchall()

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT aType
                FROM Provides
                WHERE CompanyName = %s AND BuildingName = %s;
                """, [unitInfo[1], unitInfo[2]])
            
            buildingAmenities = cursor.fetchall()

        print(buildingInfo)
        return Response({"unitInfo": unitInfo, "unitAmenities": unitAmenities, "unitRooms": unitRooms, "buildingInfo": buildingInfo, "buildingAmenities": buildingAmenities})

    except Exception as e:
        print(e)
        return Response({"message": str(e)})

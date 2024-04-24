from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.views.generic.edit import CreateView
from django.shortcuts import render, redirect
from django.db import connection
from Roomie.forms import RegistrationForm
from .forms import PetRegistrationForm
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes

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
            print('yes')
        #     # Extract data from POST request
            username = request.data.get('username')
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            email = request.data.get('email')
            password = request.data.get('password')
            dob = request.data.get('dob')
            gender = request.data.get('gender')  # Make sure this is an integer
            phone = request.data.get('phone')
            # Create User object
            user = User.objects.create_user(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password  # Password is hashed automatically
            )

            # Insert additional details into 'users' table using raw SQL
    

            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO users (username, first_name, last_name, DOB, gender, email, Phone, passwd)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """, [username, first_name, last_name, dob, gender, email, phone, make_password(password)])

            response_data = {'message': "User created successfully"}
            return Response(response_data)
        else:
            response_data = {'message': "Invalid Credentials"}
            return Response(response_data)
    # else:
    #     form = RegistrationForm()
    #     return render(request, 'register.html', {'form': form})
    else:
        response_data = {'message': "Invalid Request"}
        return Response(response_data)

def homepage(request):
    # This view will render a template called 'homepage.html'
    return render(request, 'homepage.html')

def main(request):
    # Logic for the main view
    return render(request, 'main.html')

class PetView(CreateView):
    form_class = PetRegistrationForm
    template_name='pet.html'
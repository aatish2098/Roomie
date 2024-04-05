from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.db import connection

from Roomie.forms import RegistrationForm


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # Extract data from POST request
            username = request.POST.get('username')
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            email = request.POST.get('email')
            password = request.POST.get('password')
            dob = request.POST.get('dob')
            gender = request.POST.get('gender')  # Make sure this is an integer
            phone = request.POST.get('phone')

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

            return redirect('login')
        else:
            # Form data is not valid, return to the registration page with validation errors
            return render(request, 'register.html', {'form': form})
    else:
        form = RegistrationForm()
        return render(request, 'register.html', {'form': form})


def homepage(request):
    # This view will render a template called 'homepage.html'
    return render(request, 'homepage.html')

def main(request):
    # Logic for the main view
    return render(request, 'main.html')


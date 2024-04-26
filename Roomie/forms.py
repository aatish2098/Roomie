from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Pet    

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

class PetRegistrationForm(forms.ModelForm):

    class Meta:
        model = Pet
        fields = ['petName', 'petType', 'petSize']
        petTypes = [
            ("null",""),
            ('bird', 'Bird'),
            ('cat', 'Cat'),
            ('dog', 'Dog'),
            ('frog', 'Frog'),
            ('guineaPig', 'Guinea Pig'),
            ('hamster', 'Hamster'),
            ('rabbit', 'Rabbit'),
            ('reptile', 'Reptile'),
        ]

        petSizes = [
            ("null", ""),
            ("small", "Small"),
            ("medium", "Medium"),
            ("large", "Large"),
        ]

        widgets = {
            'petName': forms.TextInput(attrs={'class': 'form-control'}),
            'petType': forms.Select(choices=petTypes, attrs={'class': 'form-control'}),
            'petSize': forms.Select(choices=petSizes, attrs={'class': 'form-control'}),
        }
from django import forms
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from .models import Pet 
import re

class RegistrationForm(forms.ModelForm):
    username = forms.CharField(max_length=20, validators=[RegexValidator(r'^\w+$', 'Enter a valid username. This value may contain only letters, numbers, and _ character.')])
    first_name = forms.CharField(max_length=20)
    last_name = forms.CharField(max_length=20)
    email = forms.EmailField()
    phone = forms.CharField(max_length=20, validators=[RegexValidator(r'^\+?1?\d{9,15}$', 'Enter a valid phone number.')])
    password = forms.CharField(widget=forms.PasswordInput())
    password2 = forms.CharField(widget=forms.PasswordInput(), label="Confirm password")
    dob = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    gender = forms.ChoiceField(
        choices=[(1, 'Male'), (2, 'Female'), (3, 'Prefer not to say')],
        widget=forms.Select,
        required=True
    )

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'dob', 'gender', 'phone', 'password']

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Passwords don\'t match.')
        return cd['password2']

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('A user with that username already exists.')
        return username

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
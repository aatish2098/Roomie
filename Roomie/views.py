from django import forms
from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.generic.edit import CreateView
from .models import UserProfile, Pet    
from .forms import PetRegistrationForm

class UserRegistrationForm(forms.ModelForm):
    username = forms.CharField(max_length=20)
    first_name = forms.CharField(max_length=20)
    last_name = forms.CharField(max_length=20)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())

    DOB = forms.DateField()
    gender = forms.IntegerField()
    Phone = forms.CharField(max_length=20, required=False)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def save(self, commit=True):
        user = super(UserRegistrationForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()

            # Create UserProfile
            user_profile = UserProfile.objects.create(
                user=user,
                DOB=self.cleaned_data['DOB'],
                gender=self.cleaned_data['gender'],
                Phone=self.cleaned_data['Phone']
            )

        return user
    

class PetView(CreateView):
    form_class = PetRegistrationForm
    template_name='pet.html'

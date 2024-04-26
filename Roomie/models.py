from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    class Meta:
        app_label = 'Roomie.UserProfile'

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    DOB = models.DateField()
    gender = models.IntegerField()  # Consider using choices for gender representation
    Phone = models.CharField(max_length=20, blank=True, null=True)
    passwd = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.user.username
    

class Pet(models.Model):
    class Meta:
        app_label = 'Roomie.Pet'

    username = models.ForeignKey(User, on_delete=models.CASCADE)
    petName = models.CharField(max_length=50)
    petType = models.CharField(max_length=50)
    petSize = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.user.username}: {self.petName}'
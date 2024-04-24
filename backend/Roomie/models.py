from django.contrib.auth.models import User
from django.db import models
from django.conf import settings

# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#     dob = models.DateField()
#     gender = models.IntegerField()  # Assuming gender is stored as an integer
#     phone = models.CharField(max_length=20, null=True, blank=True)
#
#     class Meta:
#         db_table = 'users'  # Ensures this model maps to your existing 'users' table
class Pet(models.Model):
    class Meta:
        app_label = 'Roomie.Pet'

    username = models.ForeignKey(User, on_delete=models.CASCADE)
    petName = models.CharField(max_length=50)
    petType = models.CharField(max_length=50)
    petSize = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.user.username}: {self.petName}'
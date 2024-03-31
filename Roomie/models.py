from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    DOB = models.DateField()
    gender = models.IntegerField()  # Consider using choices for gender representation
    Phone = models.CharField(max_length=20, blank=True, null=True)
    passwd = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.user.username
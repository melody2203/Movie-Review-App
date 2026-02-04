from django.contrib import admin
from .models import CustomUser, PasswordResetCode

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(PasswordResetCode)

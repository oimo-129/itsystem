from django.contrib import admin

# Register your models here.

from .models import *

class BaseInfoAdmin(admin.ModelAdmin):
    pass

class FileModelAdmin(admin.ModelAdmin):
    pass


admin.site.register(BannerModel, BaseInfoAdmin)

admin.site.register(FileModel, FileModelAdmin)
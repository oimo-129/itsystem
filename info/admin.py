from django.contrib import admin

# Register your models here.

from .models import *

class BaseInfoAdmin(admin.ModelAdmin):
    pass

class FileModelAdmin(admin.ModelAdmin):
    pass

class File1ModelAdmin(admin.ModelAdmin):
    pass

#新闻，测试看看效果
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'pub_date')
    search_fields = ('title', 'content')

#轮播图后台管理
admin.site.register(BannerModel, BaseInfoAdmin)
#产品线后台管理
admin.site.register(FileModel, FileModelAdmin)
#首页左侧文件
admin.site.register(File1Model,File1ModelAdmin)
"""
URL configuration for itproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from django.views.generic import TemplateView

import user

#用户模块
from user import views as user_views
from info import views as info_views



#MEDIA_URL的使用
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from itproject.settings import MEDIA_ROOT



urlpatterns = [

#首页
    path('', user_views.IndexView.as_view(), name='home'),
#后台管理页面
    path('admin/', admin.site.urls),
#登录
    path('login/', user_views.LoginView.as_view(), name="login"),
#注册
    path('resign/', user_views.RegisterView.as_view(), name="resign"),
#退出登录
    path('logout/', user_views.LogoutView.as_view(), name="logout"),
#user模块
    path('user/', include('user.urls', namespace='user')),
#上传的信息模块
    path('info/', include('info.urls', namespace='info')),
#用于新闻上传的富文本    
    # path('ckeditor/', include('ckeditor_uploader.urls')),
    path('ckeditor5/', include('django_ckeditor_5.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

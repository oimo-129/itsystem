# -*- coding: utf-8 -*-

from django.urls import path, include

from .views import *


app_name = 'user'
urlpatterns = [

    path('userinfo/', UserInfoView.as_view(), name='userinfo'),

    path('need/', UserInfoNeed.as_view(), name='need'),
    #个人中心上传用户头像
    path('avatar/upload/', UploadImageView.as_view(), name="upload_avatar"),
    #个人中心修改密码
    path('update/pwd/',UpdatePwdView.as_view(),name="update_pwd")
    


]
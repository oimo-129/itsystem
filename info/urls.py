
from django.urls import path, include

from .views import *


app_name = 'info'
urlpatterns = [

    path('infolist/', InfoView.as_view(), name='infolist'),
    path('download/<int:file_id>/', FileDownloadView.as_view(), name='file_download'),  # 文件下载视图
    path('banner/<int:file_id>/', BannerDownloadView.as_view(), name='banner_download'),  # 轮播图下载视图
    path('file1/<int:file_id>/', File1DownloadView.as_view(), name='file1_download'),  # 首页左侧下载视图


]
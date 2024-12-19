#from msilib.schema import ListView

from django.http.response import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.

from django.views import View


#验证模块添加
from django.contrib.auth.mixins import LoginRequiredMixin
#MEDIA模块添加
from django.conf import settings
#分页模块
from django.core.paginator import Paginator
#下载模块
from django.http import FileResponse, Http404
import os
from django.shortcuts import get_object_or_404
import mimetypes
#查询模块
from django.db.models import Q

from .models import FileModel,BannerModel,File1Model,News
#时间模块
from datetime import datetime,timedelta


'''
产品线界面
'''
#12.文件下载功能？应该是前端的事？

class InfoView(LoginRequiredMixin,View):
    
    #未验证成功，返回这个界面
    def handle_no_permission(self):
        return render(self.request, 'no_permission.html')
    
    def get(self, request):
        #添加分类模块
        category = request.GET.get('category','all')
        #搜索关键词
        keyword = request.GET.get('keyword', '').strip()
        #时间内搜索参数
        selected_date = request.GET.get('selected_date')
        #添加首页传回来的选项
        file_id = request.GET.get('file_id')  
        
        # 构建基础查询  
        files = FileModel.objects.all() 
        
        #根据分类筛选
        if category and category != 'all':
            files = FileModel.objects.filter(file_dist=category).order_by('-id')
        # 如果有搜索关键词  
        if keyword:  
            # 使用 Q 对象进行或条件查询  
            files = files.filter(  
                Q(name__icontains=keyword) |  # name 字段包含关键词  
                Q(file_product__icontains=keyword)  # file_product 字段包含关键词  
            )
        #如果有日期筛选
        if selected_date: 
             
            try:  
                # 将字符串转换为日期对象  
                date_obj = datetime.strptime(selected_date, '%Y-%m-%d') 
          
                # 创建该日期的开始和结束时间  
                start_date = date_obj  
                end_date = date_obj + timedelta(days=1)  
                # 筛选当天上传的文件  
                files = files.filter(add_time__gte=start_date, add_time__lt=end_date)  
            except ValueError:  
                pass  # 如果日期格式无效，忽略日期筛选        
         # 按 id 降序排序  
        files = files.order_by('-id')  
         
         #每页显示数量
        page_size = 6
        paginator = Paginator(files, page_size)
        page = request.GET.get('page', 1)

        try:
            #获取当前页的数据
            current_page = paginator.page(page)
            files_page = current_page.object_list
        except:
            current_page = paginator.page(1)
            files_page = current_page.object_list
        
        if file_id:
            target_file = FileModel.objects.get(id=file_id)
            context = {
            'page_size': page_size,
            'files': files_page,
            'total_files': len(files),
            'username': request.user.username,
            'MEDIA_URL': settings.MEDIA_URL,
            'current_category': category,
            'keyword': keyword,
            'selected_date': selected_date,
            'target_file':target_file,
            'file_id':file_id, 
        }
            
        else:
            context = {
                'page_size': page_size,
                'files': files_page,
                'total_files': len(files),
                'username': request.user.username,
                'MEDIA_URL': settings.MEDIA_URL,
                'current_category': category,
                'keyword': keyword,
                'selected_date': selected_date, 
            }

        return render(request, "product.html", context)


#MIME类型字典
MIME_TYPES = {
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
}


#产品线文件下载    
class FileDownloadView(View):
    

    
    def get(self, request, file_id):
        file_obj = get_object_or_404(FileModel, id=file_id)
        file_path = file_obj.file.path

        try:
            filename = os.path.basename(file_path)
            ext = os.path.splitext(filename)[1].lower()

            # 获取 MIME 类型
            content_type = MIME_TYPES.get(ext) or mimetypes.guess_type(file_path)[0]

            response = FileResponse(open(file_path, 'rb'))
            response['Content-Type'] = content_type
            response['Content-Disposition'] = f'attachment; filename="{filename}"'

            return response

        except FileNotFoundError:
            raise Http404("文件未找到")



#首页轮播图文件下载    
class BannerDownloadView(View):
    
   
    def get(self, request, file_id):
        file_obj = get_object_or_404(BannerModel, id=file_id)
        file_path = file_obj.file_banner.path

        try:
            filename = os.path.basename(file_path)
            ext = os.path.splitext(filename)[1].lower()

            # 获取 MIME 类型
            content_type = MIME_TYPES.get(ext) or mimetypes.guess_type(file_path)[0]

            response = FileResponse(open(file_path, 'rb'))
            response['Content-Type'] = content_type
            response['Content-Disposition'] = f'attachment; filename="{filename}"'

            return response

        except FileNotFoundError:
            raise Http404("文件未找到")




#首页左下文件下载    
class File1DownloadView(View):
    
   
    def get(self, request, file_id):
        file_obj = get_object_or_404(File1Model, id=file_id)
        file_path = file_obj.file1.path

        try:
            filename = os.path.basename(file_path)
            ext = os.path.splitext(filename)[1].lower()

            # 获取 MIME 类型
            content_type = MIME_TYPES.get(ext) or mimetypes.guess_type(file_path)[0]

            response = FileResponse(open(file_path, 'rb'))
            response['Content-Type'] = content_type
            response['Content-Disposition'] = f'attachment; filename="{filename}"'

            return response

        except FileNotFoundError:
            raise Http404("文件未找到")


'''
首页新闻显示
'''

def news_list(request):
    news_items = News.objects.all()
    return render(request, 'index.html', {'news_items': news_items})

def news_detail(request, news_id):
    news = get_object_or_404(News, id=news_id)
    return render(request, 'news_detail.html', {'news': news})
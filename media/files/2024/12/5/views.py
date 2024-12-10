from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, redirect, HttpResponse, HttpResponseRedirect

from django.views import View

from .models import *

from .forms import *

#登录模块添加
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from django.urls import reverse

from django.contrib.auth.hashers import make_password, check_password

#验证模块添加
from django.contrib.auth.mixins import LoginRequiredMixin

#json处理前端，异步，ajax启动
from django.http import JsonResponse
import json


#添加前端静态路由的配置
from itproject.settings import MEDIA_ROOT, MEDIA_URL
from django.conf import settings

#首页的资源载入
from info.models import *

#登录验证
class CustomBackend(ModelBackend):

    def authenticate(self, username=None, password=None, **kwargs):
        try:
            user = UserProfile.objects.get(Q(username=username) | Q(email=username))
            if user.check_password(password):
                return user
        except Exception as e:
            return None



'''
系统首页设置
'''
class IndexView(View):
    def get(self, request):

        #轮播图资源
        all_banners = BannerModel.objects.all().order_by('index')
        numbers = range(1,9)
        context = {
            'all_banners': all_banners,
            'MEDIA_URL': settings.MEDIA_URL,
            'numbers': numbers,
        }

        return render(request, "index.html", context)






'''
登录视图
'''
class LoginView(View):
    def get(self, request):
        return render(request, "login.html", {})

    def post(self, request):
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            #登录验证
            user_name = request.POST.get('username', "")
            password = request.POST.get('password', "")


           #这一步验证错误，总是null
            user = authenticate(username=user_name, password=password)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect(reverse("home"), {'MEDIA_URL': settings.MEDIA_URL})
            else:
                msg_error = "登录验证失败"
                return render(request, "login.html", {"msg": msg_error})            
        else:
            return render(request, "login.html", {"login_form": login_form})


'''
注册视图
'''
class RegisterView(View):

    def get(self, request):
        register_form = ResignForm()
        return render(request, "resign.html", {'register_form': register_form})

    def post(self, request):
        register_form = ResignForm(request.POST)
        if register_form.is_valid():
            email_num = request.POST.get("email", " ")
            
            if UserProfile.objects.filter(email=email_num).exists():
                return render(request, "resign.html", {'register_form': register_form, 'msg': "邮箱号已被使用"})
         
                
            pass_word = request.POST.get("password", "")
            #创建用户
            user_profile = UserProfile(
                email= email_num,
                username= email_num,
               
            )
            #密码，应该是这里要修改
            user_profile.password = make_password(pass_word)
            user_profile.save()
            return render(request, "resign.html", {'register_form': register_form, 'msg': "用户注册成功!!!"})
        else:
            return render(request, "resign.html", {"register_form": register_form})


'''
退出模块
'''
class LogoutView(View):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect(reverse("home"))


'''
个人中心模块
'''

 
class UserUpdateForm(forms.ModelForm):  
    class Meta:  
        model = UserProfile  
        fields = ['username', 'desp_name']  

    def clean_username(self):  
        username = self.cleaned_data.get('username')  
        if not username:  
            raise forms.ValidationError("用户名不能为空")  
        if UserProfile.objects.exclude(id=self.instance.id).filter(username=username).exists():  
            raise forms.ValidationError("该用户名已被使用")  
        return username 


class UserInfoView(LoginRequiredMixin,View):
    def get(self, request):

        desp_back = Department.objects.all()
        context = {
                'username': request.user.username,
                'desp_front': desp_back,
                'email_front': request.user.email,
                'MEDIA_URL': settings.MEDIA_URL,
            }

        return render(request, "usercenter.html", context)
    
    def post(self, request):  
        # 创建一个新的字典来存储处理后的数据  
        processed_data = request.POST.copy()  
        
        # 如果有desp_id，将其转换为desp_name  
        desp_id = request.POST.get('desp_id')  
        if desp_id:  
            try:  
                department = Department.objects.get(id=desp_id)  
                processed_data['desp_name'] = department.id  # 使用部门ID  
            except Department.DoesNotExist:  
                return JsonResponse({  
                    'status': 'error',  
                    'message': '所选科室不存在'  
                })  

        form = UserUpdateForm(processed_data, instance=request.user)  
        if form.is_valid():  
            form.save()  
            return JsonResponse({  
                'status': 'success',  
                'message': '修改成功！'  
            })  
        else:  
            error_msg = next(iter(form.errors.values()))[0]  
            return JsonResponse({  
                'status': 'error',  
                'message': error_msg  
            })  

        # username=request.POST.get('username','')
        # desp_id=request.POST.get('desp_id','')
        # department = Department.objects.get(id=desp_id)
        # request.user.username = username  
        # request.user.desp_name = department
        # request.user.save()
        # return render(request, "usercenter.html", {})







#修改用户头像Ajax方式提交
class UploadImageView(LoginRequiredMixin,View):

    def post(self,request):       
        #对图片进行验证
        image_form = UploadImageForm(request.POST, request.FILES, instance=request.user)
        if image_form.is_valid():
            image_form.save()
            return JsonResponse({
                'status': 'success',
                'msg': '头像上传成功！',
                'avatar_url': request.user.avatar.url
            })
        return JsonResponse({
            'status':'fail',
            'msg':'头像上传失败！'
        })


#修改用户密码Ajax方式提交

class UpdatePwdView(LoginRequiredMixin, View):  
    """个人中心修改用户密码"""  
    # def post(self, request):  
    #     pwd1 = request.POST.get("password1", "")  
    #     pwd2 = request.POST.get("password2", "")  
        
    #     # 表单验证  
    #     if not pwd1 or not pwd2:  
    #         return JsonResponse({'status': 'fail', 'msg': '密码不能为空'})  
            
    #     if len(pwd1) < 6 or len(pwd1) > 20:  
    #         return JsonResponse({'status': 'fail', 'msg': '密码长度应在6-20位之间'})  
            
    #     if pwd1 != pwd2:  
    #         return JsonResponse({'status': 'fail', 'msg': '两次输入的密码不一致'})  

    #     try:  
    #         user = request.user  
    #         user.set_password(pwd2)  # 使用set_password而不是make_password  
    #         user.save()  
    #         return JsonResponse({'status': 'success'})  
    #     except Exception as e:  
    #         return JsonResponse({'status': 'fail', 'msg': '服务器错误，请稍后重试'})  


'''
情报需求，前端提交验证的表单，后台接收数据，在info文件夹下生成excel表单

'''
class UserInfoNeed(LoginRequiredMixin, View):
    def get(self, request):

        desp_back = Department.objects.values('name')

        context = {
            'username': request.user.username,
            'desp_front': desp_back,
            'email_front': request.user.email,
            'MEDIA_URL': settings.MEDIA_URL,
        }

        return render(request, 'center_need.html', context)

    


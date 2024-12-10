# -*- coding: utf-8 -*-

from django import forms
from django.core.validators import RegexValidator
from .models import *



#验证注册
class ResignForm(forms.Form):
    email = forms.EmailField(
                            required=True,
                             validators=[
                                 RegexValidator(
                                     regex=r'^[a-zA-Z0-9_.+-]+@gree\.com$',
                                     message='不符合格力内邮账号样式',
                                     code = 'invalid_email'
                                 )
                             ],
                             error_messages={  
                                'required': '请输入邮箱地址',  
                                'invalid': '请输入有效的邮箱地址'  
                            }  
                            )
    password = forms.CharField(
                        required=True,
                        min_length=6, 
                        max_length=20,
                        error_messages={
                             'required': '请输入密码',  
                             'min_length': '密码长度至少为6位',  
                             'max_length': '密码长度不能超过20位'  
                        })
    



#验证登录
class LoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True, min_length=5)

#用于修改登录用户的昵称和科室所属
#先取消
# class UserForm(forms.ModelForm):  
#     class Meta:  
#         model = UserProfile  
#         fields = ['username', 'desp_name']  
        
#     def clean_username(self):  
#         username = self.cleaned_data.get('username')  
#         if len(username) < 2:  
#             raise forms.ValidationError("用户名长度太短")  
#         return username


class UserUpdateForm(forms.ModelForm):  
    desp_id = forms.ModelChoiceField(  
        queryset=Department.objects.all(),  
        required=True,  
        error_messages={'required': '请选择科室'},  
        to_field_name='id'  # 使用 id 作为值  
    )  

    class Meta:  
        model = UserProfile  
        fields = ['username']  # 注意这里只包含 username  

    def __init__(self, *args, **kwargs):  
        super().__init__(*args, **kwargs)  
        # 如果POST数据中有desp_id，将其转换为desp_name  
        if 'data' in kwargs and 'desp_id' in kwargs['data']:  
            self.fields['desp_id'].initial = kwargs['data'].get('desp_id')  

    def clean_username(self):  
        username = self.cleaned_data.get('username')  
        if not username:  
            raise forms.ValidationError("用户名不能为空")  
        if UserProfile.objects.exclude(id=self.instance.id).filter(username=username).exists():  
            raise forms.ValidationError("该用户名已被使用")  
        return username  

    def clean_desp_id(self):  
        desp_id = self.cleaned_data.get('desp_id')  
        if not desp_id:  
            raise forms.ValidationError("请选择科室")  
        return desp_id  

    def save(self, commit=True):  
        user = super().save(commit=False)  
        # 设置科室  
        user.desp_name = self.cleaned_data['desp_id']  # 因为使用了ModelChoiceField，这里已经是Department实例  
        if commit:  
            user.save()  
        return user








#验证头像上传
class UploadImageForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['avatar']


#暂时消除
#验证密码正确
# class ModifyPwdForm(forms.Form):
#     password1 = forms.CharField(required=True, min_length=5)
#     password2 = forms.CharField(required=True, min_length=5)

# _*_ encoding:utf-8 _*_

from django.db import models

from django.contrib.auth.models import AbstractUser
# Create your models here.

#添加方法，对图片上传个性化
import os
from django.conf import settings 

from django.core.exceptions import ValidationError  

'''
科室表
'''
class Department(models.Model):
    name = models.CharField(max_length=100, 
                            unique=True,
                            blank=True,
                            null=True,
                            default='未设置',
                            verbose_name="科室")
   

    class Meta:
        verbose_name = "部门表"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


'''
用户信息表
'''
#定义方法
def user_avatar_path(instance,filename):
    #获取文件扩展名
    ext = filename.split('.')[-1]
    #构建路径：avatars/用户邮箱/文件名
    return os.path.join('avatars',instance.email,f'avatar.{ext}')



class UserProfile(AbstractUser):
    desp_name = models.ForeignKey('Department',
                                   on_delete=models.SET_NULL,
                                   null=True,
                                   blank=True,
                                   verbose_name="科室名称")
    
    avatar = models.ImageField(
                                upload_to=user_avatar_path, 
                                null=True,
                                blank=True,
                                default='avatars/default/default.png',
                                verbose_name="头像"
                            )

    class Meta:
        verbose_name = "用户信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username  #返回用户名作为对象的字符串表示
    
    #保存头像的方法
    def save(self,*args,**kwargs):
        if not self.pk and not self.avatar:
            self.avatar = 'avatars/default/default.png'
        super().save(*args,**kwargs)
    
  
  
'''
  情报收集表
'''
class NeedForm(models.Model):
    URGENCY_CHOICES = (
        ('very', '非常紧急（需3天内完成）'),
        ('moderate', '较紧急（3-7天）'),
        ('normal', '一般紧急（7天以上）'),
    )

    # 修改这里，使用UserProfile替代User
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, verbose_name='提交用户')
    submit_time = models.DateTimeField(auto_now_add=True, verbose_name='提交时间')
    section = models.CharField(max_length=100, verbose_name='涉及板块')
    analysis_type = models.CharField(max_length=100, verbose_name='分析大类')
    analysis_detail = models.CharField(max_length=100, verbose_name='分析细类')
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES, verbose_name='紧急程度')
    content = models.TextField(verbose_name='具体内容')
    department = models.CharField(max_length=100, verbose_name='需求科室')
    contact_person = models.CharField(max_length=100, verbose_name='对接人员')
    contact_info = models.CharField(max_length=100, verbose_name='联系方式')

    class Meta:
        verbose_name = '需求表单'
        verbose_name_plural = '需求表单'
        ordering = ['-submit_time']

    def __str__(self):
        return f"{self.user.username} - {self.submit_time.strftime('%Y-%m-%d %H:%M')}"
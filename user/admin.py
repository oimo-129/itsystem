from django.contrib import admin  
from django.contrib.auth.admin import UserAdmin  
from django.contrib.auth.forms import UserChangeForm, UserCreationForm  
from .models import UserProfile, Department  

# 自定义用户修改表单  
class CustomUserChangeForm(UserChangeForm):  
    class Meta(UserChangeForm.Meta):  
        model = UserProfile  

# 自定义用户创建表单  
class CustomUserCreationForm(UserCreationForm):  
    class Meta(UserCreationForm.Meta):  
        model = UserProfile  

# 自定义用户管理类  
class CustomUserAdmin(UserAdmin):  
    form = CustomUserChangeForm  
    add_form = CustomUserCreationForm  
    
    # 列表显示字段  
    list_display = ('username', 'email', 'desp_name', 'is_active', 'is_staff', 'date_joined')  
    
    # 列表筛选字段  
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'desp_name')  
    
    # 搜索字段  
    search_fields = ('username', 'email')  
    
    # 排序字段  
    ordering = ('-date_joined',)  
    
    # 编辑页面字段分组  
    fieldsets = (  
        (None, {'fields': ('username', 'password')}),  
        ('个人信息', {'fields': ('email', 'department', 'avatar')}),  
        ('权限', {  
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),  
        }),  
        ('重要日期', {'fields': ('last_login', 'date_joined')}),  
    )  
    
    # 添加用户时的字段分组  
    add_fieldsets = (  
        (None, {  
            'classes': ('wide',),  
            'fields': ('username', 'email', 'desp_name', 'password1', 'password2'),  
        }),  
    )  
    
    # 添加批量操作  
    actions = ['reset_password']  
    
    def reset_password(self, request, queryset):  
        """批量重置密码为 '123456' """  
        from django.contrib.auth.hashers import make_password  
        default_password = '123456'  
        
        for user in queryset:  
            user.password = make_password(default_password)  
            user.save()  
            
        self.message_user(request, f'已成功重置 {queryset.count()} 个用户的密码为: {default_password}')  
    reset_password.short_description = '重置所选用户密码为123456'  

# 注册部门模型  
class DepartmentAdmin(admin.ModelAdmin):  
    list_display = ['name']  
    search_fields = ['name']  

# 注册模型到 admin  
admin.site.register(UserProfile, CustomUserAdmin)  
admin.site.register(Department, DepartmentAdmin)




# 修改管理后台的标题和头部  
admin.site.site_header = '家电一院情报系统后台'  # 设置网站页头  
admin.site.site_title = '家电一院情报系统'   # 设置页面标题  
admin.site.index_title = '管理'  # 设置首页标题
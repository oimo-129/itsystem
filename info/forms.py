# from django import forms
# from .models import FileModel
# from datetime import datetime
# import os
#
# class FileModelForm(forms.ModelForm):
#     class Meta:
#         model = FileModel
#         fields = ['name', 'file', 'file_dist', 'file_product', 'add_time', 'cover']
#
#         # 自定义字段的 widget
#     widgets = {
#             'name': forms.TextInput(attrs={
#                 'class': 'form-control',
#                 'placeholder': '请输入文件名'
#             }),
#             'file_dist': forms.Select(attrs={
#                 'class': 'form-control'
#             }),
#             'file_product': forms.TextInput(attrs={
#                 'class': 'form-control',
#                 'placeholder': '请输入产品类型'
#             }),
#             'add_time': forms.DateTimeInput(attrs={
#                 'class': 'form-control',
#                 'type': 'datetime-local'  # HTML5 日期时间选择器
#             }),
#     }
#
#     def clean_name(self):
#         """验证文件名"""
#         name = self.cleaned_data.get('name')
#         if len(name) < 2:
#             raise forms.ValidationError('文件名至少需要2个字符')
#         return name
#
#     def clean_file(self):
#         """验证上传的文件"""
#         file = self.cleaned_data.get('file')
#         if file:
#             # 获取文件扩展名
#             ext = os.path.splitext(file.name)[1].lower()
#             # 定义允许的文件类型
#             allowed_extensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
#
#             # 验证文件类型
#             if ext not in allowed_extensions:
#                 raise forms.ValidationError('不支持的文件类型，请上传 PDF、Word、Excel 或 PowerPoint 文件')
#
#                 # 验证文件大小（例如：最大 50MB）
#             if file.size > 52428800:  # 50MB = 50 * 1024 * 1024
#                 raise forms.ValidationError('文件大小不能超过 50MB')
#
#         return file
#
#     def clean(self):
#         """整体表单验证"""
#         cleaned_data = super().clean()
#         add_time = cleaned_data.get('add_time')
#
#         # 验证报告时间不能超过当前时间
#         if add_time and add_time > datetime.now(add_time.tzinfo):
#             self.add_error('add_time', '报告时间不能超过当前时间')
#
#         return cleaned_data
#
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         # 设置字段是否必填
#         self.fields['file_product'].required = False
#
#         # 添加自定义的错误消息
#         self.fields['name'].error_messages = {
#             'required': '请输入文件名',
#             'max_length': '文件名不能超过20个字符'
#         }
#         self.fields['file_dist'].error_messages = {
#             'required': '请选择文件分类'
#         }
@echo off
echo Stopping Nginx...

REM 切换到 Nginx 目录
cd /d C:\nginx-1.26.2\nginx-1.26.2

REM 停止 Nginx
nginx -s stop

echo Stopping Waitress...

REM 使用 tasklist 先查找 Python 进程
tasklist | findstr python

REM 如果找到了 python 进程，则尝试停止它
if %errorlevel%==0 (
    echo Found python processes. Stopping them...
    taskkill /F /IM python.exe
) else (
    echo No python processes found.
)

echo Services stopped!
pause
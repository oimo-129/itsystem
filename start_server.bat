@echo off
echo Starting Django with Waitress...
cd /d D:\itsystem\system-main
call ..\myvenv\Scripts\activate
start python run_waitress.py

echo Starting Nginx...
cd /d C:\nginx-1.26.2\nginx-1.26.2
start nginx

echo Services started!
pause
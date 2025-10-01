@echo off
cd /d "D:\Project\AGENCY\backend"
set DJANGO_SETTINGS_MODULE=agency_backend.settings
call ..\venv\Scripts\activate.bat
python manage.py migrate
python manage.py runserver 8000
pause
release: cd backend && python manage.py migrate
web: cd backend && gunicorn agency_backend.wsgi:application --bind 0.0.0.0:$PORT
#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Populate initial data
echo "Populating initial data..."
python manage.py populate_data
python manage.py populate_content_data
python manage.py populate_seo_data

echo "Build process completed successfully!"
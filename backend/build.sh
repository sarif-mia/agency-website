#!/usr/bin/env bash
echo "Building the project..."
python -m pip install --upgrade pip

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --no-input
set -e

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

# Populate initial data (with error handling)
echo "Populating initial data..."
python manage.py populate_data || echo "Warning: populate_data failed, continuing..."
python manage.py populate_content_data || echo "Warning: populate_content_data failed, continuing..."
python manage.py populate_seo_data || echo "Warning: populate_seo_data failed, continuing..."

echo "Build process completed successfully!"
# 🚀 Agency Website Deployment Guide

## Frontend Deployment (React + Vite)

### Option 1: Netlify (Recommended - Free)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub/Google
   - Drag and drop the `dist` folder
   - Your site will be live at: `https://your-site-name.netlify.app`

3. **Custom Domain (Optional):**
   - Buy domain from GoDaddy/Namecheap
   - In Netlify: Site Settings > Domain Management > Add Custom Domain

### Option 2: Vercel (Also Free)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Your site will be live at:** `https://your-project.vercel.app`

### Option 3: GitHub Pages (Free)

1. **Install gh-pages:**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/agency-website",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Backend Deployment (Django)

### Option 1: Railway (Recommended - Easy & Free Tier)

1. **Create requirements.txt:**
   ```bash
   cd backend
   pip freeze > requirements.txt
   ```

2. **Create Procfile:**
   ```
   web: gunicorn agency_backend.wsgi --log-file -
   ```

3. **Install gunicorn:**
   ```bash
   pip install gunicorn
   pip freeze > requirements.txt
   ```

4. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create new project from GitHub repo
   - Your API will be live at: `https://your-project.railway.app`

### Option 2: Heroku (Free tier discontinued, but still popular)

1. **Install Heroku CLI**
2. **Create Procfile and requirements.txt**
3. **Deploy:**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Option 3: PythonAnywhere (Free tier available)

1. **Upload your code to PythonAnywhere**
2. **Create web app with Django**
3. **Configure WSGI file**

### Option 4: DigitalOcean App Platform

1. **Connect GitHub repo**
2. **Configure build settings**
3. **Deploy automatically**

## Environment Configuration

### Frontend Environment Variables

Create `.env.production`:
```
VITE_API_BASE_URL=https://your-backend-domain.railway.app/api
```

### Backend Environment Variables

Update `settings.py` for production:
```python
import os
from pathlib import Path

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    'your-backend-domain.railway.app',
    'localhost',
    '127.0.0.1'
]

# CORS Configuration for production
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.netlify.app",
    "http://localhost:5173",  # Keep for development
]

# Database for production (Railway PostgreSQL)
if 'DATABASE_URL' in os.environ:
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
    }

# Static files for production
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Email configuration for production
if not DEBUG:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
    EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
```

## Complete Deployment Steps

### Step 1: Prepare Backend for Production

1. **Install production dependencies:**
   ```bash
   cd backend
   pip install gunicorn dj-database-url psycopg2-binary whitenoise
   pip freeze > requirements.txt
   ```

2. **Create Procfile:**
   ```
   web: gunicorn agency_backend.wsgi --log-file -
   release: python manage.py migrate
   ```

3. **Update settings.py for production**

### Step 2: Deploy Backend to Railway

1. **Create Railway account**
2. **Connect GitHub repository**
3. **Add environment variables:**
   - `DEBUG=False`
   - `EMAIL_HOST_USER=sitegenit@gmail.com`
   - `EMAIL_HOST_PASSWORD=your-gmail-app-password`
   - `SECRET_KEY=your-django-secret-key`

### Step 3: Build and Deploy Frontend

1. **Update API URL:**
   ```bash
   cd frontend
   echo "VITE_API_BASE_URL=https://your-backend.railway.app/api" > .env.production
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Deploy to Netlify:**
   - Drag and drop `dist` folder to Netlify

### Step 4: Test Your Live Website

1. **Frontend URL:** `https://your-site.netlify.app`
2. **Backend API:** `https://your-backend.railway.app/api`
3. **Admin Panel:** `https://your-backend.railway.app/admin`

## Cost Breakdown

### Free Options:
- **Frontend:** Netlify/Vercel (Free tier)
- **Backend:** Railway (Free tier - $5/month after)
- **Database:** Railway PostgreSQL (included)
- **Domain:** Optional ($10-15/year)

### Total Monthly Cost:
- **Free for first month**
- **$5/month for backend after free tier**
- **Custom domain: $10-15/year (optional)**

## Custom Domain Setup

### For Frontend (Netlify):
1. **Buy domain from GoDaddy/Namecheap**
2. **In Netlify:** Site Settings > Domain Management
3. **Add custom domain and follow DNS instructions**

### For Backend (Railway):
1. **In Railway:** Settings > Domains
2. **Add custom domain**
3. **Update DNS records as instructed**

## Gmail Setup for Production

1. **Enable 2-Factor Authentication on sitegenit@gmail.com**
2. **Create App Password:**
   - Google Account > Security > 2-Step Verification > App Passwords
   - Select "Mail" and "Other"
   - Copy the 16-character password

3. **Add to Railway environment variables:**
   - `EMAIL_HOST_PASSWORD=your-16-char-app-password`

## Monitoring and Maintenance

### Check Website Status:
- **Frontend:** Check if site loads properly
- **Backend:** Visit `/api/health/` endpoint
- **Admin:** Login to admin panel regularly

### Regular Tasks:
- Monitor email notifications
- Check server logs on Railway
- Update dependencies monthly
- Backup database periodically

## Troubleshooting

### Common Issues:

1. **CORS Error:**
   - Update `CORS_ALLOWED_ORIGINS` in settings.py
   - Include your frontend domain

2. **Database Error:**
   - Run migrations: `python manage.py migrate`
   - Check Railway database connection

3. **Email Not Working:**
   - Verify Gmail App Password
   - Check environment variables

4. **Static Files Not Loading:**
   - Run: `python manage.py collectstatic`
   - Check `STATIC_ROOT` configuration

## Success Checklist

- ✅ Backend deployed and accessible
- ✅ Frontend deployed and loading
- ✅ API endpoints working
- ✅ Database connected and migrated
- ✅ Admin panel accessible
- ✅ Email notifications working
- ✅ CORS configured correctly
- ✅ Custom domain (optional) configured
- ✅ SSL certificates active (automatic)

Your website will be live and professional! 🚀
# Backend Deployment Guide - Render.com

## For EXISTING Render Projects (Modify):

### Step 1: Update Existing Service
1. Go to https://render.com/dashboard
2. Find your existing service: `sitegenit-backend` 
3. Click on the service name
4. Go to **Settings** tab

### Step 2: Update Configuration
In the Settings tab, verify/update:

**Repository:**
- Repository: `sarif-mia/agency-website`
- Branch: `main`
- Root Directory: `backend`

**Build & Deploy:**
- Build Command: `./build.sh`
- Start Command: `gunicorn agency_backend.wsgi:application --bind 0.0.0.0:$PORT`

### Step 3: Environment Variables
In **Environment** tab, add/update these variables:

```
SECRET_KEY = django-insecure-production-key-change-me-123456789
DEBUG = False
EMAIL_HOST_USER = sitegenit@gmail.com
EMAIL_HOST_PASSWORD = uhvl gdch uhvp tjav
MEETING_REQUEST_EMAIL = sitegenit@gmail.com
ADMIN_EMAIL = sitegenit@gmail.com
PYTHON_VERSION = 3.11
```

### Step 4: Force Redeploy
- Click **Manual Deploy** → **Deploy Latest Commit**
- Or use the auto-deploy if enabled

---

## For NEW Render Projects (Create):

### Step 1: Create New Web Service
1. Go to https://render.com
2. Click **New** → **Web Service**
3. Connect GitHub repository: `sarif-mia/agency-website`

### Step 2: Configuration
- **Name:** `sitegenit-backend`
- **Root Directory:** `backend`
- **Environment:** `Python 3`
- **Build Command:** `./build.sh`
- **Start Command:** `gunicorn agency_backend.wsgi:application --bind 0.0.0.0:$PORT`
- **Plan:** Free

### Step 3: Environment Variables
Add the same variables as above.

---

## Expected Result:
- Backend URL: `https://sitegenit-backend.onrender.com`
- Frontend will connect automatically (already configured)
- No more "demo mode" messages

## Troubleshooting:
- If build fails, check the build logs
- Ensure all environment variables are set
- Use Manual Deploy to force a new deployment
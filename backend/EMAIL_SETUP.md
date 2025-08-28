# Email Setup Instructions

## Gmail Configuration for Meeting Request Notifications

To receive meeting request emails at `sitegenit@gmail.com`, you need to set up Gmail App Password:

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to Google Account > Security > 2-Step Verification
2. Click on "App passwords"
3. Select "Mail" and "Other (custom name)"
4. Enter "Agency Website" as the name
5. Copy the generated 16-character password

### Step 3: Update Django Settings
1. Open `agency_backend/settings.py`
2. Find the email configuration section
3. Replace `'your-app-password'` with your actual Gmail App Password:

```python
EMAIL_HOST_PASSWORD = 'your-actual-app-password-here'
```

### Step 4: For Testing (Development Only)
If you want to test without actual email sending, you can use Django's console backend:

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

This will print emails to the console instead of sending them.

### Email Features Implemented:
- ✅ Automatic email notification to `sitegenit@gmail.com` when someone submits a meeting request
- ✅ Detailed information including contact details, meeting preferences, and project description
- ✅ Direct link to Django admin panel to manage the request
- ✅ Error handling - if email fails, the meeting request is still saved

### Email Content Includes:
- Contact Information (Name, Email, Phone, Company)
- Meeting Details (Type, Date, Time)
- Project Description
- Request ID and Timestamp
- Direct admin panel link for easy management
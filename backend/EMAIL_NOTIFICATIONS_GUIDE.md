# Email Notifications Setup Guide

This guide explains how to configure email notifications for all forms in the agency website. When users submit any form (contact, newsletter, meeting requests, etc.), notifications will be sent to `sitegenit@gmail.com`.

## Overview

The system is configured to send email notifications for:
- Contact forms (both regular and quick contact)
- Newsletter subscriptions
- Meeting requests
- User registrations

All notifications are sent to `sitegenit@gmail.com` with detailed information about the submission.

## Gmail Configuration

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

### Environment Variables (Recommended)
For better security, use environment variables:

```bash
# In your .env file or system environment variables
EMAIL_HOST_PASSWORD=your-actual-app-password-here
```

Then in `settings.py`:
```python
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
```

## Email Templates

### Contact Form Notification
When a user submits a contact form, an email is sent with the following information:
- Name
- Email
- Phone (if provided)
- Subject
- Message Type
- Message content

### Newsletter Subscription Notification
When a user subscribes to the newsletter:
- Email address
- Name (if provided)
- Subscription date

A welcome email is also sent to the subscriber.

### Meeting Request Notification
When a user requests a meeting:
- Name
- Email
- Phone (if provided)
- Company (if provided)
- Meeting type
- Preferred date and time
- Project description
- Request ID and timestamp

A confirmation email is also sent to the requester.

### User Registration Notification
When a user registers:
- Full name
- Email
- Registration date

A welcome email is also sent to the new user.

## Testing Email Functionality

### Development Testing
For development, you can use Django's console backend to see emails in the terminal:

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

### Production Testing
1. Submit a form on the website
2. Check your `sitegenit@gmail.com` inbox
3. Verify that you receive the notification with all details

## Troubleshooting

### Common Issues

1. **Emails not being sent**
   - Check that 2FA is enabled on the Gmail account
   - Verify the App Password is correct
   - Ensure `EMAIL_HOST_PASSWORD` is properly set

2. **Emails going to spam**
   - Check spam/junk folders
   - Add `sitegenit@gmail.com` to contacts
   - Verify SPF and DKIM records (for custom domains)

3. **Connection errors**
   - Ensure internet connectivity
   - Check Gmail SMTP settings:
     - Host: smtp.gmail.com
     - Port: 587
     - TLS: Enabled

### Debugging Steps

1. Check Django logs for email errors
2. Verify settings in `agency_backend/settings.py`
3. Test with a simple email script:

```python
from django.core.mail import send_mail

send_mail(
    'Test Subject',
    'Test message.',
    'sitegenit@gmail.com',
    ['sitegenit@gmail.com'],
    fail_silently=False,
)
```

## Customization

### Changing Recipient Email
To change the recipient email address, update these settings in `agency_backend/settings.py`:

```python
MEETING_REQUEST_EMAIL = 'new-email@gmail.com'
ADMIN_EMAIL = 'new-email@gmail.com'
```

### Customizing Email Content
Email templates are defined in the view functions in `backend/api/views.py`. You can modify the message content in:
- `ContactMessageCreateView`
- `QuickContactView`
- `NewsletterSubscribeView`
- `MeetingRequestCreateView`
- `UserRegistrationView`

## Security Considerations

1. **App Passwords**: Never use your main Gmail password; always use App Passwords
2. **Environment Variables**: Store sensitive information in environment variables
3. **Error Handling**: The system logs email errors but doesn't expose them to users
4. **Rate Limiting**: Gmail has sending limits; monitor for excessive form submissions

## Monitoring

Check the Django admin panel to monitor:
- Contact messages
- Newsletter subscribers
- Meeting requests
- User registrations

All submissions are stored in the database regardless of email delivery status.
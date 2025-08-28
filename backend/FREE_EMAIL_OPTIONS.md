# Free Email Options for Your Agency Website

## 1. Gmail SMTP with App Password (Recommended)

This is the most reliable free option for sending emails from your Django application.

### Setup Instructions:

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to Google Account > Security > 2-Step Verification
   - Click on "App passwords"
   - Select "Mail" and "Other (custom name)"
   - Enter "Agency Website" as the name
   - Copy the generated 16-character password

3. **Configure Django Settings**
   In your `agency_backend/settings.py`, update the email configuration:
   ```python
   # For production, use SMTP backend
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'smtp.gmail.com'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'sitegenit@gmail.com'
   EMAIL_HOST_PASSWORD = 'your-16-character-app-password'  # Use the App Password here
   ```

4. **Environment Variables (Recommended for Security)**
   Create a `.env` file in your backend directory:
   ```
   EMAIL_HOST_USER=sitegenit@gmail.com
   EMAIL_HOST_PASSWORD=your-16-character-app-password
   ```

   Then update your settings.py:
   ```python
   EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', 'sitegenit@gmail.com')
   EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
   ```

## 2. Console Backend for Development

Perfect for testing without actually sending emails.

In your `agency_backend/settings.py`:
```python
# For development, use console backend to test email functionality
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

This will print all emails to the console where you run the Django server.

## 3. SendGrid Free Tier

SendGrid offers 100 emails per day for free.

### Setup Instructions:

1. Sign up at https://sendgrid.com/
2. Get your API key
3. Install the SendGrid package:
   ```bash
   pip install sendgrid
   ```

4. Update your Django settings:
   ```python
   # For SendGrid
   EMAIL_BACKEND = 'sendgrid_backend.SendgridBackend'
   SENDGRID_API_KEY = 'your-sendgrid-api-key'
   ```

## 4. Mailgun Free Tier

Mailgun offers 5,000 emails per month for free (requires credit card).

### Setup Instructions:

1. Sign up at https://www.mailgun.com/
2. Get your API key and domain
3. Update your Django settings:
   ```python
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'smtp.mailgun.org'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'your-mailgun-username'
   EMAIL_HOST_PASSWORD = 'your-mailgun-password'
   ```

## 5. Amazon SES (Free Tier)

AWS offers 62,000 emails per month for free for the first year.

### Setup Instructions:

1. Create an AWS account
2. Set up SES (Simple Email Service)
3. Verify your email address
4. Get your SMTP credentials
5. Update your Django settings:
   ```python
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'  # Choose your region
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'your-smtp-username'
   EMAIL_HOST_PASSWORD = 'your-smtp-password'
   ```

## Recommendation

For your agency website, I recommend sticking with **Gmail SMTP with App Password** because:
1. It's completely free
2. You already have a Gmail account
3. It's reliable
4. It requires minimal setup
5. It's already partially implemented in your code

## Testing Your Email Configuration

To test if your email configuration is working:

1. Run your Django server:
   ```bash
   python manage.py runserver
   ```

2. Submit a form on your website (contact form, meeting request, etc.)

3. Check if:
   - The email appears in the console (if using console backend)
   - You receive the email in your inbox (if using SMTP)

## Troubleshooting

If emails aren't sending:

1. Check that your App Password is correct (16 characters)
2. Ensure 2-factor authentication is enabled
3. Verify that your Gmail account allows less secure apps (not recommended, use App Password instead)
4. Check your Django server logs for error messages
5. Make sure your environment variables are set correctly

## Security Best Practices

1. Never commit passwords to version control
2. Use environment variables for sensitive information
3. Rotate your App Passwords periodically
4. Monitor your email sending activity
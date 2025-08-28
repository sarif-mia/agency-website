# Free Email Setup for Agency Website

This guide explains how to set up free email notifications for your agency website using Gmail SMTP.

## Prerequisites

1. A Gmail account (sitegenit@gmail.com)
2. Python and Django installed
3. This agency website project

## Setup Instructions

### Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to set up 2-factor authentication

### Step 2: Generate an App Password

1. In your Google Account, go to "Security"
2. Under "Signing in to Google", click on "App passwords"
3. If you don't see this option, make sure 2-factor authentication is enabled
4. Select "Mail" as the app
5. Select "Other (Custom name)" as the device
6. Enter "Agency Website" as the custom name
7. Click "Generate"
8. Copy the 16-character password (this is your App Password)

### Step 3: Install Required Packages

Make sure you have all required packages installed:

```bash
pip install -r requirements.txt
```

This will install `python-decouple` which is used for managing environment variables.

### Step 4: Configure Environment Variables

1. In your project's backend directory, you'll find a file named `.env`
2. Update the `.env` file with your actual Gmail App Password:

```
# Email Configuration
EMAIL_HOST_USER=sitegenit@gmail.com
EMAIL_HOST_PASSWORD=your-actual-16-character-app-password-here
MEETING_REQUEST_EMAIL=sitegenit@gmail.com
ADMIN_EMAIL=sitegenit@gmail.com

# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### Step 5: Test the Configuration

1. Run your Django development server:
   ```bash
   python manage.py runserver
   ```

2. Visit your website and submit a form (contact, meeting request, etc.)

3. Check:
   - The console output for email content (if DEBUG=True)
   - Your Gmail inbox for received notifications

### Step 6: Run the Test Script

You can also run the provided test script to verify your email configuration:

```bash
python test_email.py
```

This script will:
- Show your current email configuration
- Send a test email (or print to console if using console backend)
- Display any errors that occur

## How It Works

The email system is already implemented in your views:
- ContactMessageCreateView - sends notifications for contact forms
- QuickContactView - sends notifications for quick contact forms
- NewsletterSubscribeView - sends notifications for newsletter subscriptions
- MeetingRequestCreateView - sends notifications for meeting requests
- UserRegistrationView - sends notifications for user registrations

Each view sends an email to `sitegenit@gmail.com` with the form details.

## Troubleshooting

### Issue: Emails not being sent
1. Check that you've correctly entered the App Password (16 characters)
2. Verify that 2-factor authentication is still enabled
3. Check your Django server logs for error messages
4. Ensure your `.env` file is in the correct location (backend directory)

### Issue: "Authentication failed" error
1. Generate a new App Password and update your `.env` file
2. Make sure there are no extra spaces in the password

### Issue: "Connection refused" error
1. Check your internet connection
2. Ensure Gmail SMTP settings are correct (smtp.gmail.com:587)

## Security Notes

1. Never commit your `.env` file to version control
2. Your `.env` file is already in `.gitignore` to prevent accidental commits
3. Change your App Password periodically for security
4. Monitor your Gmail account for any suspicious activity

## Alternative Free Options

If you prefer other email services, see `FREE_EMAIL_OPTIONS.md` for:
- SendGrid Free Tier (100 emails/day)
- Mailgun Free Tier (5,000 emails/month)
- Amazon SES Free Tier (62,000 emails/month for first year)

## Need Help?

If you encounter any issues:
1. Check the Django server logs for error messages
2. Verify your App Password is correct
3. Ensure your Gmail account settings are correct
4. Contact support if problems persist
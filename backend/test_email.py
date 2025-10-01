"""
Test script to verify email configuration
"""

import os
import django
from django.conf import settings
from django.core.mail import send_mail

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agency_backend.settings')
django.setup()

def test_email():
    """Test email sending functionality"""
    try:
        # Send a test email
        subject = 'Test Email from Agency Website'
        message = '''
This is a test email to verify that your email configuration is working correctly.

If you received this email, it means your Django email setup is working properly!

Configuration details:
- Backend: {}
- Host: {}
- Port: {}
- User: {}
        '''.format(
            settings.EMAIL_BACKEND,
            getattr(settings, 'EMAIL_HOST', 'Not set'),
            getattr(settings, 'EMAIL_PORT', 'Not set'),
            getattr(settings, 'EMAIL_HOST_USER', 'Not set')
        )
        
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [settings.ADMIN_EMAIL]
        
        print("Sending test email...")
        print("From:", from_email)
        print("To:", recipient_list)
        print("Subject:", subject)
        print("--- Message ---")
        print(message)
        print("--- End Message ---")
        
        # If using console backend, this will just print to console
        if settings.EMAIL_BACKEND == 'django.core.mail.backends.console.EmailBackend':
            print("\nUsing console backend - email will be printed to console")
            send_mail(subject, message, from_email, recipient_list)
            print("Email sent successfully (printed to console)")
        else:
            # For SMTP backend, actually send the email
            print("\nUsing SMTP backend - email will be sent via Gmail")
            send_mail(subject, message, from_email, recipient_list)
            print("Email sent successfully!")
            
    except Exception as e:
        print(f"Error sending email: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    test_email()
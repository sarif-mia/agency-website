import os
import sys

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agency_backend.settings')

try:
    import django
    from django.conf import settings
    from django.core.mail import send_mail
    
    # Setup Django
    django.setup()
    
    print("Django setup successful!")
    print(f"DEBUG: {settings.DEBUG}")
    print(f"EMAIL_BACKEND: {getattr(settings, 'EMAIL_BACKEND', 'Not set')}")
    print(f"EMAIL_HOST: {getattr(settings, 'EMAIL_HOST', 'Not set')}")
    print(f"EMAIL_HOST_USER: {getattr(settings, 'EMAIL_HOST_USER', 'Not set')}")
    
    # Test sending email
    try:
        subject = 'Test Email from Agency Website'
        message = 'This is a test email to verify that your email configuration is working correctly.'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [settings.ADMIN_EMAIL]
        
        print('Sending test email...')
        
        if settings.EMAIL_BACKEND == 'django.core.mail.backends.console.EmailBackend':
            print('Using console backend - email will be printed to console')
            send_mail(subject, message, from_email, recipient_list)
            print('Email sent successfully (printed to console)')
        else:
            print('Using SMTP backend - email will be sent via Gmail')
            send_mail(subject, message, from_email, recipient_list)
            print('Email sent successfully!')
            
    except Exception as e:
        print(f'Error sending email: {e}')
        import traceback
        traceback.print_exc()

except Exception as e:
    print(f"Error setting up Django: {e}")
    import traceback
    traceback.print_exc()
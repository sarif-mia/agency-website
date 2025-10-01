from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings

class Command(BaseCommand):
    help = 'Test email configuration'

    def handle(self, *args, **options):
        self.stdout.write('Testing email configuration...')
        
        # Show current email settings
        self.stdout.write(f'EMAIL_BACKEND: {getattr(settings, "EMAIL_BACKEND", "Not set")}')
        self.stdout.write(f'EMAIL_HOST: {getattr(settings, "EMAIL_HOST", "Not set")}')
        self.stdout.write(f'EMAIL_PORT: {getattr(settings, "EMAIL_PORT", "Not set")}')
        self.stdout.write(f'EMAIL_HOST_USER: {getattr(settings, "EMAIL_HOST_USER", "Not set")}')
        self.stdout.write(f'DEBUG: {getattr(settings, "DEBUG", "Not set")}')
        
        # Test sending email
        try:
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
            
            self.stdout.write('Sending test email...')
            
            if settings.EMAIL_BACKEND == 'django.core.mail.backends.console.EmailBackend':
                self.stdout.write('Using console backend - email will be printed to console')
                send_mail(subject, message, from_email, recipient_list)
                self.stdout.write(self.style.SUCCESS('Email sent successfully (printed to console)'))
            else:
                self.stdout.write('Using SMTP backend - email will be sent via Gmail')
                send_mail(subject, message, from_email, recipient_list)
                self.stdout.write(self.style.SUCCESS('Email sent successfully!'))
                
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error sending email: {e}'))
            import traceback
            self.stdout.write(traceback.format_exc())
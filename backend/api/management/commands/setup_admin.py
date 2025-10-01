from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = 'Set up admin user and initialize the enhanced admin interface'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username',
            type=str,
            default='admin',
            help='Admin username (default: admin)',
        )
        parser.add_argument(
            '--email',
            type=str,
            default='admin@digitalagency.com',
            help='Admin email (default: admin@digitalagency.com)',
        )
        parser.add_argument(
            '--password',
            type=str,
            default='admin123',
            help='Admin password (default: admin123)',
        )

    def handle(self, *args, **options):
        username = options['username']
        email = options['email']
        password = options['password']

        self.stdout.write('Setting up Digital Agency Admin Interface...')

        # Create superuser
        try:
            if User.objects.filter(username=username).exists():
                self.stdout.write(
                    self.style.WARNING(f'User "{username}" already exists. Skipping user creation.')
                )
                user = User.objects.get(username=username)
            else:
                user = User.objects.create_superuser(
                    username=username,
                    email=email,
                    password=password,
                    first_name='Admin',
                    last_name='User'
                )
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created superuser "{username}"')
                )

        except IntegrityError as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating superuser: {e}')
            )
            return

        # Display admin access information
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('🎉 Digital Agency Admin Setup Complete!'))
        self.stdout.write('')
        self.stdout.write('📊 Admin Dashboard Information:')
        self.stdout.write(f'   URL: http://localhost:8000/admin/')
        self.stdout.write(f'   Username: {username}')
        self.stdout.write(f'   Password: {password}')
        self.stdout.write(f'   Email: {email}')
        self.stdout.write('')
        self.stdout.write('✨ Features Available:')
        self.stdout.write('   • Modern dark theme with neon accents')
        self.stdout.write('   • Real-time dashboard statistics')
        self.stdout.write('   • Enhanced content management')
        self.stdout.write('   • User-friendly navigation menus')
        self.stdout.write('   • Advanced filtering and search')
        self.stdout.write('   • Responsive design for all devices')
        self.stdout.write('   • Quick action buttons')
        self.stdout.write('')
        self.stdout.write('📱 Mobile-Friendly:')
        self.stdout.write('   • Touch-optimized interface')
        self.stdout.write('   • Responsive grid layouts')
        self.stdout.write('   • Mobile navigation menu')
        self.stdout.write('')
        self.stdout.write('🛠️ Content Management:')
        self.stdout.write('   • Navigation Menus & Submenus')
        self.stdout.write('   • Page Content & Sections')
        self.stdout.write('   • Team Members & Job Positions')
        self.stdout.write('   • Projects & Portfolio')
        self.stdout.write('   • Testimonials & Reviews')
        self.stdout.write('   • Blog Posts & Articles')
        self.stdout.write('   • Contact Messages & Meetings')
        self.stdout.write('   • Company Information')
        self.stdout.write('   • Site Settings & Feature Flags')
        self.stdout.write('')
        self.stdout.write('🎨 Design Elements:')
        self.stdout.write('   • Modern card-based layout')
        self.stdout.write('   • Animated statistics counters')
        self.stdout.write('   • Status badges and indicators')
        self.stdout.write('   • Icon-rich interface')
        self.stdout.write('   • Hover effects and transitions')
        self.stdout.write('')
        self.stdout.write(self.style.WARNING('⚠️  Security Note:'))
        self.stdout.write('   Please change the default password after first login!')
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('Ready to manage your Digital Agency! 🚀'))
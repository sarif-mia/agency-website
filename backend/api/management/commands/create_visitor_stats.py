from django.core.management.base import BaseCommand
from datetime import date, timedelta
import random
from api.models import VisitorStatistics


class Command(BaseCommand):
    help = 'Populate visitor statistics for dashboard testing'

    def handle(self, *args, **options):
        self.stdout.write('Creating visitor statistics data...')
        
        # Create data for the last 30 days
        today = date.today()
        
        for i in range(30):
            stat_date = today - timedelta(days=i)
            
            # Skip if data already exists
            if VisitorStatistics.objects.filter(date=stat_date).exists():
                continue
            
            # Generate realistic data
            base_views = 1200 + random.randint(-200, 400)
            base_visitors = int(base_views * 0.65) + random.randint(-100, 100)
            
            # Weekend factor
            weekend_factor = 0.7 if stat_date.weekday() in [5, 6] else 1.0
            
            page_views = int(base_views * weekend_factor)
            unique_visitors = int(base_visitors * weekend_factor)
            
            # Device distribution
            mobile_views = int(page_views * 0.65)
            desktop_views = int(page_views * 0.30)
            tablet_views = page_views - mobile_views - desktop_views
            
            # Traffic sources
            direct = int(page_views * 0.40)
            search = int(page_views * 0.35)
            social = int(page_views * 0.15)
            referral = page_views - direct - search - social
            
            # Page-specific views
            home_views = int(page_views * 0.35)
            about_views = int(page_views * 0.15)
            services_views = int(page_views * 0.20)
            portfolio_views = int(page_views * 0.15)
            contact_views = int(page_views * 0.10)
            blog_views = page_views - home_views - about_views - services_views - portfolio_views - contact_views
            
            VisitorStatistics.objects.create(
                date=stat_date,
                page_views=page_views,
                unique_visitors=unique_visitors,
                bounce_rate=round(random.uniform(25.0, 45.0), 1),
                avg_session_duration=random.randint(120, 300),
                home_views=home_views,
                about_views=about_views,
                services_views=services_views,
                portfolio_views=portfolio_views,
                contact_views=contact_views,
                blog_views=blog_views,
                mobile_views=mobile_views,
                desktop_views=desktop_views,
                tablet_views=tablet_views,
                direct_traffic=direct,
                search_traffic=search,
                social_traffic=social,
                referral_traffic=referral
            )
            
            self.stdout.write(f'Created stats for {stat_date}')
        
        self.stdout.write(self.style.SUCCESS('Successfully created visitor statistics!'))
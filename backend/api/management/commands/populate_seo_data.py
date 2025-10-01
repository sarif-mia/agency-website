from django.core.management.base import BaseCommand
from api.models import SEOSettings, SEOMetaTags, SitemapURL, RobotsTxt


class Command(BaseCommand):
    help = 'Populate initial SEO data for Google ranking optimization'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting SEO data population...'))
        
        # Create SEO Settings
        self.create_seo_settings()
        
        # Create SEO Meta Tags for all pages
        self.create_meta_tags()
        
        # Create Sitemap URLs
        self.create_sitemap_urls()
        
        # Create Robots.txt
        self.create_robots_txt()
        
        self.stdout.write(self.style.SUCCESS('SEO data population completed successfully!'))

    def create_seo_settings(self):
        seo_settings, created = SEOSettings.objects.get_or_create(
            defaults={
                'site_name': 'Digital Agency',
                'site_tagline': 'Professional Web Development & Digital Marketing Services',
                'default_meta_description': 'Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing.',
                'business_name': 'Digital Agency Ltd.',
                'business_type': 'Web Development Agency',
                'email': 'info@digitalagency.com',
                'country': 'United States',
                'region': 'California',
                'city': 'San Francisco',
                'enable_breadcrumbs': True,
                'enable_schema_markup': True,
                'enable_open_graph': True,
                'enable_twitter_cards': True,
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS('Created SEO Settings'))

    def create_meta_tags(self):
        meta_tags_data = [
            {
                'page_type': 'home',
                'meta_title': 'Digital Agency - Professional Web Development Services',
                'meta_description': 'Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing.',
                'focus_keyword': 'digital agency',
                'robots_directive': 'index, follow',
            },
            {
                'page_type': 'about',
                'meta_title': 'About Us - Expert Digital Agency Team',
                'meta_description': 'Meet our expert team of developers, designers, and digital marketers.',
                'focus_keyword': 'about digital agency',
                'robots_directive': 'index, follow',
            },
            {
                'page_type': 'services',
                'meta_title': 'Our Services - Web Development & Digital Marketing',
                'meta_description': 'Comprehensive digital services including web development, mobile apps, and digital marketing.',
                'focus_keyword': 'web development services',
                'robots_directive': 'index, follow',
            },
            {
                'page_type': 'portfolio',
                'meta_title': 'Portfolio - Our Best Web Development Projects',
                'meta_description': 'Explore our portfolio of successful web development and digital marketing projects.',
                'focus_keyword': 'web development portfolio',
                'robots_directive': 'index, follow',
            },
            {
                'page_type': 'contact',
                'meta_title': 'Contact Us - Get Your Free Consultation',
                'meta_description': 'Contact our expert team for a free consultation on your digital project.',
                'focus_keyword': 'contact digital agency',
                'robots_directive': 'index, follow',
            }
        ]
        
        created_count = 0
        for meta_data in meta_tags_data:
            meta_tag, created = SEOMetaTags.objects.get_or_create(
                page_type=meta_data['page_type'],
                defaults=meta_data
            )
            if created:
                created_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {created_count} SEO Meta Tags'))

    def create_sitemap_urls(self):
        sitemap_urls_data = [
            {'url_path': '/', 'priority': '1.0', 'change_frequency': 'weekly'},
            {'url_path': '/about/', 'priority': '0.9', 'change_frequency': 'monthly'},
            {'url_path': '/services/', 'priority': '0.9', 'change_frequency': 'weekly'},
            {'url_path': '/portfolio/', 'priority': '0.9', 'change_frequency': 'weekly'},
            {'url_path': '/contact/', 'priority': '0.8', 'change_frequency': 'monthly'},
        ]
        
        created_count = 0
        for url_data in sitemap_urls_data:
            sitemap_url, created = SitemapURL.objects.get_or_create(
                url_path=url_data['url_path'],
                defaults=url_data
            )
            if created:
                created_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {created_count} Sitemap URLs'))

    def create_robots_txt(self):
        robots_content = """User-agent: *
Allow: /
Allow: /about/
Allow: /services/
Allow: /portfolio/
Allow: /contact/

Disallow: /admin/
Disallow: /api/

Sitemap: /sitemap.xml
"""
        
        robots_txt, created = RobotsTxt.objects.get_or_create(
            defaults={
                'content': robots_content,
                'is_active': True
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS('Created Robots.txt configuration'))
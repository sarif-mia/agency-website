import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agency_backend.settings')
django.setup()

from api.models import SEOSettings, SEOMetaTags, SitemapURL, RobotsTxt

def create_seo_data():
    print("Creating SEO data...")
    
    # Create SEO Settings
    seo_settings, created = SEOSettings.objects.get_or_create(
        defaults={
            'site_name': 'Digital Agency',
            'business_name': 'Digital Agency Ltd.',
            'email': 'info@digitalagency.com',
            'enable_schema_markup': True,
            'enable_open_graph': True,
        }
    )
    print(f"SEO Settings created: {created}")
    
    # Create basic meta tags
    meta_tags_data = [
        {
            'page_type': 'home',
            'meta_title': 'Digital Agency - Professional Web Development Services',
            'meta_description': 'Leading digital agency specializing in web development and digital solutions.',
            'focus_keyword': 'digital agency',
        },
        {
            'page_type': 'services',
            'meta_title': 'Our Services - Web Development & Digital Marketing',
            'meta_description': 'Professional web development, mobile apps, and digital marketing services.',
            'focus_keyword': 'web development services',
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
    
    print(f"Created {created_count} meta tags")
    
    # Create sitemap URLs
    sitemap_urls = [
        {'url_path': '/', 'priority': '1.0', 'change_frequency': 'weekly'},
        {'url_path': '/services/', 'priority': '0.9', 'change_frequency': 'weekly'},
    ]
    
    sitemap_created = 0
    for url_data in sitemap_urls:
        sitemap_url, created = SitemapURL.objects.get_or_create(
            url_path=url_data['url_path'],
            defaults=url_data
        )
        if created:
            sitemap_created += 1
    
    print(f"Created {sitemap_created} sitemap URLs")
    
    # Create robots.txt
    robots_content = """User-agent: *
Allow: /
Disallow: /admin/
Sitemap: /sitemap.xml
"""
    
    robots_txt, created = RobotsTxt.objects.get_or_create(
        defaults={'content': robots_content, 'is_active': True}
    )
    print(f"Robots.txt created: {created}")
    
    print("SEO data creation completed!")

if __name__ == '__main__':
    create_seo_data()
from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.utils import timezone
from django.conf import settings
from django.views.decorators.cache import cache_page
from django.views.decorators.http import require_http_methods
from .models import (
    SitemapURL, RobotsTxt, SEOSettings, SEOMetaTags, 
    Project, BlogPost, Service, PageContent
)
import xml.etree.ElementTree as ET


@cache_page(60 * 60)  # Cache for 1 hour
def sitemap_xml(request):
    """Generate XML sitemap for search engines"""
    try:
        # Get current site
        current_site = get_current_site(request)
        base_url = f"https://{current_site.domain}"
        
        # Create XML root
        urlset = ET.Element('urlset')
        urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        urlset.set('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1')
        
        # Get manual sitemap URLs
        sitemap_urls = SitemapURL.objects.filter(is_active=True).order_by('-priority')
        
        for sitemap_url in sitemap_urls:
            url_elem = ET.SubElement(urlset, 'url')
            
            # Location
            loc = ET.SubElement(url_elem, 'loc')
            loc.text = f"{base_url}{sitemap_url.url_path}"
            
            # Last modified
            lastmod = ET.SubElement(url_elem, 'lastmod')
            lastmod.text = sitemap_url.last_modified.strftime('%Y-%m-%d')
            
            # Change frequency
            changefreq = ET.SubElement(url_elem, 'changefreq')
            changefreq.text = sitemap_url.change_frequency
            
            # Priority
            priority = ET.SubElement(url_elem, 'priority')
            priority.text = sitemap_url.priority
        
        # Auto-generate URLs for dynamic content
        
        # Projects
        projects = Project.objects.filter(is_featured=True)[:20]  # Limit to featured projects
        for project in projects:
            url_elem = ET.SubElement(urlset, 'url')
            
            loc = ET.SubElement(url_elem, 'loc')
            loc.text = f"{base_url}/projects/{project.slug}/"
            
            lastmod = ET.SubElement(url_elem, 'lastmod')
            lastmod.text = project.updated_at.strftime('%Y-%m-%d')
            
            changefreq = ET.SubElement(url_elem, 'changefreq')
            changefreq.text = 'monthly'
            
            priority = ET.SubElement(url_elem, 'priority')
            priority.text = '0.8'
            
            # Add image if available
            if project.image or project.image_url:
                image_elem = ET.SubElement(url_elem, 'image:image')
                image_loc = ET.SubElement(image_elem, 'image:loc')
                if project.image:
                    image_loc.text = f"{base_url}{project.image.url}"
                else:
                    image_loc.text = project.image_url
                
                image_title = ET.SubElement(image_elem, 'image:title')
                image_title.text = project.title
        
        # Blog Posts
        blog_posts = BlogPost.objects.filter(is_published=True)[:50]
        for post in blog_posts:
            url_elem = ET.SubElement(urlset, 'url')
            
            loc = ET.SubElement(url_elem, 'loc')
            loc.text = f"{base_url}/blog/{post.slug}/"
            
            lastmod = ET.SubElement(url_elem, 'lastmod')
            lastmod.text = post.updated_at.strftime('%Y-%m-%d')
            
            changefreq = ET.SubElement(url_elem, 'changefreq')
            changefreq.text = 'weekly'
            
            priority = ET.SubElement(url_elem, 'priority')
            priority.text = '0.7'
            
            # Add featured image if available
            if post.featured_image or post.featured_image_url:
                image_elem = ET.SubElement(url_elem, 'image:image')
                image_loc = ET.SubElement(image_elem, 'image:loc')
                if post.featured_image:
                    image_loc.text = f"{base_url}{post.featured_image.url}"
                else:
                    image_loc.text = post.featured_image_url
                
                image_title = ET.SubElement(image_elem, 'image:title')
                image_title.text = post.title
        
        # Services
        services = Service.objects.filter(is_active=True)
        for service in services:
            url_elem = ET.SubElement(urlset, 'url')
            
            loc = ET.SubElement(url_elem, 'loc')
            loc.text = f"{base_url}/services/{service.slug}/"
            
            lastmod = ET.SubElement(url_elem, 'lastmod')
            lastmod.text = service.created_at.strftime('%Y-%m-%d')
            
            changefreq = ET.SubElement(url_elem, 'changefreq')
            changefreq.text = 'monthly'
            
            priority = ET.SubElement(url_elem, 'priority')
            priority.text = '0.8'
        
        # Convert to string
        xml_string = ET.tostring(urlset, encoding='unicode', method='xml')
        xml_declaration = '<?xml version="1.0" encoding="UTF-8"?>\n'
        
        response = HttpResponse(xml_declaration + xml_string, content_type='application/xml')
        return response
        
    except Exception as e:
        # Log error and return minimal sitemap
        urlset = ET.Element('urlset')
        urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        
        # Add at least the homepage
        url_elem = ET.SubElement(urlset, 'url')
        loc = ET.SubElement(url_elem, 'loc')
        loc.text = f"https://{get_current_site(request).domain}/"
        
        xml_string = ET.tostring(urlset, encoding='unicode', method='xml')
        xml_declaration = '<?xml version="1.0" encoding="UTF-8"?>\n'
        
        response = HttpResponse(xml_declaration + xml_string, content_type='application/xml')
        return response


@cache_page(60 * 60 * 24)  # Cache for 24 hours
def robots_txt(request):
    """Generate robots.txt file"""
    try:
        robots_config = RobotsTxt.objects.filter(is_active=True).first()
        if robots_config:
            content = robots_config.content
        else:
            # Default robots.txt content
            current_site = get_current_site(request)
            content = f"""User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /static/admin/
Disallow: /media/private/

# Allow important pages
Allow: /
Allow: /services/
Allow: /portfolio/
Allow: /about/
Allow: /contact/
Allow: /blog/

# Sitemap location
Sitemap: https://{current_site.domain}/sitemap.xml

# Crawl-delay for courtesy
Crawl-delay: 1
"""
        
        return HttpResponse(content, content_type='text/plain')
        
    except Exception:
        # Fallback robots.txt
        return HttpResponse("""User-agent: *
Disallow: /admin/
Disallow: /api/

Sitemap: /sitemap.xml
""", content_type='text/plain')


def seo_meta_context(request, page_type=None, content_object=None):
    """
    Get SEO meta context for templates
    This function provides all necessary SEO data for any page
    """
    try:
        # Get current site info
        current_site = get_current_site(request)
        base_url = f"https://{current_site.domain}"
        current_url = f"{base_url}{request.path}"
        
        # Get global SEO settings
        seo_settings = SEOSettings.objects.first()
        
        # Default meta tags
        meta_context = {
            'site_name': seo_settings.site_name if seo_settings else 'site gen it',
            'meta_title': 'Professional site gen it - Web Development & Design Services',
            'meta_description': 'Leading site gen it specializing in web development, mobile apps, UI/UX design, and digital marketing. Transform your business with our expert solutions.',
            'meta_keywords': 'web development, site gen it, mobile apps, UI/UX design, digital marketing',
            'canonical_url': current_url,
            'og_title': '',
            'og_description': '',
            'og_image': f"{base_url}/static/images/og-default.jpg",
            'og_type': 'website',
            'og_url': current_url,
            'twitter_card': 'summary_large_image',
            'twitter_title': '',
            'twitter_description': '',
            'twitter_image': f"{base_url}/static/images/twitter-default.jpg",
            'robots': 'index, follow',
            'schema_data': {},
        }
        
        # Get page-specific SEO meta tags
        if page_type:
            try:
                seo_meta = SEOMetaTags.objects.get(page_type=page_type, is_active=True)
                
                meta_context.update({
                    'meta_title': seo_meta.meta_title,
                    'meta_description': seo_meta.meta_description,
                    'meta_keywords': seo_meta.meta_keywords,
                    'og_title': seo_meta.og_title or seo_meta.meta_title,
                    'og_description': seo_meta.og_description or seo_meta.meta_description,
                    'og_type': seo_meta.og_type,
                    'twitter_card': seo_meta.twitter_card,
                    'twitter_title': seo_meta.twitter_title or seo_meta.meta_title,
                    'twitter_description': seo_meta.twitter_description or seo_meta.meta_description,
                    'robots': seo_meta.robots_directive,
                })
                
                # Add images if available
                if seo_meta.og_image:
                    meta_context['og_image'] = f"{base_url}{seo_meta.og_image.url}"
                elif seo_meta.og_image_url:
                    meta_context['og_image'] = seo_meta.og_image_url
                
                if seo_meta.twitter_image:
                    meta_context['twitter_image'] = f"{base_url}{seo_meta.twitter_image.url}"
                elif seo_meta.twitter_image_url:
                    meta_context['twitter_image'] = seo_meta.twitter_image_url
                
                # Add canonical URL if specified
                if seo_meta.canonical_url:
                    meta_context['canonical_url'] = seo_meta.canonical_url
                
                # Add schema data
                if seo_meta.schema_data:
                    meta_context['schema_data'] = seo_meta.schema_data
                    
            except SEOMetaTags.DoesNotExist:
                pass
        
        # Content-specific optimizations
        if content_object:
            if hasattr(content_object, 'title'):
                meta_context['meta_title'] = f"{content_object.title} | {meta_context['site_name']}"
                meta_context['og_title'] = content_object.title
                meta_context['twitter_title'] = content_object.title
            
            if hasattr(content_object, 'description'):
                meta_context['meta_description'] = content_object.description[:160]
                meta_context['og_description'] = content_object.description[:200]
                meta_context['twitter_description'] = content_object.description[:200]
            
            if hasattr(content_object, 'excerpt'):
                meta_context['meta_description'] = content_object.excerpt[:160]
                meta_context['og_description'] = content_object.excerpt[:200]
                meta_context['twitter_description'] = content_object.excerpt[:200]
            
            # Add content images
            if hasattr(content_object, 'image') and content_object.image:
                meta_context['og_image'] = f"{base_url}{content_object.image.url}"
                meta_context['twitter_image'] = f"{base_url}{content_object.image.url}"
            elif hasattr(content_object, 'featured_image') and content_object.featured_image:
                meta_context['og_image'] = f"{base_url}{content_object.featured_image.url}"
                meta_context['twitter_image'] = f"{base_url}{content_object.featured_image.url}"
        
        # Generate structured data for organization
        if seo_settings:
            organization_schema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": seo_settings.business_name,
                "url": base_url,
                "logo": f"{base_url}/static/images/logo.png",
                "description": seo_settings.default_meta_description,
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": seo_settings.phone,
                    "contactType": "customer service",
                    "email": seo_settings.email
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": seo_settings.country,
                    "addressRegion": seo_settings.region,
                    "addressLocality": seo_settings.city
                },
                "sameAs": [
                    url for url in [
                        seo_settings.facebook_url,
                        seo_settings.twitter_url,
                        seo_settings.linkedin_url,
                        seo_settings.instagram_url,
                        seo_settings.youtube_url
                    ] if url
                ]
            }
            meta_context['organization_schema'] = organization_schema
        
        return meta_context
        
    except Exception:
        # Return minimal meta context on error
        return {
            'site_name': 'site gen it',
            'meta_title': 'site gen it - Professional Web Development Services',
            'meta_description': 'Professional site gen it offering web development, design, and marketing services.',
            'canonical_url': request.build_absolute_uri(),
            'robots': 'index, follow',
        }


def generate_breadcrumbs(request, page_title=None, custom_items=None):
    """
    Generate breadcrumb structured data for SEO
    """
    try:
        current_site = get_current_site(request)
        base_url = f"https://{current_site.domain}"
        path_components = request.path.strip('/').split('/')
        
        breadcrumbs = []
        
        # Home page
        breadcrumbs.append({
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": base_url
        })
        
        if custom_items:
            # Use custom breadcrumb items
            for i, item in enumerate(custom_items, 2):
                breadcrumbs.append({
                    "@type": "ListItem",
                    "position": i,
                    "name": item['name'],
                    "item": item.get('url', '#')
                })
        else:
            # Auto-generate from URL path
            current_url = base_url
            for i, component in enumerate(path_components[:-1], 2):
                if component:
                    current_url += f"/{component}"
                    breadcrumbs.append({
                        "@type": "ListItem",
                        "position": i,
                        "name": component.replace('-', ' ').title(),
                        "item": current_url
                    })
            
            # Current page
            if page_title and path_components:
                breadcrumbs.append({
                    "@type": "ListItem",
                    "position": len(breadcrumbs) + 1,
                    "name": page_title,
                    "item": request.build_absolute_uri()
                })
        
        breadcrumb_schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs
        }
        
        return breadcrumb_schema
        
    except Exception:
        return {}


@require_http_methods(["GET"])
def seo_check(request):
    """
    SEO health check endpoint for monitoring
    """
    try:
        # Check SEO settings
        seo_settings = SEOSettings.objects.first()
        meta_tags_count = SEOMetaTags.objects.filter(is_active=True).count()
        sitemap_urls_count = SitemapURL.objects.filter(is_active=True).count()
        
        # Generate report
        report = {
            'status': 'healthy',
            'seo_settings_configured': bool(seo_settings),
            'meta_tags_count': meta_tags_count,
            'sitemap_urls_count': sitemap_urls_count,
            'robots_txt_active': RobotsTxt.objects.filter(is_active=True).exists(),
            'timestamp': timezone.now().isoformat(),
        }
        
        # Check for issues
        issues = []
        if not seo_settings:
            issues.append('SEO settings not configured')
        if meta_tags_count == 0:
            issues.append('No meta tags configured')
        if sitemap_urls_count == 0:
            issues.append('No sitemap URLs configured')
        
        if issues:
            report['status'] = 'issues_found'
            report['issues'] = issues
        
        return HttpResponse(
            f"SEO Status: {report['status']}\n" +
            f"Meta Tags: {meta_tags_count}\n" +
            f"Sitemap URLs: {sitemap_urls_count}\n" +
            f"Issues: {len(issues)}",
            content_type='text/plain'
        )
        
    except Exception as e:
        return HttpResponse(
            f"SEO Check Error: {str(e)}",
            content_type='text/plain',
            status=500
        )
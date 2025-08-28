from django.contrib.sites.shortcuts import get_current_site
from .models import SEOSettings, SEOMetaTags
from .seo_views import seo_meta_context, generate_breadcrumbs


def seo_context(request):
    """
    Context processor to add SEO data to all template contexts
    This ensures every page has access to SEO optimization data
    """
    try:
        # Get the page type from URL or view name
        page_type = getattr(request.resolver_match, 'url_name', None)
        if page_type:
            # Map URL names to page types
            page_type_mapping = {
                'home': 'home',
                'about': 'about',
                'services': 'services',
                'portfolio': 'portfolio',
                'team': 'team',
                'contact': 'contact',
                'blog': 'blog',
                'careers': 'careers',
                'case_studies': 'case-studies',
                'help': 'help',
            }
            page_type = page_type_mapping.get(page_type, 'home')
        else:
            page_type = 'home'
        
        # Get SEO meta context
        seo_data = seo_meta_context(request, page_type)
        
        # Add breadcrumbs
        breadcrumbs = generate_breadcrumbs(request)
        if breadcrumbs:
            seo_data['breadcrumbs'] = breadcrumbs
        
        # Get SEO settings for additional context
        try:
            seo_settings = SEOSettings.objects.first()
            if seo_settings:
                seo_data.update({
                    'google_analytics_id': seo_settings.google_analytics_id,
                    'google_tag_manager_id': seo_settings.google_tag_manager_id,
                    'facebook_pixel_id': seo_settings.facebook_pixel_id,
                    'google_search_console_verification': seo_settings.google_search_console_verification,
                    'bing_webmaster_verification': seo_settings.bing_webmaster_verification,
                    'custom_head_tags': seo_settings.custom_head_tags,
                    'custom_footer_scripts': seo_settings.custom_footer_scripts,
                })
        except Exception:
            pass
        
        return {
            'seo_context': seo_data,
            'current_page_type': page_type,
        }
        
    except Exception:
        # Return minimal context on error
        return {
            'seo_context': {
                'site_name': 'Digital Agency',
                'meta_title': 'Digital Agency - Professional Web Development Services',
                'meta_description': 'Professional digital agency offering web development and digital solutions.',
                'canonical_url': request.build_absolute_uri(),
                'robots': 'index, follow',
            },
            'current_page_type': 'home',
        }


def global_seo_data(request):
    """
    Additional SEO context for specific use cases
    """
    try:
        current_site = get_current_site(request)
        
        return {
            'site_domain': current_site.domain,
            'site_url': f"https://{current_site.domain}",
            'current_url': request.build_absolute_uri(),
            'current_path': request.path,
        }
    except Exception:
        return {
            'site_domain': 'localhost:8000',
            'site_url': 'http://localhost:8000',
            'current_url': request.build_absolute_uri(),
            'current_path': request.path,
        }
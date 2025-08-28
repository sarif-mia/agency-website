from django.utils.deprecation import MiddlewareMixin
from .seo_views import seo_meta_context


class SEOMiddleware(MiddlewareMixin):
    """
    Middleware to automatically attach SEO context to all requests
    This ensures every view has access to SEO optimization data
    """
    
    def process_request(self, request):
        """
        Attach SEO context to the request object
        """
        try:
            # Determine page type from URL path
            page_type = self.get_page_type_from_path(request.path)
            
            # Get SEO context for this page
            seo_context = seo_meta_context(request, page_type)
            
            # Attach to request for easy access in views and templates
            request.seo_context = seo_context
            request.page_type = page_type
            
        except Exception:
            # Fallback to minimal context
            request.seo_context = {
                'site_name': 'Digital Agency',
                'meta_title': 'Digital Agency - Professional Web Development Services',
                'meta_description': 'Professional digital agency offering web development and digital solutions.',
                'canonical_url': request.build_absolute_uri(),
                'robots': 'index, follow',
            }
            request.page_type = 'home'
    
    def get_page_type_from_path(self, path):
        """
        Determine page type from URL path
        """
        path = path.strip('/')
        
        # Map common paths to page types
        if not path or path == '':
            return 'home'
        elif path.startswith('about'):
            return 'about'
        elif path.startswith('services'):
            return 'services'
        elif path.startswith('portfolio') or path.startswith('projects'):
            return 'portfolio'
        elif path.startswith('team'):
            return 'team'
        elif path.startswith('contact'):
            return 'contact'
        elif path.startswith('blog'):
            return 'blog'
        elif path.startswith('careers') or path.startswith('jobs'):
            return 'careers'
        elif path.startswith('case-studies'):
            return 'case-studies'
        elif path.startswith('help'):
            return 'help'
        elif path.startswith('privacy'):
            return 'privacy'
        elif path.startswith('terms'):
            return 'terms'
        else:
            return 'home'
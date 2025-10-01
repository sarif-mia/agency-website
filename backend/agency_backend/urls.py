"""
URL configuration for agency_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from api.views import home_view
# from api.admin import admin_site  # Temporarily commented out
from api import seo_views

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),  # Use default admin
    path('api/', include('api.urls')),
    path('docs/', TemplateView.as_view(template_name='api_documentation.html'), name='api_docs'),
    
    # SEO files at root level for search engines
    path('sitemap.xml', seo_views.sitemap_xml, name='sitemap_xml'),
    path('robots.txt', seo_views.robots_txt, name='robots_txt'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

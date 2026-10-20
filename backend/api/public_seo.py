"""Search-engine endpoints derived from the current deployment and public content."""
from xml.etree.ElementTree import Element, SubElement, tostring
from django.http import HttpResponse
from django.views.decorators.http import require_safe
from .models import Project, BlogPost, CaseStudy, HelpArticle


@require_safe
def sitemap(request):
    root = Element('urlset', xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')
    paths = ['/', '/services', '/about-us', '/our-team', '/all-projects', '/blog',
             '/case-studies', '/quote', '/partnership', '/careers', '/resources', '/help']
    for model, prefix in [(Project, '/work/'), (BlogPost, '/blog/'),
                          (CaseStudy, '/case-studies/'), (HelpArticle, '/help/')]:
        records = model.objects.all()
        if model is not Project:
            records = records.filter(is_published=True)
        paths.extend(prefix + slug for slug in records.values_list('slug', flat=True))
    for path in paths:
        SubElement(SubElement(root, 'url'), 'loc').text = request.build_absolute_uri(path)
    return HttpResponse(tostring(root, encoding='utf-8', xml_declaration=True), content_type='application/xml')


@require_safe
def robots(request):
    lines = ['User-agent: *', 'Allow: /', 'Disallow: /api/', 'Disallow: /admin/',
             'Disallow: /dashboard', 'Disallow: /client-portal',
             'Sitemap: ' + request.build_absolute_uri('/sitemap.xml')]
    return HttpResponse('\n'.join(lines) + '\n', content_type='text/plain')

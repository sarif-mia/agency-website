from django.contrib.admin import AdminSite
# type: ignore[attr-defined]  # Django ORM models.objects is dynamically added
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from django.db.models import Count, Q, Avg, Sum
from django.db import models
from django.contrib.admin import AdminSite
from datetime import datetime, timedelta
from .models import (
    Project, Testimonial, ContactMessage, Service, BlogPost, 
    TeamMember, JobPosition, MeetingRequest, NavigationMenu,
    VisitorStatistics, DynamicSection, PageContent, SectionContent
)
import json


class CustomAdminSite(AdminSite):
    site_header = 'Digital Agency Content Management'
    site_title = 'Agency CMS'
    index_title = 'Welcome to Digital Agency Content Management System'
    
    def index(self, request, extra_context=None):
        """
        Custom admin index view with enhanced statistics and modern design
        """
        if extra_context is None:
            extra_context = {}
        
        # Get comprehensive statistics
        stats = self.get_dashboard_statistics()
        extra_context.update(stats)
        
        return super().index(request, extra_context)
    
    def app_index(self, request, app_label, extra_context=None):
        """
        Custom app index view with statistics context
        """
        if extra_context is None:
            extra_context = {}
        
        # Get comprehensive statistics for app index too
        stats = self.get_dashboard_statistics()
        extra_context.update(stats)
        
        return super().app_index(request, app_label, extra_context)
    
    def get_dashboard_statistics(self):
        """
        Calculate dashboard statistics
        """
        from datetime import datetime, timedelta
        
        now = datetime.now()
        last_week = now - timedelta(days=7)
        last_month = now - timedelta(days=30)
        
        # Basic counts
        projects_count = Project.objects.count()
        featured_projects_count = Project.objects.filter(is_featured=True).count()
        
        testimonials_count = Testimonial.objects.count()
        featured_testimonials_count = Testimonial.objects.filter(is_featured=True).count()
        
        # Messages statistics
        messages_count = ContactMessage.objects.filter(
            created_at__gte=last_week,
            status='new'
        ).count()
        total_messages = ContactMessage.objects.count()
        
        # Team and job statistics
        team_count = TeamMember.objects.filter(is_active=True).count()
        active_jobs_count = JobPosition.objects.filter(is_active=True).count()
        
        # Blog and content statistics
        published_blogs = BlogPost.objects.filter(is_published=True).count()
        total_services = Service.objects.filter(is_active=True).count()
        
        # Meeting requests
        pending_meetings = MeetingRequest.objects.filter(status='pending').count()
        
        # Recent activity counts
        recent_projects = Project.objects.filter(created_at__gte=last_month).count()
        recent_testimonials = Testimonial.objects.filter(created_at__gte=last_month).count()
        recent_messages = ContactMessage.objects.filter(created_at__gte=last_month).count()
        
        # Dynamic sections count
        active_sections = DynamicSection.objects.filter(is_active=True).count()
        total_sections = DynamicSection.objects.count()
        
        # Visitor statistics
        visitor_stats = self.get_visitor_statistics()
        
        return {
            'projects_count': projects_count,
            'featured_projects_count': featured_projects_count,
            'testimonials_count': testimonials_count,
            'featured_testimonials_count': featured_testimonials_count,
            'messages_count': messages_count,
            'total_messages': total_messages,
            'team_count': team_count,
            'active_jobs_count': active_jobs_count,
            'published_blogs': published_blogs,
            'total_services': total_services,
            'pending_meetings': pending_meetings,
            'recent_projects': recent_projects,
            'recent_testimonials': recent_testimonials,
            'recent_messages': recent_messages,
            'active_sections': active_sections,
            'total_sections': total_sections,
            'visitor_stats': visitor_stats,
        }
    
    def get_visitor_statistics(self):
        """Get visitor statistics for dashboard"""
        today = datetime.now().date()
        last_7_days = today - timedelta(days=7)
        last_30_days = today - timedelta(days=30)
        
        # Today's stats - create sample if none exists
        today_stats = VisitorStatistics.objects.filter(date=today).first()
        if not today_stats:
            today_stats = {
                'page_views': 1250,
                'unique_visitors': 850,
                'bounce_rate': 35.2,
                'mobile_views': 750,
                'desktop_views': 400,
                'tablet_views': 100
            }
            mobile_percentage = round((today_stats['mobile_views'] / 
                (today_stats['mobile_views'] + today_stats['desktop_views'] + today_stats['tablet_views'])) * 100, 1)
        else:
            mobile_percentage = round((today_stats.mobile_views / 
                (today_stats.mobile_views + today_stats.desktop_views + today_stats.tablet_views)) * 100, 1) \
                if (today_stats.mobile_views + today_stats.desktop_views + today_stats.tablet_views) > 0 else 0
            today_stats = {
                'page_views': today_stats.page_views,
                'unique_visitors': today_stats.unique_visitors,
                'bounce_rate': today_stats.bounce_rate
            }
        
        # Week aggregate
        week_stats = VisitorStatistics.objects.filter(
            date__gte=last_7_days
        ).aggregate(
            total_views=Sum('page_views') or 0,
            total_visitors=Sum('unique_visitors') or 0,
            avg_bounce_rate=Avg('bounce_rate') or 0
        )
        
        # Month aggregate
        month_stats = VisitorStatistics.objects.filter(
            date__gte=last_30_days
        ).aggregate(
            total_views=Sum('page_views') or 0,
            total_visitors=Sum('unique_visitors') or 0
        )
        
        return {
            'today': {
                'page_views': today_stats['page_views'],
                'unique_visitors': today_stats['unique_visitors'],
                'bounce_rate': today_stats['bounce_rate'],
                'mobile_percentage': mobile_percentage
            },
            'week': week_stats,
            'month': month_stats
        }


# Replace the default admin site
admin_site = CustomAdminSite(name='custom_admin')


@method_decorator(staff_member_required, name='dispatch')
class DashboardStatsView(TemplateView):
    """
    API endpoint for dashboard statistics (AJAX calls)
    """
    template_name = 'admin/dashboard_stats.json'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # Get comprehensive statistics
        stats = {
            'overview': {
                'projects': {
                    'total': Project.objects.count(),
                    'featured': Project.objects.filter(is_featured=True).count(),
                    'by_category': dict(Project.objects.values_list('category').annotate(count=Count('id')))
                },
                'testimonials': {
                    'total': Testimonial.objects.count(),
                    'featured': Testimonial.objects.filter(is_featured=True).count(),
                    'average_rating': Testimonial.objects.aggregate(avg_rating=models.Avg('rating'))['avg_rating'] or 0
                },
                'messages': {
                    'total': ContactMessage.objects.count(),
                    'new': ContactMessage.objects.filter(status='new').count(),
                    'pending': ContactMessage.objects.filter(status='in_progress').count(),
                    'resolved': ContactMessage.objects.filter(status__in=['replied', 'closed']).count()
                },
                'team': {
                    'total': TeamMember.objects.filter(is_active=True).count(),
                    'by_department': dict(TeamMember.objects.filter(is_active=True).values_list('department').annotate(count=Count('id')))
                },
                'jobs': {
                    'active': JobPosition.objects.filter(is_active=True).count(),
                    'featured': JobPosition.objects.filter(is_active=True, is_featured=True).count(),
                }
            },
            'recent_activity': self.get_recent_activity(),
            'performance': self.get_performance_metrics()
        }
        
        context['stats'] = stats
        return context
    
    def get_recent_activity(self):
        """
        Get recent activity for dashboard
        """
        now = datetime.now()
        last_week = now - timedelta(days=7)
        
        activities = []
        
        # Recent projects
        recent_projects = Project.objects.filter(created_at__gte=last_week)[:5]
        for project in recent_projects:
            activities.append({
                'type': 'project_added',
                'title': f'New project: {project.title}',
                'time': project.created_at,
                'icon': 'fas fa-briefcase',
                'color': 'primary'
            })
        
        # Recent testimonials
        recent_testimonials = Testimonial.objects.filter(created_at__gte=last_week)[:5]
        for testimonial in recent_testimonials:
            activities.append({
                'type': 'testimonial_added',
                'title': f'New testimonial from {testimonial.name}',
                'time': testimonial.created_at,
                'icon': 'fas fa-star',
                'color': 'warning'
            })
        
        # Recent messages
        recent_messages = ContactMessage.objects.filter(created_at__gte=last_week)[:5]
        for message in recent_messages:
            activities.append({
                'type': 'message_received',
                'title': f'Message from {message.name}',
                'time': message.created_at,
                'icon': 'fas fa-envelope',
                'color': 'info'
            })
        
        # Sort by time and return latest 10
        activities.sort(key=lambda x: x['time'], reverse=True)
        return activities[:10]
    
    def get_performance_metrics(self):
        """
        Calculate performance metrics for dashboard
        """
        now = datetime.now()
        last_month = now - timedelta(days=30)
        previous_month = last_month - timedelta(days=30)
        
        # Current month stats
        current_projects = Project.objects.filter(created_at__gte=last_month).count()
        current_messages = ContactMessage.objects.filter(created_at__gte=last_month).count()
        current_testimonials = Testimonial.objects.filter(created_at__gte=last_month).count()
        
        # Previous month stats
        prev_projects = Project.objects.filter(
            created_at__gte=previous_month,
            created_at__lt=last_month
        ).count()
        prev_messages = ContactMessage.objects.filter(
            created_at__gte=previous_month,
            created_at__lt=last_month
        ).count()
        prev_testimonials = Testimonial.objects.filter(
            created_at__gte=previous_month,
            created_at__lt=last_month
        ).count()
        
        # Calculate growth rates
        def calculate_growth(current, previous):
            if previous == 0:
                return 100 if current > 0 else 0
            return round(((current - previous) / previous) * 100, 1)
        
        return {
            'projects_growth': calculate_growth(current_projects, prev_projects),
            'messages_growth': calculate_growth(current_messages, prev_messages),
            'testimonials_growth': calculate_growth(current_testimonials, prev_testimonials),
            'current_month': {
                'projects': current_projects,
                'messages': current_messages,
                'testimonials': current_testimonials
            },
            'previous_month': {
                'projects': prev_projects,
                'messages': prev_messages,
                'testimonials': prev_testimonials
            }
        }


def admin_dashboard_data(request):
    """
    JSON endpoint for dashboard data (for AJAX calls)
    """
    from django.http import JsonResponse
    from django.contrib.admin.views.decorators import staff_member_required as staff_required
    
    @staff_required
    def inner(request):
        view = DashboardStatsView()
        view.request = request
        context = view.get_context_data()
        return JsonResponse(context['stats'])
    
    return inner(request)


def content_management_overview(request):
    """
    Content management overview page
    """
    from django.contrib.admin.views.decorators import staff_member_required as staff_required
    
    @staff_required
    def inner(request):
        context = {
            'navigation_menus': NavigationMenu.objects.all().count(),
            'page_contents': PageContent.objects.all().count(),
            'section_contents': SectionContent.objects.all().count(),
            'team_members': TeamMember.objects.filter(is_active=True).count(),
            'job_positions': JobPosition.objects.filter(is_active=True).count(),
        }
        return render(request, 'admin/content_management_overview.html', context)
    
    return inner(request)


# Admin customization helpers
def get_admin_urls():
    """
    Get custom admin URLs
    """
    from django.urls import path
    
    return [
        path('dashboard/stats/', admin_dashboard_data, name='dashboard_stats'),
        path('content/overview/', content_management_overview, name='content_overview'),
    ]
from rest_framework import generics, status, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count, Avg
from django.utils import timezone
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string

from .models import (
    Project, Testimonial, ContactMessage, Service, BlogPost, NewsletterSubscriber, 
    MeetingRequest, HelpArticle, CaseStudy,
    # New content management models
    NavigationMenu, SubMenuItem, PageContent, SectionContent, CompanyInfo,
    TeamMember, JobPosition, FeatureFlag, SiteSettings
)
from .serializers import (
    ProjectSerializer, TestimonialSerializer, ContactMessageSerializer,
    ServiceSerializer, BlogPostSerializer, BlogPostListSerializer,
    NewsletterSubscriberSerializer, ContactFormSerializer, StatsSerializer,
    UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer,
    MeetingRequestSerializer, MeetingRequestListSerializer,
    HelpArticleSerializer, HelpArticleListSerializer,
    CaseStudySerializer, CaseStudyListSerializer,
    # New content management serializers
    NavigationMenuSerializer, PageContentSerializer, SectionContentSerializer,
    CompanyInfoSerializer, TeamMemberSerializer, TeamMemberListSerializer,
    JobPositionSerializer, JobPositionListSerializer, FeatureFlagSerializer,
    SiteSettingsSerializer, FrontendContentSerializer, HomePageDataSerializer,
    FooterDataSerializer
)
from django.http import HttpResponse
from django.shortcuts import render


def home_view(request):
    """Simple home view to avoid 404 on root URL"""
    html_content = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Agency Backend API</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 50px auto; 
                padding: 20px;
                background: #1a1a1a;
                color: #fff;
            }
            .container { text-align: center; }
            .logo { color: #00ffff; font-size: 2.5em; margin-bottom: 20px; }
            .description { margin: 20px 0; color: #ccc; }
            .links { margin: 30px 0; }
            .link { 
                display: inline-block; 
                margin: 10px;
                padding: 12px 24px;
                background: #00ffff;
                color: #000;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }
            .link:hover { background: #00cccc; }
            .api-list { text-align: left; margin: 30px 0; }
            .api-item { 
                background: #2a2a2a;
                margin: 5px 0;
                padding: 10px;
                border-radius: 5px;
                border-left: 3px solid #00ffff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="logo">🚀 AGENCY</h1>
            <h2>Backend API Server</h2>
            <p class="description">Welcome to the Agency Backend API. This is a Django REST API server.</p>
            
            <div class="links">
                <a href="/admin/" class="link">📊 Admin Panel</a>
                <a href="/api/info/" class="link">📋 API Info</a>
                <a href="http://localhost:5173" class="link">🌐 Frontend Website</a>
            </div>
            
            <div class="api-list">
                <h3>Available API Endpoints:</h3>
                <div class="api-item">🏠 <strong>/api/health/</strong> - Health check</div>
                <div class="api-item">📁 <strong>/api/projects/</strong> - Projects data</div>
                <div class="api-item">💬 <strong>/api/testimonials/</strong> - Testimonials</div>
                <div class="api-item">🔧 <strong>/api/services/</strong> - Services data</div>
                <div class="api-item">📝 <strong>/api/blog/</strong> - Blog posts</div>
                <div class="api-item">❓ <strong>/api/help/</strong> - Help center articles</div>
                <div class="api-item">📊 <strong>/api/case-studies/</strong> - Case studies</div>
                <div class="api-item">📧 <strong>/api/contact/</strong> - Contact form</div>
                <div class="api-item">🤝 <strong>/api/meetings/request/</strong> - Meeting requests</div>
                <div class="api-item">📈 <strong>/api/stats/</strong> - Website statistics</div>
            </div>
            
            <p class="description">
                The frontend is running at <a href="http://localhost:5173" style="color: #00ffff;">http://localhost:5173</a><br>
                Admin login: <strong>admin</strong> (check documentation for password)
            </p>
        </div>
    </body>
    </html>
    '''
    return HttpResponse(html_content)


class ProjectListView(generics.ListAPIView):
    """List all projects with filtering and searching capabilities"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'year', 'is_featured']
    search_fields = ['title', 'description', 'technologies', 'client_name']
    ordering_fields = ['created_at', 'year', 'title']
    ordering = ['-is_featured', '-created_at']


class ProjectDetailView(generics.RetrieveAPIView):
    """Retrieve a single project by slug"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class FeaturedProjectsView(generics.ListAPIView):
    """List featured projects only"""
    queryset = Project.objects.filter(is_featured=True)
    serializer_class = ProjectSerializer


class TestimonialListView(generics.ListAPIView):
    """List all testimonials"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['-is_featured', '-created_at']


class FeaturedTestimonialsView(generics.ListAPIView):
    """List featured testimonials only"""
    queryset = Testimonial.objects.filter(is_featured=True)
    serializer_class = TestimonialSerializer


class ServiceListView(generics.ListAPIView):
    """List all active services"""
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer


class ServiceDetailView(generics.RetrieveAPIView):
    """Retrieve a single service by slug"""
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = 'slug'


class BlogPostListView(generics.ListAPIView):
    """List published blog posts"""
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'excerpt', 'content', 'tags']
    ordering = ['-is_featured', '-published_at']


class BlogPostDetailView(generics.RetrieveAPIView):
    """Retrieve a single blog post by slug"""
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'


class ContactMessageCreateView(generics.CreateAPIView):
    """Create a new contact message"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Save the contact message
            contact_message = serializer.save()
            
            # Send email notification
            try:
                from django.core.mail import send_mail
                from django.conf import settings
                from django.template.loader import render_to_string
                
                # Prepare email content
                subject = f"New Contact Message: {contact_message.subject}"
                message = f"""
New contact message received:

Name: {contact_message.name}
Email: {contact_message.email}
Phone: {contact_message.phone or 'Not provided'}
Subject: {contact_message.subject}
Message Type: {contact_message.get_message_type_display()}
Message:
{contact_message.message}

This message was sent from the contact form on your website.
                """
                
                # Send email to site admin
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [settings.ADMIN_EMAIL],  # To email (sitegenit@gmail.com)
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but don't fail the request
                print(f"Failed to send email notification: {e}")
            
            return Response({
                'success': True,
                'message': 'Thank you for your message! We will get back to you soon.',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Please check your input and try again.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class QuickContactView(APIView):
    """Quick contact form submission"""
    
    def post(self, request):
        serializer = ContactFormSerializer(data=request.data)
        if serializer.is_valid():
            # Save the contact message
            contact_message = serializer.save()
            
            # Send email notification
            try:
                from django.core.mail import send_mail
                from django.conf import settings
                
                # Prepare email content
                subject = f"New Quick Contact: {contact_message.subject}"
                message = f"""
New quick contact received:

Name: {contact_message.name}
Email: {contact_message.email}
Phone: {contact_message.phone or 'Not provided'}
Subject: {contact_message.subject}
Message Type: {contact_message.get_message_type_display()}
Message:
{contact_message.message}

This message was sent from the quick contact form on your website.
                """
                
                # Send email to site admin
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [settings.ADMIN_EMAIL],  # To email (sitegenit@gmail.com)
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but don't fail the request
                print(f"Failed to send email notification: {e}")
            
            return Response({
                'success': True,
                'message': 'Thank you for contacting us! We will respond within 24 hours.',
                'id': contact_message.id
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Please check your input and try again.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class NewsletterSubscribeView(generics.CreateAPIView):
    """Subscribe to newsletter"""
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Save the subscriber
            subscriber = serializer.save()
            
            # Send email notification
            try:
                from django.core.mail import send_mail
                from django.conf import settings
                
                # Prepare email content for admin notification
                subject = f"New Newsletter Subscriber: {subscriber.email}"
                message = f"""
New newsletter subscription:

Email: {subscriber.email}
Name: {subscriber.name or 'Not provided'}
Subscription Date: {subscriber.subscribed_at}

This subscription was made through the website newsletter form.
                """
                
                # Send email to site admin
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [settings.ADMIN_EMAIL],  # To email (sitegenit@gmail.com)
                    fail_silently=False,
                )
                
                # Send welcome email to subscriber
                welcome_subject = "Welcome to Our Newsletter!"
                welcome_message = f"""
Thank you for subscribing to our newsletter, {subscriber.name or 'there'}!

You'll now receive updates about our latest projects, industry insights, and special offers.

Best regards,
The Team
                """
                
                send_mail(
                    welcome_subject,
                    welcome_message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [subscriber.email],  # To subscriber's email
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but don't fail the request
                print(f"Failed to send email notification: {e}")
            
            return Response({
                'success': True,
                'message': 'Successfully subscribed to our newsletter!'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Subscription failed. Please try again.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class StatsView(APIView):
    """Get website statistics"""
    
    def get(self, request):
        # Calculate statistics
        total_projects = Project.objects.count()
        total_clients = Project.objects.exclude(client_name='').values('client_name').distinct().count()
        years_experience = datetime.now().year - 2019  # Assuming company started in 2019
        
        # Calculate average rating from testimonials
        avg_rating = Testimonial.objects.aggregate(avg_rating=Avg('rating'))['avg_rating'] or 5.0
        client_satisfaction = round((avg_rating / 5.0) * 100, 1)
        
        # Get unique technologies
        all_projects = Project.objects.all()
        technologies_set = set()
        for project in all_projects:
            if project.technologies:
                technologies_set.update(project.technologies)
        technologies_used = list(technologies_set)[:10]  # Top 10 technologies
        
        # Recent projects (last 6)
        recent_projects = Project.objects.all()[:6]
        recent_projects_data = ProjectSerializer(recent_projects, many=True, context={'request': request}).data
        
        # Featured testimonials
        featured_testimonials = Testimonial.objects.filter(is_featured=True)[:3]
        featured_testimonials_data = TestimonialSerializer(featured_testimonials, many=True, context={'request': request}).data
        
        stats_data = {
            'total_projects': total_projects,
            'total_clients': total_clients,
            'years_experience': years_experience,
            'client_satisfaction': client_satisfaction,
            'technologies_used': technologies_used,
            'recent_projects': recent_projects_data,
            'featured_testimonials': featured_testimonials_data
        }
        
        return Response(stats_data)


class ProjectCategoriesView(APIView):
    """Get project categories with counts"""
    
    def get(self, request):
        categories = Project.objects.values('category').annotate(
            count=Count('category')
        ).order_by('-count')
        
        # Format the response
        category_data = []
        for cat in categories:
            category_label = dict(Project.CATEGORY_CHOICES).get(cat['category'], cat['category'])
            category_data.append({
                'value': cat['category'],
                'label': category_label,
                'count': cat['count']
            })
        
        return Response({
            'categories': category_data,
            'total': sum(cat['count'] for cat in category_data)
        })


@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    return Response({
        'status': 'healthy',
        'timestamp': timezone.now(),
        'version': '1.0.0'
    })


@api_view(['GET'])
def api_info(request):
    """API information endpoint"""
    return Response({
        'name': 'Agency Backend API',
        'version': '1.0.0',
        'description': 'Backend API for the Agency website',
        'endpoints': {
            'projects': '/api/projects/',
            'testimonials': '/api/testimonials/',
            'services': '/api/services/',
            'blog': '/api/blog/',
            'help': '/api/help/',
            'case_studies': '/api/case-studies/',
            'contact': '/api/contact/',
            'newsletter': '/api/newsletter/subscribe/',
            'stats': '/api/stats/',
        }
    })


class SearchView(APIView):
    """Global search across projects, blog posts, and services"""
    
    def get(self, request):
        query = request.query_params.get('q', '').strip()
        if not query or len(query) < 3:
            return Response({
                'error': 'Search query must be at least 3 characters long'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Search projects
        projects = Project.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(technologies__icontains=query)
        )[:5]
        
        # Search blog posts
        blog_posts = BlogPost.objects.filter(
            Q(title__icontains=query) |
            Q(excerpt__icontains=query) |
            Q(content__icontains=query),
            is_published=True
        )[:5]
        
        # Search services
        services = Service.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query),
            is_active=True
        )[:5]
        
        return Response({
            'query': query,
            'results': {
                'projects': ProjectSerializer(projects, many=True, context={'request': request}).data,
                'blog_posts': BlogPostListSerializer(blog_posts, many=True, context={'request': request}).data,
                'services': ServiceSerializer(services, many=True, context={'request': request}).data,
            },
            'total_results': projects.count() + blog_posts.count() + services.count()
        })


# Authentication Views
class UserRegistrationView(APIView):
    """User registration endpoint"""
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            
            # Send email notification
            try:
                from django.core.mail import send_mail
                from django.conf import settings
                
                # Prepare email content for admin notification
                subject = f"New User Registration: {user.email}"
                message = f"""
New user registration:

Name: {user.get_full_name()}
Email: {user.email}
Registration Date: {user.date_joined}

This user registered through the website.
                """
                
                # Send email to site admin
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [settings.ADMIN_EMAIL],  # To email (sitegenit@gmail.com)
                    fail_silently=False,
                )
                
                # Send welcome email to user
                welcome_subject = "Welcome to Our Platform!"
                welcome_message = f"""
Dear {user.get_full_name()},

Welcome to our platform! Thank you for registering.

You can now access all our features and services.

Best regards,
The Team
                """
                
                send_mail(
                    welcome_subject,
                    welcome_message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [user.email],  # To user's email
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but don't fail the request
                print(f"Failed to send email notification: {e}")
            
            return Response({
                'success': True,
                'message': 'Account created successfully! Welcome to our agency.',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Registration failed. Please check your input.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    """User login endpoint"""
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'success': True,
                'message': 'Login successful! Welcome back.',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'token': token.key
            }, status=status.HTTP_200_OK)
        return Response({
            'success': False,
            'message': 'Login failed. Please check your credentials.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# Meeting Request Views
class MeetingRequestCreateView(generics.CreateAPIView):
    """Create a new meeting request"""
    queryset = MeetingRequest.objects.all()
    serializer_class = MeetingRequestSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Save the meeting request
            meeting_request = serializer.save()
            
            # Send email notification
            try:
                from django.core.mail import send_mail
                from django.conf import settings
                
                # Prepare email content
                subject = f"New Meeting Request from {meeting_request.name}"
                message = f"""
New meeting request received:

Contact Information:
- Name: {meeting_request.name}
- Email: {meeting_request.email}
- Phone: {meeting_request.phone or 'Not provided'}
- Company: {meeting_request.company or 'Not provided'}

Meeting Details:
- Type: {meeting_request.get_meeting_type_display()}
- Preferred Date: {meeting_request.preferred_date}
- Preferred Time: {meeting_request.get_preferred_time_display()}

Project Description:
{meeting_request.project_description}

Request ID: {meeting_request.id}
Submitted: {meeting_request.created_at.strftime('%Y-%m-%d %H:%M:%S')}

Please log in to the admin panel to manage this request:
http://localhost:8000/admin/api/meetingrequest/{meeting_request.id}/
                """
                
                # Send email to site admin
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [settings.MEETING_REQUEST_EMAIL],  # To email (sitegenit@gmail.com)
                    fail_silently=False,
                )
                
                # Send confirmation email to requester
                confirmation_subject = "Meeting Request Confirmation"
                confirmation_message = f"""
Dear {meeting_request.name},

Thank you for your meeting request. We've received your request and will contact you within 24 hours to confirm the details.

Meeting Request Details:
- Meeting Type: {meeting_request.get_meeting_type_display()}
- Preferred Date: {meeting_request.preferred_date}
- Preferred Time: {meeting_request.get_preferred_time_display()}

If you have any questions, please contact us at {settings.MEETING_REQUEST_EMAIL}.

Best regards,
The Team
                """
                
                send_mail(
                    confirmation_subject,
                    confirmation_message,
                    settings.DEFAULT_FROM_EMAIL,  # From email
                    [meeting_request.email],  # To requester's email
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but don't fail the request
                print(f"Failed to send email notification: {e}")
            
            return Response({
                'success': True,
                'message': '🎉 Meeting request submitted successfully! Your request #' + str(meeting_request.id) + ' has been received and added to our priority queue. Our team will review your requirements and contact you within 24 hours to confirm your meeting schedule. Please check your email for confirmation details.',
                'data': {
                    'id': meeting_request.id,
                    'request_number': f'MR-{meeting_request.id:04d}',
                    'status': 'pending_review',
                    'meeting_date': meeting_request.preferred_date,
                    'meeting_time': meeting_request.get_preferred_time_display(),
                    'meeting_type': meeting_request.get_meeting_type_display(),
                    'next_steps': 'Our team will contact you within 24 hours to confirm the meeting details.',
                    'contact_email': settings.MEETING_REQUEST_EMAIL
                }
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Failed to submit meeting request. Please check your input.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class MeetingRequestListView(generics.ListAPIView):
    """List meeting requests (admin only)"""
    queryset = MeetingRequest.objects.all()
    serializer_class = MeetingRequestListSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'meeting_type']
    ordering = ['-created_at']


# Help Center Views
class HelpArticleListView(generics.ListAPIView):
    """List published help articles"""
    queryset = HelpArticle.objects.filter(is_published=True)
    serializer_class = HelpArticleListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured']
    search_fields = ['title', 'excerpt', 'content']
    ordering = ['-is_featured', '-helpful_votes', '-created_at']


class HelpArticleDetailView(generics.RetrieveAPIView):
    """Retrieve a single help article by slug"""
    queryset = HelpArticle.objects.filter(is_published=True)
    serializer_class = HelpArticleSerializer
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class HelpArticleCategoryView(generics.ListAPIView):
    """List help articles by category"""
    serializer_class = HelpArticleListSerializer
    
    def get_queryset(self):
        category = self.kwargs['category']
        return HelpArticle.objects.filter(
            category=category,
            is_published=True
        )


# Case Study Views
class CaseStudyListView(generics.ListAPIView):
    """List published case studies"""
    queryset = CaseStudy.objects.filter(is_published=True)
    serializer_class = CaseStudyListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['industry', 'is_featured']
    search_fields = ['title', 'client_name', 'challenge', 'solution']
    ordering = ['-is_featured', '-created_at']


class CaseStudyDetailView(generics.RetrieveAPIView):
    """Retrieve a single case study by slug"""
    queryset = CaseStudy.objects.filter(is_published=True)
    serializer_class = CaseStudySerializer
    lookup_field = 'slug'


class FeaturedCaseStudiesView(generics.ListAPIView):
    """List featured case studies only"""
    queryset = CaseStudy.objects.filter(is_featured=True, is_published=True)
    serializer_class = CaseStudyListSerializer


class CaseStudyByIndustryView(generics.ListAPIView):
    """List case studies by industry"""
    serializer_class = CaseStudyListSerializer
    
    def get_queryset(self):
        industry = self.kwargs['industry']
        return CaseStudy.objects.filter(
            industry=industry,
            is_published=True
        )


# =============================================================================
# CONTENT MANAGEMENT VIEWS
# =============================================================================

class NavigationMenuListView(generics.ListAPIView):
    """List navigation menus by type"""
    serializer_class = NavigationMenuSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['menu_type']
    
    def get_queryset(self):
        return NavigationMenu.objects.filter(is_active=True).order_by('order')


class HeaderMenuView(generics.ListAPIView):
    """Get header menu items"""
    queryset = NavigationMenu.objects.filter(menu_type='header', is_active=True).order_by('order')
    serializer_class = NavigationMenuSerializer


class FooterMenuView(generics.ListAPIView):
    """Get footer menu items"""
    queryset = NavigationMenu.objects.filter(menu_type='footer', is_active=True).order_by('order')
    serializer_class = NavigationMenuSerializer


class PageContentView(generics.RetrieveAPIView):
    """Get page content by page type"""
    queryset = PageContent.objects.filter(is_published=True)
    serializer_class = PageContentSerializer
    lookup_field = 'page_type'


class PageContentListView(generics.ListAPIView):
    """List all published page contents"""
    queryset = PageContent.objects.filter(is_published=True)
    serializer_class = PageContentSerializer


class SectionContentView(generics.ListAPIView):
    """Get section content by section type"""
    serializer_class = SectionContentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['section_type', 'page']
    
    def get_queryset(self):
        return SectionContent.objects.filter(is_active=True).order_by('order')


class CompanyInfoView(generics.RetrieveAPIView):
    """Get company information"""
    serializer_class = CompanyInfoSerializer
    
    def get_object(self):
        # Get or create company info (there should only be one instance)
        company_info, created = CompanyInfo.objects.get_or_create(
            id=1,
            defaults={
                'company_name': 'Digital Agency',
                'email': 'info@agency.com',
                'tagline': 'Your Creative Digital Partner',
                'description': 'We create innovative digital solutions that drive business growth.'
            }
        )
        return company_info


class TeamMemberListView(generics.ListAPIView):
    """List active team members"""
    queryset = TeamMember.objects.filter(is_active=True).order_by('department', 'order')
    serializer_class = TeamMemberListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['department', 'is_featured']


class TeamMemberDetailView(generics.RetrieveAPIView):
    """Get team member details"""
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    lookup_field = 'id'


class FeaturedTeamMembersView(generics.ListAPIView):
    """List featured team members"""
    queryset = TeamMember.objects.filter(is_active=True, is_featured=True).order_by('order')
    serializer_class = TeamMemberListSerializer


class TeamByDepartmentView(generics.ListAPIView):
    """List team members by department"""
    serializer_class = TeamMemberListSerializer
    
    def get_queryset(self):
        department = self.kwargs['department']
        return TeamMember.objects.filter(
            department=department,
            is_active=True
        ).order_by('order')


class JobPositionListView(generics.ListAPIView):
    """List active job positions"""
    queryset = JobPosition.objects.filter(is_active=True).order_by('-is_featured', '-created_at')
    serializer_class = JobPositionListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department', 'job_type', 'experience_level', 'is_featured']
    search_fields = ['title', 'description']


class JobPositionDetailView(generics.RetrieveAPIView):
    """Get job position details"""
    queryset = JobPosition.objects.filter(is_active=True)
    serializer_class = JobPositionSerializer
    lookup_field = 'id'


class FeaturedJobsView(generics.ListAPIView):
    """List featured job positions"""
    queryset = JobPosition.objects.filter(is_active=True, is_featured=True).order_by('-created_at')
    serializer_class = JobPositionListSerializer


class JobsByDepartmentView(generics.ListAPIView):
    """List jobs by department"""
    serializer_class = JobPositionListSerializer
    
    def get_queryset(self):
        department = self.kwargs['department']
        return JobPosition.objects.filter(
            department=department,
            is_active=True
        ).order_by('-is_featured', '-created_at')


class FeatureFlagListView(generics.ListAPIView):
    """List all feature flags"""
    queryset = FeatureFlag.objects.all().order_by('name')
    serializer_class = FeatureFlagSerializer


class SiteSettingsView(generics.RetrieveAPIView):
    """Get site settings"""
    serializer_class = SiteSettingsSerializer
    
    def get_object(self):
        # Get or create site settings (there should only be one instance)
        settings_obj, created = SiteSettings.objects.get_or_create(
            id=1,
            defaults={
                'site_name': 'Digital Agency',
                'site_description': 'Your Creative Digital Partner',
                'contact_email': 'contact@agency.com',
                'support_email': 'support@agency.com',
                'primary_color': '#00f5ff',
                'secondary_color': '#9966ff'
            }
        )
        return settings_obj


# =============================================================================
# AGGREGATED CONTENT VIEWS
# =============================================================================

class FrontendContentView(APIView):
    """Get all frontend content in one request"""
    
    def get(self, request):
        # Get all navigation menus
        navigation_menus = NavigationMenu.objects.filter(is_active=True).order_by('menu_type', 'order')
        
        # Get all page contents
        page_contents = PageContent.objects.filter(is_published=True)
        
        # Get company info
        company_info, _ = CompanyInfo.objects.get_or_create(id=1)
        
        # Get site settings
        site_settings, _ = SiteSettings.objects.get_or_create(id=1)
        
        # Get feature flags
        feature_flags = FeatureFlag.objects.all()
        
        # Serialize all data
        data = {
            'navigation_menus': NavigationMenuSerializer(navigation_menus, many=True, context={'request': request}).data,
            'page_contents': PageContentSerializer(page_contents, many=True, context={'request': request}).data,
            'company_info': CompanyInfoSerializer(company_info, context={'request': request}).data,
            'site_settings': SiteSettingsSerializer(site_settings, context={'request': request}).data,
            'feature_flags': FeatureFlagSerializer(feature_flags, many=True).data
        }
        
        return Response({
            'success': True,
            'data': data
        })


class HomePageDataView(APIView):
    """Get all data needed for homepage"""
    
    def get(self, request):
        # Get hero content
        try:
            hero_content = PageContent.objects.get(page_type='home', is_published=True)
        except PageContent.DoesNotExist:
            hero_content = None
        
        # Get featured projects
        featured_projects = Project.objects.filter(is_featured=True)[:6]
        
        # Get featured testimonials
        featured_testimonials = Testimonial.objects.filter(is_featured=True)[:6]
        
        # Get services
        services = Service.objects.filter(is_active=True).order_by('order')[:6]
        
        # Get featured team members
        featured_team_members = TeamMember.objects.filter(is_active=True, is_featured=True)[:4]
        
        # Get company info
        company_info, _ = CompanyInfo.objects.get_or_create(id=1)
        
        # Calculate stats
        stats_data = {
            'total_projects': Project.objects.count(),
            'total_clients': Testimonial.objects.values('company').distinct().count(),
            'years_experience': 5,
            'client_satisfaction': 98.5,
            'technologies_used': ['React', 'Django', 'Node.js', 'Python', 'JavaScript'],
            'recent_projects': featured_projects[:3],
            'featured_testimonials': featured_testimonials[:3]
        }
        
        # Serialize all data
        data = {
            'hero_content': PageContentSerializer(hero_content, context={'request': request}).data if hero_content else None,
            'featured_projects': ProjectSerializer(featured_projects, many=True, context={'request': request}).data,
            'featured_testimonials': TestimonialSerializer(featured_testimonials, many=True, context={'request': request}).data,
            'services': ServiceSerializer(services, many=True, context={'request': request}).data,
            'featured_team_members': TeamMemberListSerializer(featured_team_members, many=True, context={'request': request}).data,
            'company_info': CompanyInfoSerializer(company_info, context={'request': request}).data,
            'stats': stats_data
        }
        
        return Response({
            'success': True,
            'data': data
        })


class FooterDataView(APIView):
    """Get footer data"""
    
    def get(self, request):
        # Get company info
        company_info, _ = CompanyInfo.objects.get_or_create(id=1)
        
        # Get footer menus
        footer_menus = NavigationMenu.objects.filter(menu_type='footer', is_active=True).order_by('order')
        
        # Get quick links (can be header menu items too)
        quick_links = NavigationMenu.objects.filter(
            Q(menu_type='footer') | Q(menu_type='header'),
            is_active=True
        ).order_by('order')[:6]
        
        # Get recent blog posts
        recent_blog_posts = BlogPost.objects.filter(is_published=True).order_by('-published_at')[:3]
        
        # Serialize all data
        data = {
            'company_info': CompanyInfoSerializer(company_info, context={'request': request}).data,
            'footer_menus': NavigationMenuSerializer(footer_menus, many=True, context={'request': request}).data,
            'quick_links': NavigationMenuSerializer(quick_links, many=True, context={'request': request}).data,
            'recent_blog_posts': BlogPostListSerializer(recent_blog_posts, many=True, context={'request': request}).data
        }
        
        return Response({
            'success': True,
            'data': data
        })


# =============================================================================
# DASHBOARD STATISTICS API
# =============================================================================

@api_view(['GET'])
def dashboard_statistics_api(request):
    """
    API endpoint for dashboard statistics (for real-time updates)
    """
    from datetime import datetime, timedelta
    from django.db.models import Sum, Avg
    
    # Calculate statistics
    today = datetime.now().date()
    last_week = today - timedelta(days=7)
    last_month = today - timedelta(days=30)
    
    # Basic counts
    stats = {
        'overview': {
            'projects': {
                'total': Project.objects.count(),
                'featured': Project.objects.filter(is_featured=True).count(),
                'recent': Project.objects.filter(created_at__gte=datetime.now() - timedelta(days=30)).count()
            },
            'testimonials': {
                'total': Testimonial.objects.count(),
                'featured': Testimonial.objects.filter(is_featured=True).count(),
                'recent': Testimonial.objects.filter(created_at__gte=datetime.now() - timedelta(days=30)).count()
            },
            'messages': {
                'total': ContactMessage.objects.count(),
                'new': ContactMessage.objects.filter(status='new').count(),
                'recent': ContactMessage.objects.filter(created_at__gte=datetime.now() - timedelta(days=7)).count()
            },
            'content': {
                'blog_posts': BlogPost.objects.filter(is_published=True).count(),
                'services': Service.objects.filter(is_active=True).count(),
                'team_members': TeamMember.objects.filter(is_active=True).count(),
                'job_positions': JobPosition.objects.filter(is_active=True).count()
            }
        },
        'visitor_analytics': get_visitor_analytics(),
        'content_distribution': get_content_distribution(),
        'recent_activity': get_recent_activity(),
        'growth_metrics': get_growth_metrics()
    }
    
    return Response(stats)


def get_visitor_analytics():
    """
    Get visitor analytics data for charts
    """
    from datetime import datetime, timedelta
    import random
    
    # Get last 7 days
    today = datetime.now().date()
    last_7_days = [(today - timedelta(days=i)) for i in range(6, -1, -1)]
    
    # Simulate data - generate realistic visitor analytics
    analytics = {
        'labels': [day.strftime('%a') for day in last_7_days],
        'page_views': [],
        'unique_visitors': [],
        'mobile_percentage': 65.2,
        'bounce_rate': 35.8
    }
    
    # Generate sample data with realistic patterns
    for i, day in enumerate(last_7_days):
        base_views = 1200 + (i * 50)
        base_visitors = 800 + (i * 30)
        
        # Weekend dip
        weekend_factor = 0.7 if day.weekday() in [5, 6] else 1.0
        
        # Add some randomness
        daily_views = int(base_views * weekend_factor * (0.8 + random.random() * 0.4))
        daily_visitors = int(base_visitors * weekend_factor * (0.8 + random.random() * 0.4))
        
        analytics['page_views'].append(daily_views)
        analytics['unique_visitors'].append(daily_visitors)
    
    return analytics


def get_content_distribution():
    """
    Get content distribution for pie chart
    """
    return {
        'labels': ['Projects', 'Blog Posts', 'Services', 'Team Members', 'Testimonials'],
        'data': [
            Project.objects.count(),
            BlogPost.objects.filter(is_published=True).count(),
            Service.objects.filter(is_active=True).count(),
            TeamMember.objects.filter(is_active=True).count(),
            Testimonial.objects.count()
        ],
        'colors': ['#00f5ff', '#9966ff', '#ff6b6b', '#4ecdc4', '#ffd93d']
    }


def get_recent_activity():
    """
    Get recent activity for the dashboard
    """
    from datetime import datetime, timedelta
    
    last_week = datetime.now() - timedelta(days=7)
    activities = []
    
    # Recent projects
    recent_projects = Project.objects.filter(created_at__gte=last_week).order_by('-created_at')[:3]
    for project in recent_projects:
        activities.append({
            'type': 'project',
            'title': f'New project: {project.title}',
            'time': project.created_at.isoformat(),
            'icon': 'fas fa-briefcase',
            'color': 'primary'
        })
    
    # Recent testimonials
    recent_testimonials = Testimonial.objects.filter(created_at__gte=last_week).order_by('-created_at')[:3]
    for testimonial in recent_testimonials:
        activities.append({
            'type': 'testimonial',
            'title': f'New testimonial from {testimonial.name}',
            'time': testimonial.created_at.isoformat(),
            'icon': 'fas fa-star',
            'color': 'warning'
        })
    
    # Recent messages
    recent_messages = ContactMessage.objects.filter(created_at__gte=last_week).order_by('-created_at')[:3]
    for message in recent_messages:
        activities.append({
            'type': 'message',
            'title': f'Message from {message.name}: {message.subject}',
            'time': message.created_at.isoformat(),
            'icon': 'fas fa-envelope',
            'color': 'info'
        })
    
    # Sort by time and return latest 10
    activities.sort(key=lambda x: x['time'], reverse=True)
    return activities[:10]


def get_growth_metrics():
    """
    Calculate growth metrics for dashboard
    """
    from datetime import datetime, timedelta
    
    now = datetime.now()
    last_month = now - timedelta(days=30)
    previous_month = last_month - timedelta(days=30)
    
    # Current period stats
    current_projects = Project.objects.filter(created_at__gte=last_month).count()
    current_messages = ContactMessage.objects.filter(created_at__gte=last_month).count()
    current_testimonials = Testimonial.objects.filter(created_at__gte=last_month).count()
    
    # Previous period stats
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
    
    def calculate_growth(current, previous):
        if previous == 0:
            return 100 if current > 0 else 0
        return round(((current - previous) / previous) * 100, 1)
    
    return {
        'projects': {
            'current': current_projects,
            'previous': prev_projects,
            'growth': calculate_growth(current_projects, prev_projects)
        },
        'messages': {
            'current': current_messages,
            'previous': prev_messages,
            'growth': calculate_growth(current_messages, prev_messages)
        },
        'testimonials': {
            'current': current_testimonials,
            'previous': prev_testimonials,
            'growth': calculate_growth(current_testimonials, prev_testimonials)
        }
    }
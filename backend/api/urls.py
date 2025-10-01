from django.urls import path
from . import views
from . import seo_views

app_name = 'api'

urlpatterns = [
    # Health and info endpoints
    path('health/', views.health_check, name='health_check'),
    path('info/', views.api_info, name='api_info'),
    
    # Project endpoints
    path('projects/', views.ProjectListView.as_view(), name='project_list'),
    path('projects/featured/', views.FeaturedProjectsView.as_view(), name='featured_projects'),
    path('projects/categories/', views.ProjectCategoriesView.as_view(), name='project_categories'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project_detail'),
    
    # Testimonial endpoints
    path('testimonials/', views.TestimonialListView.as_view(), name='testimonial_list'),
    path('testimonials/featured/', views.FeaturedTestimonialsView.as_view(), name='featured_testimonials'),
    
    # Service endpoints
    path('services/', views.ServiceListView.as_view(), name='service_list'),
    path('services/<slug:slug>/', views.ServiceDetailView.as_view(), name='service_detail'),
    
    # Blog endpoints
    path('blog/', views.BlogPostListView.as_view(), name='blog_list'),
    path('blog/<slug:slug>/', views.BlogPostDetailView.as_view(), name='blog_detail'),
    
    # Contact endpoints
    path('contact/', views.ContactMessageCreateView.as_view(), name='contact_create'),
    path('contact/quick/', views.QuickContactView.as_view(), name='quick_contact'),
    
    # Newsletter endpoint
    path('newsletter/subscribe/', views.NewsletterSubscribeView.as_view(), name='newsletter_subscribe'),
    
    # Stats endpoint
    path('stats/', views.StatsView.as_view(), name='stats'),
    
    # Search endpoint
    path('search/', views.SearchView.as_view(), name='search'),
    
    # Authentication endpoints
    path('auth/register/', views.UserRegistrationView.as_view(), name='user_register'),
    path('auth/login/', views.UserLoginView.as_view(), name='user_login'),
    
    # Meeting endpoints
    path('meetings/', views.MeetingRequestListView.as_view(), name='meeting_list'),
    path('meetings/request/', views.MeetingRequestCreateView.as_view(), name='meeting_request'),
    
    # Help Center endpoints
    path('help/', views.HelpArticleListView.as_view(), name='help_list'),
    path('help/category/<str:category>/', views.HelpArticleCategoryView.as_view(), name='help_category'),
    path('help/<slug:slug>/', views.HelpArticleDetailView.as_view(), name='help_detail'),
    
    # Case Study endpoints
    path('case-studies/', views.CaseStudyListView.as_view(), name='case_study_list'),
    path('case-studies/featured/', views.FeaturedCaseStudiesView.as_view(), name='featured_case_studies'),
    path('case-studies/industry/<str:industry>/', views.CaseStudyByIndustryView.as_view(), name='case_study_industry'),
    path('case-studies/<slug:slug>/', views.CaseStudyDetailView.as_view(), name='case_study_detail'),
    
    # =============================================================================
    # CONTENT MANAGEMENT ENDPOINTS
    # =============================================================================
    
    # Navigation & Menu endpoints
    path('navigation/', views.NavigationMenuListView.as_view(), name='navigation_list'),
    path('navigation/header/', views.HeaderMenuView.as_view(), name='header_menu'),
    path('navigation/footer/', views.FooterMenuView.as_view(), name='footer_menu'),
    
    # Page Content endpoints
    path('pages/', views.PageContentListView.as_view(), name='page_list'),
    path('pages/<str:page_type>/', views.PageContentView.as_view(), name='page_content'),
    
    # Section Content endpoints
    path('sections/', views.SectionContentView.as_view(), name='section_content'),
    
    # Company Information endpoints
    path('company/', views.CompanyInfoView.as_view(), name='company_info'),
    
    # Team endpoints
    path('team/', views.TeamMemberListView.as_view(), name='team_list'),
    path('team/featured/', views.FeaturedTeamMembersView.as_view(), name='featured_team'),
    path('team/department/<str:department>/', views.TeamByDepartmentView.as_view(), name='team_department'),
    path('team/<int:id>/', views.TeamMemberDetailView.as_view(), name='team_detail'),
    
    # Career/Job endpoints
    path('careers/', views.JobPositionListView.as_view(), name='careers_list'),
    path('careers/featured/', views.FeaturedJobsView.as_view(), name='featured_jobs'),
    path('careers/department/<str:department>/', views.JobsByDepartmentView.as_view(), name='jobs_department'),
    path('careers/<int:id>/', views.JobPositionDetailView.as_view(), name='job_detail'),
    
    # Feature Flags endpoints
    path('features/', views.FeatureFlagListView.as_view(), name='feature_flags'),
    
    # Site Settings endpoints
    path('settings/', views.SiteSettingsView.as_view(), name='site_settings'),
    
    # =============================================================================
    # AGGREGATED CONTENT ENDPOINTS
    # =============================================================================
    
    # Get all frontend content in one request
    path('content/all/', views.FrontendContentView.as_view(), name='frontend_content'),
    
    # Get homepage data
    path('content/homepage/', views.HomePageDataView.as_view(), name='homepage_data'),
    
    # Get footer data
    path('content/footer/', views.FooterDataView.as_view(), name='footer_data'),
    
    # =============================================================================
    # DASHBOARD API ENDPOINTS
    # =============================================================================
    
    # Dashboard statistics API
    path('dashboard/stats/', views.dashboard_statistics_api, name='dashboard_stats'),
    
    # =============================================================================
    # SEO OPTIMIZATION ENDPOINTS
    # =============================================================================
    
    # SEO files
    path('sitemap.xml', seo_views.sitemap_xml, name='sitemap_xml'),
    path('robots.txt', seo_views.robots_txt, name='robots_txt'),
    
    # SEO health check
    path('seo/check/', seo_views.seo_check, name='seo_check'),
]
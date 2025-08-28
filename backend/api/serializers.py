from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import (
    Project, Testimonial, ContactMessage, Service, BlogPost, NewsletterSubscriber, 
    UserProfile, MeetingRequest, HelpArticle, CaseStudy,
    # New content management models
    NavigationMenu, SubMenuItem, PageContent, SectionContent, CompanyInfo,
    TeamMember, JobPosition, FeatureFlag, SiteSettings
)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'description', 'detailed_description',
            'image', 'image_url', 'technologies', 'year', 'client_name',
            'project_url', 'github_url', 'is_featured', 'created_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return obj.image_url


class TestimonialSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source='project.title', read_only=True)
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'position', 'company', 'text', 'rating',
            'image', 'image_url', 'project', 'project_title', 'is_featured', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'project_title']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return obj.image_url


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'phone', 'company', 'message_type',
            'subject', 'message', 'budget_range', 'project_timeline', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_email(self, value):
        """Validate email format"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value

    def validate_message(self, value):
        """Validate message length"""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'slug', 'short_description', 'description',
            'icon', 'features', 'price_range', 'is_active', 'order'
        ]
        read_only_fields = ['id', 'slug']


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'featured_image',
            'featured_image_url', 'tags', 'is_published', 'is_featured',
            'read_time', 'created_at', 'updated_at', 'published_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at', 'published_at']

    def get_featured_image_url(self, obj):
        if obj.featured_image:
            return self.context['request'].build_absolute_uri(obj.featured_image.url)
        return obj.featured_image_url


class BlogPostListSerializer(serializers.ModelSerializer):
    """Simplified serializer for blog post lists"""
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'featured_image_url', 'tags', 'is_featured', 'read_time',
            'published_at'
        ]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'name', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']

    def validate_email(self, value):
        """Validate email format and check for existing subscription"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        
        # Check if email already exists
        if NewsletterSubscriber.objects.filter(email=value, is_active=True).exists():
            raise serializers.ValidationError("This email is already subscribed to our newsletter.")
        
        return value


class ContactFormSerializer(serializers.Serializer):
    """Simplified contact form serializer for quick contact submissions"""
    name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    subject = serializers.CharField(max_length=200, required=True)
    message = serializers.CharField(required=True)
    message_type = serializers.ChoiceField(
        choices=ContactMessage.MESSAGE_TYPES,
        default='general',
        required=False
    )

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value

    def create(self, validated_data):
        return ContactMessage.objects.create(**validated_data)


class ProjectFilterSerializer(serializers.Serializer):
    """Serializer for project filtering parameters"""
    category = serializers.ChoiceField(
        choices=Project.CATEGORY_CHOICES,
        required=False,
        allow_blank=True
    )
    year = serializers.IntegerField(required=False, min_value=2020, max_value=2030)
    is_featured = serializers.BooleanField(required=False)
    technologies = serializers.CharField(required=False, allow_blank=True)


class StatsSerializer(serializers.Serializer):
    """Serializer for website statistics"""
    total_projects = serializers.IntegerField()
    total_clients = serializers.IntegerField()
    years_experience = serializers.IntegerField()
    client_satisfaction = serializers.FloatField()
    technologies_used = serializers.ListField(child=serializers.CharField())
    recent_projects = ProjectSerializer(many=True, read_only=True)
    featured_testimonials = TestimonialSerializer(many=True, read_only=True)


# Authentication Serializers
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'confirm_password']
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        # Create user profile
        UserProfile.objects.create(user=user)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            try:
                user = User.objects.get(email=email)
                user = authenticate(username=user.username, password=password)
                if not user:
                    raise serializers.ValidationError('Invalid email or password.')
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')
                data['user'] = user
            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid email or password.')
        else:
            raise serializers.ValidationError('Email and password are required.')
        
        return data


class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['phone', 'company', 'bio', 'avatar', 'full_name', 'email', 'is_email_verified']
        read_only_fields = ['is_email_verified']


# Meeting Request Serializers
class MeetingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRequest
        fields = [
            'id', 'name', 'email', 'phone', 'company',
            'meeting_type', 'preferred_date', 'preferred_time',
            'project_description', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'created_at']
    
    def validate_preferred_date(self, value):
        from datetime import date
        if value < date.today():
            raise serializers.ValidationError("Meeting date cannot be in the past.")
        return value
    
    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value
    
    def validate_project_description(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError("Please provide more details about your project (minimum 20 characters).")
        return value


class MeetingRequestListSerializer(serializers.ModelSerializer):
    """Simplified serializer for meeting request lists"""
    class Meta:
        model = MeetingRequest
        fields = [
            'id', 'name', 'company', 'meeting_type',
            'preferred_date', 'preferred_time', 'status', 'created_at'
        ]


class HelpArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpArticle
        fields = [
            'id', 'title', 'slug', 'category', 'excerpt', 'content',
            'is_published', 'is_featured', 'view_count', 'helpful_votes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'view_count', 'helpful_votes', 'created_at', 'updated_at']


class HelpArticleListSerializer(serializers.ModelSerializer):
    """Simplified serializer for help article lists"""
    class Meta:
        model = HelpArticle
        fields = [
            'id', 'title', 'slug', 'category', 'excerpt',
            'is_featured', 'view_count', 'helpful_votes'
        ]


class CaseStudySerializer(serializers.ModelSerializer):
    testimonial_data = TestimonialSerializer(source='testimonial', read_only=True)
    
    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'slug', 'client_name', 'industry',
            'challenge', 'solution', 'results', 'featured_image',
            'featured_image_url', 'technologies_used', 'project_duration',
            'project_url', 'testimonial', 'testimonial_data', 'is_featured',
            'metrics', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']
    
    def get_featured_image_url(self, obj):
        if obj.featured_image:
            return self.context['request'].build_absolute_uri(obj.featured_image.url)
        return obj.featured_image_url


class CaseStudyListSerializer(serializers.ModelSerializer):
    """Simplified serializer for case study lists"""
    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'slug', 'client_name', 'industry',
            'featured_image', 'featured_image_url', 'project_duration',
            'is_featured', 'technologies_used'
        ]


# =============================================================================
# CONTENT MANAGEMENT SERIALIZERS
# =============================================================================

class SubMenuItemSerializer(serializers.ModelSerializer):
    """Serializer for submenu items"""
    class Meta:
        model = SubMenuItem
        fields = [
            'id', 'name', 'description', 'icon', 'url', 'external_url', 
            'order', 'is_active'
        ]


class NavigationMenuSerializer(serializers.ModelSerializer):
    """Serializer for navigation menus with submenu items"""
    submenu_items = SubMenuItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = NavigationMenu
        fields = [
            'id', 'name', 'slug', 'menu_type', 'icon', 'url', 'external_url',
            'order', 'is_active', 'has_submenu', 'submenu_items'
        ]


class SectionContentSerializer(serializers.ModelSerializer):
    """Serializer for section content"""
    class Meta:
        model = SectionContent
        fields = [
            'id', 'section_type', 'title', 'subtitle', 'content',
            'button_text', 'button_url', 'background_color', 
            'is_active', 'order'
        ]


class PageContentSerializer(serializers.ModelSerializer):
    """Serializer for page content with sections"""
    sections = SectionContentSerializer(many=True, read_only=True)
    
    class Meta:
        model = PageContent
        fields = [
            'id', 'page_type', 'title', 'subtitle', 'meta_description',
            'hero_title', 'hero_subtitle', 'hero_button_text', 'hero_button_url',
            'content', 'is_published', 'sections'
        ]


class CompanyInfoSerializer(serializers.ModelSerializer):
    """Serializer for company information"""
    logo_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyInfo
        fields = [
            'id', 'company_name', 'tagline', 'description', 'email', 'phone',
            'address', 'business_hours', 'facebook_url', 'twitter_url',
            'linkedin_url', 'instagram_url', 'youtube_url', 'meta_keywords',
            'meta_description', 'logo', 'logo_url', 'favicon', 'favicon_url'
        ]
    
    def get_logo_url(self, obj):
        if obj.logo and hasattr(obj.logo, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None
    
    def get_favicon_url(self, obj):
        if obj.favicon and hasattr(obj.favicon, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.favicon.url)
            return obj.favicon.url
        return None


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for team members"""
    image_url_full = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'position', 'department', 'bio', 'image', 'image_url',
            'image_url_full', 'years_experience', 'skills', 'email', 'linkedin_url',
            'twitter_url', 'github_url', 'is_active', 'is_featured', 'order'
        ]
    
    def get_image_url_full(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url


class TeamMemberListSerializer(serializers.ModelSerializer):
    """Simplified serializer for team member lists"""
    image_url_full = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'position', 'department', 'image_url', 'image_url_full',
            'years_experience', 'is_featured'
        ]
    
    def get_image_url_full(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url


class JobPositionSerializer(serializers.ModelSerializer):
    """Serializer for job positions"""
    is_expired = serializers.ReadOnlyField()
    salary_range = serializers.SerializerMethodField()
    
    class Meta:
        model = JobPosition
        fields = [
            'id', 'title', 'department', 'job_type', 'experience_level',
            'location', 'description', 'requirements', 'responsibilities',
            'benefits', 'salary_min', 'salary_max', 'salary_currency',
            'salary_range', 'is_active', 'is_featured', 'application_deadline',
            'is_expired', 'created_at'
        ]
    
    def get_salary_range(self, obj):
        if obj.salary_min and obj.salary_max:
            return f"{obj.salary_min:,} - {obj.salary_max:,} {obj.salary_currency}"
        elif obj.salary_min:
            return f"From {obj.salary_min:,} {obj.salary_currency}"
        elif obj.salary_max:
            return f"Up to {obj.salary_max:,} {obj.salary_currency}"
        return "Competitive"


class JobPositionListSerializer(serializers.ModelSerializer):
    """Simplified serializer for job position lists"""
    is_expired = serializers.ReadOnlyField()
    salary_range = serializers.SerializerMethodField()
    
    class Meta:
        model = JobPosition
        fields = [
            'id', 'title', 'department', 'job_type', 'experience_level',
            'location', 'salary_range', 'is_featured', 'application_deadline',
            'is_expired'
        ]
    
    def get_salary_range(self, obj):
        if obj.salary_min and obj.salary_max:
            return f"{obj.salary_min:,} - {obj.salary_max:,} {obj.salary_currency}"
        elif obj.salary_min:
            return f"From {obj.salary_min:,} {obj.salary_currency}"
        elif obj.salary_max:
            return f"Up to {obj.salary_max:,} {obj.salary_currency}"
        return "Competitive"


class FeatureFlagSerializer(serializers.ModelSerializer):
    """Serializer for feature flags"""
    class Meta:
        model = FeatureFlag
        fields = ['name', 'description', 'is_enabled']


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Serializer for site settings"""
    class Meta:
        model = SiteSettings
        fields = [
            'site_name', 'site_description', 'maintenance_mode',
            'contact_email', 'support_email', 'google_analytics_id',
            'facebook_pixel_id', 'primary_color', 'secondary_color'
        ]


# =============================================================================
# COMBINED/AGGREGATE SERIALIZERS
# =============================================================================

class FrontendContentSerializer(serializers.Serializer):
    """Aggregated serializer for all frontend content"""
    navigation_menus = NavigationMenuSerializer(many=True, read_only=True)
    page_contents = PageContentSerializer(many=True, read_only=True)
    company_info = CompanyInfoSerializer(read_only=True)
    site_settings = SiteSettingsSerializer(read_only=True)
    feature_flags = FeatureFlagSerializer(many=True, read_only=True)


class HomePageDataSerializer(serializers.Serializer):
    """Serializer for homepage data aggregation"""
    hero_content = PageContentSerializer(read_only=True)
    featured_projects = ProjectSerializer(many=True, read_only=True)
    featured_testimonials = TestimonialSerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    featured_team_members = TeamMemberListSerializer(many=True, read_only=True)
    company_info = CompanyInfoSerializer(read_only=True)
    stats = StatsSerializer(read_only=True)


class FooterDataSerializer(serializers.Serializer):
    """Serializer for footer data"""
    company_info = CompanyInfoSerializer(read_only=True)
    footer_menus = NavigationMenuSerializer(many=True, read_only=True)
    quick_links = NavigationMenuSerializer(many=True, read_only=True)
    recent_blog_posts = BlogPostListSerializer(many=True, read_only=True)
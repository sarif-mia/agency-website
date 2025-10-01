from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.utils import timezone
from django.core.exceptions import ValidationError


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web Development'),
        ('mobile', 'Mobile Apps'),
        ('branding', 'Branding'),
        ('marketing', 'Digital Marketing'),
        ('design', 'UI/UX Design'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    detailed_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    technologies = models.JSONField(default=list, help_text="List of technologies used")
    year = models.PositiveIntegerField(default=2024)
    client_name = models.CharField(max_length=100, blank=True)
    project_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        
    def __str__(self):
        return self.title


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    text = models.TextField(validators=[MinLengthValidator(50), MaxLengthValidator(500)])
    rating = models.PositiveIntegerField(default=5, choices=[(i, i) for i in range(1, 6)])
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        
    def __str__(self):
        return f"{self.name} - {self.company}"


class ContactMessage(models.Model):
    MESSAGE_TYPES = [
        ('general', 'General Inquiry'),
        ('project', 'Project Request'),
        ('support', 'Support'),
        ('partnership', 'Partnership'),
    ]
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('replied', 'Replied'),
        ('closed', 'Closed'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=100, blank=True)
    message_type = models.CharField(max_length=20, choices=MESSAGE_TYPES, default='general')
    subject = models.CharField(max_length=200)
    message = models.TextField()
    budget_range = models.CharField(max_length=50, blank=True)
    project_timeline = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.name} - {self.subject}"


class Service(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    short_description = models.TextField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Icon name for frontend")
    features = models.JSONField(default=list, help_text="List of key features")
    price_range = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        
    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    featured_image_url = models.URLField(blank=True, null=True)
    tags = models.JSONField(default=list, help_text="List of tags")
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    read_time = models.PositiveIntegerField(default=5, help_text="Estimated read time in minutes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        ordering = ['-is_featured', '-published_at']
        
    def save(self, *args, **kwargs):
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-subscribed_at']
        
    def __str__(self):
        return self.email


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} Profile"


class HelpArticle(models.Model):
    CATEGORY_CHOICES = [
        ('getting-started', 'Getting Started'),
        ('account', 'Account & Billing'),
        ('services', 'Our Services'),
        ('technical', 'Technical Support'),
        ('general', 'General Questions'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    view_count = models.PositiveIntegerField(default=0)
    helpful_votes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-helpful_votes', '-created_at']
        
    def __str__(self):
        return self.title


class CaseStudy(models.Model):
    INDUSTRY_CHOICES = [
        ('technology', 'Technology'),
        ('healthcare', 'Healthcare'),
        ('finance', 'Finance'),
        ('education', 'Education'),
        ('ecommerce', 'E-commerce'),
        ('startup', 'Startup'),
        ('enterprise', 'Enterprise'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    client_name = models.CharField(max_length=100)
    industry = models.CharField(max_length=20, choices=INDUSTRY_CHOICES)
    challenge = models.TextField(help_text="The problem we solved")
    solution = models.TextField(help_text="How we solved it")
    results = models.TextField(help_text="The outcomes achieved")
    featured_image = models.ImageField(upload_to='case-studies/', blank=True, null=True)
    featured_image_url = models.URLField(blank=True, null=True)
    technologies_used = models.JSONField(default=list, help_text="List of technologies used")
    project_duration = models.CharField(max_length=50, help_text="e.g., '3 months', '6 weeks'")
    project_url = models.URLField(blank=True, null=True)
    testimonial = models.ForeignKey(Testimonial, on_delete=models.SET_NULL, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Key metrics
    metrics = models.JSONField(default=dict, help_text="Key performance metrics")
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name_plural = "Case Studies"
        
    def __str__(self):
        return f"{self.title} - {self.client_name}"


class MeetingRequest(models.Model):
    MEETING_TYPES = [
        ('consultation', 'Free Consultation'),
        ('project', 'Project Discussion'),
        ('support', 'Technical Support'),
        ('partnership', 'Partnership'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('rescheduled', 'Rescheduled'),
    ]
    
    TIME_SLOTS = [
        ('09:00', '9:00 AM'),
        ('10:00', '10:00 AM'),
        ('11:00', '11:00 AM'),
        ('14:00', '2:00 PM'),
        ('15:00', '3:00 PM'),
        ('16:00', '4:00 PM'),
    ]
    
    # Contact Information
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=100, blank=True)
    
    # Meeting Details
    meeting_type = models.CharField(max_length=20, choices=MEETING_TYPES, default='consultation')
    preferred_date = models.DateField()
    preferred_time = models.CharField(max_length=5, choices=TIME_SLOTS)
    project_description = models.TextField(help_text="Tell us about your project")
    
    # System Fields
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Optional: Link to registered user if they're logged in
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Meeting notes (for admin use)
    admin_notes = models.TextField(blank=True)
    meeting_link = models.URLField(blank=True, help_text="Zoom/Meet link for the meeting")
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.name} - {self.meeting_type} on {self.preferred_date}"
    
    @property
    def is_past_due(self):
        """Check if the meeting date has passed"""
        return self.preferred_date < timezone.now().date()


# =============================================================================
# FRONTEND CONTENT MANAGEMENT MODELS
# =============================================================================

class NavigationMenu(models.Model):
    """Main navigation menu items"""
    MENU_TYPES = [
        ('header', 'Header Menu'),
        ('footer', 'Footer Menu'),
        ('mobile', 'Mobile Menu'),
    ]
    
    name = models.CharField(max_length=100, help_text="Menu display name")
    slug = models.SlugField(unique=True, help_text="URL-friendly name")
    menu_type = models.CharField(max_length=20, choices=MENU_TYPES, default='header')
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name (e.g., home, about, services)")
    url = models.CharField(max_length=200, blank=True, help_text="URL or section ID (e.g., #about, /services)")
    external_url = models.URLField(blank=True, help_text="External link (will open in new tab)")
    order = models.PositiveIntegerField(default=0, help_text="Display order (lower numbers appear first)")
    is_active = models.BooleanField(default=True)
    has_submenu = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['menu_type', 'order', 'name']
        verbose_name = "Navigation Menu"
        verbose_name_plural = "Navigation Menus"
        
    def __str__(self):
        return f"{self.get_menu_type_display()} - {self.name}"
    
    def clean(self):
        if self.url and self.external_url:
            raise ValidationError("Cannot have both internal URL and external URL")
        if not self.url and not self.external_url and not self.has_submenu:
            raise ValidationError("Must have either URL, external URL, or submenu items")


class SubMenuItem(models.Model):
    """Submenu items for main navigation"""
    parent_menu = models.ForeignKey(NavigationMenu, on_delete=models.CASCADE, related_name='submenu_items')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, help_text="Brief description for hover/tooltip")
    icon = models.CharField(max_length=50, blank=True)
    url = models.CharField(max_length=200, blank=True)
    external_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['parent_menu', 'order', 'name']
        verbose_name = "Sub Menu Item"
        verbose_name_plural = "Sub Menu Items"
        
    def __str__(self):
        return f"{self.parent_menu.name} > {self.name}"
    
    def clean(self):
        if self.url and self.external_url:
            raise ValidationError("Cannot have both internal URL and external URL")
        if not self.url and not self.external_url:
            raise ValidationError("Must have either URL or external URL")


class PageContent(models.Model):
    """Manages content for different pages"""
    PAGE_TYPES = [
        ('home', 'Home Page'),
        ('about', 'About Us'),
        ('services', 'Services'),
        ('portfolio', 'Portfolio'),
        ('team', 'Our Team'),
        ('careers', 'Careers'),
        ('blog', 'Blog'),
        ('contact', 'Contact'),
        ('privacy', 'Privacy Policy'),
        ('terms', 'Terms & Conditions'),
        ('help', 'Help Center'),
        ('case-studies', 'Case Studies'),
    ]
    
    page_type = models.CharField(max_length=20, choices=PAGE_TYPES, unique=True)
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    meta_description = models.TextField(max_length=160, blank=True, help_text="SEO meta description")
    hero_title = models.CharField(max_length=200, blank=True)
    hero_subtitle = models.TextField(blank=True)
    hero_button_text = models.CharField(max_length=50, blank=True, default="Get Started")
    hero_button_url = models.CharField(max_length=200, blank=True)
    content = models.TextField(blank=True, help_text="Main page content (HTML allowed)")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['page_type']
        verbose_name = "Page Content"
        verbose_name_plural = "Page Contents"
        
    def __str__(self):
        return f"{self.get_page_type_display()} - {self.title}"


class SectionContent(models.Model):
    """Manages content for different sections within pages"""
    SECTION_TYPES = [
        ('hero', 'Hero Section'),
        ('about', 'About Section'),
        ('services', 'Services Section'),
        ('portfolio', 'Portfolio Section'),
        ('process', 'Process Section'),
        ('testimonials', 'Testimonials Section'),
        ('team', 'Team Section'),
        ('cta', 'Call to Action'),
        ('contact', 'Contact Section'),
        ('footer', 'Footer Section'),
    ]
    
    section_type = models.CharField(max_length=20, choices=SECTION_TYPES)
    page = models.ForeignKey(PageContent, on_delete=models.CASCADE, related_name='sections', null=True, blank=True)
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    content = models.TextField(blank=True)
    button_text = models.CharField(max_length=50, blank=True)
    button_url = models.CharField(max_length=200, blank=True)
    background_color = models.CharField(max_length=7, default='#0a0a0a', help_text="Hex color code")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['page', 'order', 'section_type']
        verbose_name = "Section Content"
        verbose_name_plural = "Section Contents"
        
    def __str__(self):
        page_name = self.page.get_page_type_display() if self.page else "Global"
        return f"{page_name} - {self.get_section_type_display()}"


class CompanyInfo(models.Model):
    """Company information and contact details"""
    company_name = models.CharField(max_length=200, default="site gen it")
    tagline = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    
    # Contact Information
    email = models.EmailField(default="info@agency.com")
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    # Business Hours
    business_hours = models.TextField(blank=True, default="Mon-Fri: 9:00 AM - 6:00 PM")
    
    # Social Media
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    
    # SEO
    meta_keywords = models.TextField(blank=True, help_text="Comma-separated keywords")
    meta_description = models.TextField(max_length=160, blank=True)
    
    # Logo and Branding
    logo = models.ImageField(upload_to='company/', blank=True, null=True)
    favicon = models.ImageField(upload_to='company/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Company Information"
        verbose_name_plural = "Company Information"
        
    def __str__(self):
        return self.company_name
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and CompanyInfo.objects.exists():
            raise ValidationError('Only one Company Info instance is allowed')
        super().save(*args, **kwargs)


class TeamMember(models.Model):
    """Team member information for Our Team page"""
    DEPARTMENT_CHOICES = [
        ('leadership', 'Leadership'),
        ('development', 'Development'),
        ('design', 'Design'),
        ('marketing', 'Marketing'),
        ('sales', 'Sales'),
        ('support', 'Support'),
    ]
    
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    
    # Experience
    years_experience = models.PositiveIntegerField(default=0, help_text="Years of experience")
    
    # Skills
    skills = models.JSONField(default=list, help_text="List of skills/technologies")
    
    # Social Media
    email = models.EmailField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False, help_text="Show on homepage")
    order = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['department', 'order', 'name']
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"
        
    def __str__(self):
        return f"{self.name} - {self.position}"


class JobPosition(models.Model):
    """Job positions for Careers page"""
    JOB_TYPES = [
        ('full-time', 'Full Time'),
        ('part-time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('remote', 'Remote'),
    ]
    
    EXPERIENCE_LEVELS = [
        ('entry', 'Entry Level'),
        ('junior', 'Junior'),
        ('mid', 'Mid Level'),
        ('senior', 'Senior'),
        ('lead', 'Lead'),
        ('manager', 'Manager'),
    ]
    
    title = models.CharField(max_length=200)
    department = models.CharField(max_length=100)
    job_type = models.CharField(max_length=20, choices=JOB_TYPES)
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_LEVELS)
    location = models.CharField(max_length=100, default="Remote")
    
    # Job Details
    description = models.TextField(help_text="Job description")
    requirements = models.JSONField(default=list, help_text="List of requirements")
    responsibilities = models.JSONField(default=list, help_text="List of responsibilities")
    benefits = models.JSONField(default=list, help_text="List of benefits")
    
    # Salary
    salary_min = models.PositiveIntegerField(blank=True, null=True)
    salary_max = models.PositiveIntegerField(blank=True, null=True)
    salary_currency = models.CharField(max_length=3, default='USD')
    
    # Status
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    application_deadline = models.DateField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name = "Job Position"
        verbose_name_plural = "Job Positions"
        
    def __str__(self):
        return f"{self.title} - {self.department}"
    
    @property
    def is_expired(self):
        if self.application_deadline:
            return self.application_deadline < timezone.now().date()
        return False


class FeatureFlag(models.Model):
    """Feature flags for enabling/disabling frontend features"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        verbose_name = "Feature Flag"
        verbose_name_plural = "Feature Flags"
        
    def __str__(self):
        return f"{self.name} ({'Enabled' if self.is_enabled else 'Disabled'})"


class SiteSettings(models.Model):
    """Global site settings"""
    # General Settings
    site_name = models.CharField(max_length=200, default="site gen it")
    site_description = models.TextField(blank=True)
    maintenance_mode = models.BooleanField(default=False)
    
    # Contact Settings
    contact_email = models.EmailField(default="contact@agency.com")
    support_email = models.EmailField(default="support@agency.com")
    
    # Analytics
    google_analytics_id = models.CharField(max_length=50, blank=True)
    facebook_pixel_id = models.CharField(max_length=50, blank=True)
    
    # Theme Settings
    primary_color = models.CharField(max_length=7, default='#00f5ff')
    secondary_color = models.CharField(max_length=7, default='#9966ff')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
        
    def __str__(self):
        return self.site_name
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and SiteSettings.objects.exists():
            raise ValidationError('Only one Site Settings instance is allowed')
        super().save(*args, **kwargs)


class DynamicSection(models.Model):
    """Dynamic sections that can be added to any page"""
    SECTION_TYPES = [
        ('hero', 'Hero Section'),
        ('about', 'About Section'),
        ('services', 'Services Section'),
        ('portfolio', 'Portfolio Section'),
        ('testimonials', 'Testimonials Section'),
        ('team', 'Team Section'),
        ('contact', 'Contact Section'),
        ('cta', 'Call to Action'),
        ('feature', 'Feature Section'),
        ('stats', 'Statistics Section'),
        ('blog', 'Blog Section'),
        ('gallery', 'Gallery Section'),
        ('faq', 'FAQ Section'),
        ('pricing', 'Pricing Section'),
        ('custom', 'Custom HTML'),
    ]
    
    PAGE_CHOICES = [
        ('home', 'Home Page'),
        ('about', 'About Page'),
        ('services', 'Services Page'),
        ('portfolio', 'Portfolio Page'),
        ('team', 'Team Page'),
        ('contact', 'Contact Page'),
        ('blog', 'Blog Page'),
        ('careers', 'Careers Page'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    section_type = models.CharField(max_length=20, choices=SECTION_TYPES)
    page = models.CharField(max_length=20, choices=PAGE_CHOICES)
    
    # Content
    heading = models.CharField(max_length=300, blank=True)
    subheading = models.CharField(max_length=500, blank=True)
    content = models.TextField(blank=True)
    html_content = models.TextField(blank=True, help_text="Custom HTML content")
    
    # Media
    background_image = models.ImageField(upload_to='sections/', blank=True, null=True)
    background_video = models.FileField(upload_to='sections/videos/', blank=True, null=True)
    background_color = models.CharField(max_length=7, blank=True, default='#000000')
    
    # Layout
    layout_style = models.CharField(max_length=50, default='default')
    css_classes = models.CharField(max_length=500, blank=True, help_text="Additional CSS classes")
    custom_css = models.TextField(blank=True, help_text="Custom CSS for this section")
    
    # Settings
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    show_on_mobile = models.BooleanField(default=True)
    
    # Buttons
    button_text = models.CharField(max_length=100, blank=True)
    button_url = models.CharField(max_length=500, blank=True)
    button_style = models.CharField(max_length=50, default='primary')
    
    # Additional Data
    data = models.JSONField(default=dict, help_text="Additional section data")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['page', 'order', 'title']
        verbose_name = "Dynamic Section"
        verbose_name_plural = "Dynamic Sections"
        
    def __str__(self):
        return f"{self.title} ({self.get_page_display()} - {self.get_section_type_display()})"


class VisitorStatistics(models.Model):
    """Track visitor statistics for dashboard"""
    date = models.DateField(auto_now_add=True)
    page_views = models.PositiveIntegerField(default=0)
    unique_visitors = models.PositiveIntegerField(default=0)
    bounce_rate = models.FloatField(default=0.0)
    avg_session_duration = models.PositiveIntegerField(default=0)  # in seconds
    
    # Page specific stats
    home_views = models.PositiveIntegerField(default=0)
    about_views = models.PositiveIntegerField(default=0)
    services_views = models.PositiveIntegerField(default=0)
    portfolio_views = models.PositiveIntegerField(default=0)
    contact_views = models.PositiveIntegerField(default=0)
    blog_views = models.PositiveIntegerField(default=0)
    
    # Device stats
    mobile_views = models.PositiveIntegerField(default=0)
    desktop_views = models.PositiveIntegerField(default=0)
    tablet_views = models.PositiveIntegerField(default=0)
    
    # Traffic sources
    direct_traffic = models.PositiveIntegerField(default=0)
    search_traffic = models.PositiveIntegerField(default=0)
    social_traffic = models.PositiveIntegerField(default=0)
    referral_traffic = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date']
        verbose_name = "Visitor Statistics"
        verbose_name_plural = "Visitor Statistics"
        unique_together = ['date']
        
    def __str__(self):
        return f"Stats for {self.date} - {self.page_views} views"


# =============================================================================
# SEO OPTIMIZATION MODELS FOR TOP GOOGLE RANKINGS
# =============================================================================

class SEOMetaTags(models.Model):
    """SEO meta tags for individual pages and content"""
    PAGE_TYPES = [
        ('home', 'Home Page'),
        ('about', 'About Page'),
        ('services', 'Services Page'),
        ('portfolio', 'Portfolio Page'),
        ('team', 'Team Page'),
        ('contact', 'Contact Page'),
        ('blog', 'Blog Page'),
        ('careers', 'Careers Page'),
        ('help', 'Help Center'),
        ('case-studies', 'Case Studies'),
        ('privacy', 'Privacy Policy'),
        ('terms', 'Terms & Conditions'),
    ]
    
    # Page identification
    page_type = models.CharField(max_length=20, choices=PAGE_TYPES, unique=True)
    page_url = models.CharField(max_length=500, blank=True, help_text="Specific URL path")
    
    # SEO Meta Tags
    meta_title = models.CharField(max_length=60, help_text="SEO title (max 60 chars for Google)")
    meta_description = models.CharField(max_length=160, help_text="SEO description (max 160 chars)")
    meta_keywords = models.TextField(blank=True, help_text="Comma-separated keywords")
    
    # Open Graph tags for social media
    og_title = models.CharField(max_length=95, blank=True, help_text="Facebook/social title")
    og_description = models.CharField(max_length=200, blank=True, help_text="Facebook/social description")
    og_image = models.ImageField(upload_to='seo/', blank=True, null=True, help_text="Social media image (1200x630px)")
    og_image_url = models.URLField(blank=True, help_text="External image URL")
    og_type = models.CharField(max_length=50, default='website', help_text="article, website, etc.")
    
    # Twitter Card tags
    twitter_card = models.CharField(max_length=50, default='summary_large_image', help_text="summary, summary_large_image")
    twitter_title = models.CharField(max_length=70, blank=True, help_text="Twitter title")
    twitter_description = models.CharField(max_length=200, blank=True, help_text="Twitter description")
    twitter_image = models.ImageField(upload_to='seo/', blank=True, null=True, help_text="Twitter image (1024x512px)")
    twitter_image_url = models.URLField(blank=True, help_text="External Twitter image URL")
    
    # Additional SEO
    canonical_url = models.URLField(blank=True, help_text="Canonical URL to prevent duplicate content")
    robots_directive = models.CharField(max_length=100, default='index, follow', help_text="index,follow / noindex,nofollow")
    
    # Schema.org structured data
    schema_type = models.CharField(max_length=50, blank=True, help_text="WebPage, Organization, Service, etc.")
    schema_data = models.JSONField(default=dict, help_text="Structured data JSON-LD")
    
    # Performance
    focus_keyword = models.CharField(max_length=100, blank=True, help_text="Primary keyword to optimize for")
    secondary_keywords = models.TextField(blank=True, help_text="Secondary keywords (comma-separated)")
    
    # Status
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['page_type']
        verbose_name = "SEO Meta Tags"
        verbose_name_plural = "SEO Meta Tags"
        
    def __str__(self):
        return f"SEO: {self.get_page_type_display()}"
    
    def get_schema_json(self):
        """Return JSON-LD structured data"""
        if self.schema_data:
            return self.schema_data
        return {}


class ContentSEOAnalysis(models.Model):
    """SEO analysis and optimization suggestions for content"""
    CONTENT_TYPES = [
        ('project', 'Project'),
        ('blog', 'Blog Post'),
        ('service', 'Service'),
        ('page', 'Page Content'),
        ('case_study', 'Case Study'),
    ]
    
    OPTIMIZATION_STATUS = [
        ('excellent', 'Excellent (90-100%)'),
        ('good', 'Good (70-89%)'),
        ('fair', 'Fair (50-69%)'),
        ('poor', 'Poor (0-49%)'),
    ]
    
    # Content reference
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    object_id = models.PositiveIntegerField()
    content_title = models.CharField(max_length=200)
    content_url = models.CharField(max_length=500, blank=True)
    
    # SEO Analysis Scores
    overall_score = models.PositiveIntegerField(default=0, help_text="Overall SEO score (0-100)")
    optimization_status = models.CharField(max_length=20, choices=OPTIMIZATION_STATUS, default='poor')
    
    # Individual metrics
    title_score = models.PositiveIntegerField(default=0)
    meta_description_score = models.PositiveIntegerField(default=0)
    keyword_density_score = models.PositiveIntegerField(default=0)
    content_length_score = models.PositiveIntegerField(default=0)
    heading_structure_score = models.PositiveIntegerField(default=0)
    image_alt_score = models.PositiveIntegerField(default=0)
    internal_links_score = models.PositiveIntegerField(default=0)
    external_links_score = models.PositiveIntegerField(default=0)
    
    # Keyword analysis
    focus_keyword = models.CharField(max_length=100, blank=True)
    keyword_density = models.FloatField(default=0.0, help_text="Keyword density percentage")
    keyword_positions = models.JSONField(default=list, help_text="Keyword positions in content")
    
    # Content metrics
    word_count = models.PositiveIntegerField(default=0)
    reading_time = models.PositiveIntegerField(default=0, help_text="Estimated reading time in minutes")
    flesch_reading_score = models.FloatField(default=0.0, help_text="Readability score")
    
    # Issues and suggestions
    issues_found = models.JSONField(default=list, help_text="List of SEO issues")
    suggestions = models.JSONField(default=list, help_text="Optimization suggestions")
    
    # Analysis data
    last_analyzed = models.DateTimeField(auto_now=True)
    analysis_data = models.JSONField(default=dict, help_text="Detailed analysis data")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-last_analyzed']
        verbose_name = "Content SEO Analysis"
        verbose_name_plural = "Content SEO Analysis"
        unique_together = ['content_type', 'object_id']
        
    def __str__(self):
        return f"SEO Analysis: {self.content_title} ({self.overall_score}%)"


class SEOSettings(models.Model):
    """Global SEO settings and configuration"""
    # Website basic info
    site_name = models.CharField(max_length=200, default="site gen it")
    site_tagline = models.CharField(max_length=300, blank=True)
    default_meta_description = models.CharField(max_length=160, help_text="Default meta description")
    
    # Contact and location
    business_name = models.CharField(max_length=200)
    business_type = models.CharField(max_length=100, default="Web Development Agency")
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    
    # Geographic targeting
    country = models.CharField(max_length=100, blank=True)
    region = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    
    # Social media profiles for schema
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    
    # Analytics and tracking
    google_analytics_id = models.CharField(max_length=50, blank=True, help_text="GA4 Measurement ID")
    google_tag_manager_id = models.CharField(max_length=50, blank=True)
    google_search_console_verification = models.CharField(max_length=100, blank=True)
    bing_webmaster_verification = models.CharField(max_length=100, blank=True)
    facebook_pixel_id = models.CharField(max_length=50, blank=True)
    
    # Advanced SEO
    default_robots_directive = models.CharField(max_length=100, default='index, follow')
    enable_breadcrumbs = models.BooleanField(default=True)
    enable_schema_markup = models.BooleanField(default=True)
    enable_open_graph = models.BooleanField(default=True)
    enable_twitter_cards = models.BooleanField(default=True)
    
    # Performance
    enable_lazy_loading = models.BooleanField(default=True)
    enable_image_optimization = models.BooleanField(default=True)
    enable_minification = models.BooleanField(default=True)
    
    # Custom settings
    custom_head_tags = models.TextField(blank=True, help_text="Custom HTML for <head> section")
    custom_footer_scripts = models.TextField(blank=True, help_text="Custom scripts before </body>")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "SEO Settings"
        verbose_name_plural = "SEO Settings"
        
    def __str__(self):
        return f"SEO Settings - {self.site_name}"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and SEOSettings.objects.exists():
            raise ValidationError('Only one SEO Settings instance is allowed')
        super().save(*args, **kwargs)


class SitemapURL(models.Model):
    """URLs to include in XML sitemap"""
    CHANGE_FREQUENCY = [
        ('always', 'Always'),
        ('hourly', 'Hourly'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
        ('never', 'Never'),
    ]
    
    PRIORITY_CHOICES = [
        ('1.0', 'Highest (1.0)'),
        ('0.9', 'Very High (0.9)'),
        ('0.8', 'High (0.8)'),
        ('0.7', 'Above Normal (0.7)'),
        ('0.6', 'Normal (0.6)'),
        ('0.5', 'Below Normal (0.5)'),
        ('0.4', 'Low (0.4)'),
        ('0.3', 'Very Low (0.3)'),
        ('0.2', 'Minimal (0.2)'),
        ('0.1', 'Lowest (0.1)'),
    ]
    
    # URL information
    url_path = models.CharField(max_length=500, unique=True, help_text="URL path (e.g., /about, /services)")
    full_url = models.URLField(blank=True, help_text="Full URL (auto-generated)")
    
    # SEO attributes
    priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES, default='0.6')
    change_frequency = models.CharField(max_length=10, choices=CHANGE_FREQUENCY, default='weekly')
    
    # Dates
    last_modified = models.DateTimeField(auto_now=True)
    
    # Settings
    is_active = models.BooleanField(default=True)
    is_auto_generated = models.BooleanField(default=False, help_text="Auto-generated from content")
    
    # Content reference (optional)
    content_type = models.CharField(max_length=20, blank=True)
    object_id = models.PositiveIntegerField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-priority', 'url_path']
        verbose_name = "Sitemap URL"
        verbose_name_plural = "Sitemap URLs"
        
    def __str__(self):
        return f"{self.url_path} (Priority: {self.priority})"


class RedirectRule(models.Model):
    """301/302 redirect rules for SEO"""
    REDIRECT_TYPES = [
        ('301', '301 Permanent'),
        ('302', '302 Temporary'),
        ('307', '307 Temporary'),
        ('308', '308 Permanent'),
    ]
    
    # Redirect information
    source_url = models.CharField(max_length=500, unique=True, help_text="Source URL path")
    destination_url = models.CharField(max_length=500, help_text="Destination URL path")
    redirect_type = models.CharField(max_length=3, choices=REDIRECT_TYPES, default='301')
    
    # Metadata
    description = models.TextField(blank=True, help_text="Why this redirect exists")
    
    # Status
    is_active = models.BooleanField(default=True)
    hit_count = models.PositiveIntegerField(default=0, help_text="Number of times used")
    
    # Dates
    last_used = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-hit_count', 'source_url']
        verbose_name = "Redirect Rule"
        verbose_name_plural = "Redirect Rules"
        
    def __str__(self):
        return f"{self.source_url} → {self.destination_url} ({self.redirect_type})"


class RobotsTxt(models.Model):
    """Robots.txt configuration"""
    # Content
    content = models.TextField(default="User-agent: *\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: /sitemap.xml", help_text="Robots.txt content")
    
    # Status
    is_active = models.BooleanField(default=True)
    
    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Robots.txt"
        verbose_name_plural = "Robots.txt"
        
    def __str__(self):
        return "Robots.txt Configuration"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and RobotsTxt.objects.exists():
            raise ValidationError('Only one Robots.txt instance is allowed')
        super().save(*args, **kwargs)
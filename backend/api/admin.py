from django.contrib import admin
from .models import Project, Testimonial, ContactMessage, Service, UserProfile

# Basic admin registrations for main models
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'year', 'is_featured', 'created_at']
    list_filter = ['category', 'is_featured', 'created_at']
    search_fields = ['title', 'description', 'client_name']
    list_editable = ['is_featured']

class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'rating', 'is_featured', 'created_at']
    list_filter = ['rating', 'is_featured', 'created_at']
    search_fields = ['name', 'company', 'text']

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']

class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'price_range', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'description']

# Register models with the default admin site
admin.site.register(Project, ProjectAdmin)
admin.site.register(Testimonial, TestimonialAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(UserProfile)

# Configure the admin site
admin.site.site_header = 'Digital Agency CMS Administration'
admin.site.site_title = 'Digital Agency CMS Admin'
admin.site.index_title = 'Welcome to Digital Agency Dashboard'
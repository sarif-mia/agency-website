from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


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


class EmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Email verification for {self.user.email}"
    
    @property
    def is_expired(self):
        """Check if token is expired (24 hours)"""
        from datetime import timedelta
        return timezone.now() > self.created_at + timedelta(hours=24)
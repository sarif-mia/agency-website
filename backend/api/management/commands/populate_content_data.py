from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from datetime import date, timedelta
from api.models import (
    NavigationMenu, SubMenuItem, PageContent, SectionContent, CompanyInfo,
    TeamMember, JobPosition, FeatureFlag, SiteSettings
)


class Command(BaseCommand):
    help = 'Populate the database with sample content management data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing content data before populating',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing content data...')
            NavigationMenu.objects.all().delete()
            SubMenuItem.objects.all().delete()
            PageContent.objects.all().delete()
            SectionContent.objects.all().delete()
            CompanyInfo.objects.all().delete()
            TeamMember.objects.all().delete()
            JobPosition.objects.all().delete()
            FeatureFlag.objects.all().delete()
            SiteSettings.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Existing data cleared.'))

        self.stdout.write('Populating content management data...')

        # Create Company Info
        self.create_company_info()
        
        # Create Site Settings
        self.create_site_settings()
        
        # Create Navigation Menus
        self.create_navigation_menus()
        
        # Create Page Contents
        self.create_page_contents()
        
        # Create Team Members
        self.create_team_members()
        
        # Create Job Positions
        self.create_job_positions()
        
        # Create Feature Flags
        self.create_feature_flags()

        self.stdout.write(self.style.SUCCESS('Successfully populated content management data!'))

    def create_company_info(self):
        company_info = CompanyInfo.objects.create(
            company_name="site gen it",
            tagline="Your Creative Digital Partner",
            description="We are a cutting-edge site gen it specializing in creating exceptional digital experiences. Our team of experts combines creativity with technology to deliver innovative solutions that drive business growth and exceed client expectations.",
            email="info@sitegenit.com",
            phone="+1 (555) 123-4567",
            address="123 Innovation Street, Tech City, TC 12345",
            business_hours="Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
            facebook_url="https://facebook.com/sitegenit",
            twitter_url="https://twitter.com/sitegenit",
            linkedin_url="https://linkedin.com/company/sitegenit",
            instagram_url="https://instagram.com/sitegenit",
            youtube_url="https://youtube.com/sitegenit",
            meta_keywords="site gen it, web development, mobile apps, branding, marketing",
            meta_description="Professional site gen it offering web development, mobile apps, branding, and digital marketing services."
        )
        self.stdout.write(f'Created company info: {company_info.company_name}')

    def create_site_settings(self):
        site_settings = SiteSettings.objects.create(
            site_name="site gen it",
            site_description="Your Creative Digital Partner - Creating exceptional digital experiences",
            maintenance_mode=False,
            contact_email="contact@sitegenit.com",
            support_email="support@sitegenit.com",
            google_analytics_id="G-XXXXXXXXXX",
            facebook_pixel_id="",
            primary_color="#00f5ff",
            secondary_color="#9966ff"
        )
        self.stdout.write(f'Created site settings: {site_settings.site_name}')

    def create_navigation_menus(self):
        # Header Menu Items
        header_menus = [
            {"name": "Home", "slug": "home", "url": "/", "order": 1},
            {"name": "About", "slug": "about", "url": "#about", "order": 2},
            {"name": "Services", "slug": "services", "url": "#services", "order": 3, "has_submenu": True},
            {"name": "Portfolio", "slug": "portfolio", "url": "#portfolio", "order": 4},
            {"name": "Team", "slug": "team", "url": "/our-team", "order": 5},
            {"name": "Blog", "slug": "blog", "url": "/blog", "order": 6},
            {"name": "Contact", "slug": "contact", "url": "#contact", "order": 7},
        ]

        for menu_data in header_menus:
            menu = NavigationMenu.objects.create(
                menu_type='header',
                icon='home' if menu_data['slug'] == 'home' else menu_data['slug'],
                **menu_data
            )
            
            # Add submenu items for Services
            if menu_data['slug'] == 'services':
                submenu_items = [
                    {"name": "Web Development", "url": "#services", "icon": "code", "order": 1},
                    {"name": "Mobile Apps", "url": "#services", "icon": "smartphone", "order": 2},
                    {"name": "UI/UX Design", "url": "#services", "icon": "palette", "order": 3},
                    {"name": "Digital Marketing", "url": "#services", "icon": "trending-up", "order": 4},
                    {"name": "Branding", "url": "#services", "icon": "star", "order": 5},
                    {"name": "Consulting", "url": "#services", "icon": "lightbulb", "order": 6},
                ]
                
                for submenu_data in submenu_items:
                    SubMenuItem.objects.create(
                        parent_menu=menu,
                        description=f"Professional {submenu_data['name'].lower()} services",
                        **submenu_data
                    )

        # Footer Menu Items
        footer_menus = [
            # Services Column
            {"name": "Services", "slug": "footer-services", "order": 1, "has_submenu": True},
            # Company Column  
            {"name": "Company", "slug": "footer-company", "order": 2, "has_submenu": True},
            # Resources Column
            {"name": "Resources", "slug": "footer-resources", "order": 3, "has_submenu": True},
            # Quick Links Column
            {"name": "Quick Links", "slug": "footer-quick-links", "order": 4, "has_submenu": True},
        ]

        for menu_data in footer_menus:
            menu = NavigationMenu.objects.create(
                menu_type='footer',
                **menu_data
            )
            
            # Add submenu items for each footer section
            submenu_data = {
                'footer-services': [
                    {"name": "Web Development", "url": "#services", "order": 1},
                    {"name": "Mobile Development", "url": "#services", "order": 2},
                    {"name": "UI/UX Design", "url": "#services", "order": 3},
                    {"name": "Digital Marketing", "url": "#services", "order": 4},
                    {"name": "SEO Optimization", "url": "#services", "order": 5},
                    {"name": "Branding & Identity", "url": "#services", "order": 6},
                ],
                'footer-company': [
                    {"name": "About Us", "url": "#about", "order": 1},
                    {"name": "Our Team", "url": "/our-team", "order": 2},
                    {"name": "Our Process", "url": "#process", "order": 3},
                    {"name": "Portfolio", "url": "#portfolio", "order": 4},
                    {"name": "Testimonials", "url": "#testimonials", "order": 5},
                    {"name": "Careers", "url": "/careers", "order": 6},
                ],
                'footer-resources': [
                    {"name": "Blog", "url": "/blog", "order": 1},
                    {"name": "Help Center", "url": "/help", "order": 2},
                    {"name": "Case Studies", "url": "/case-studies", "order": 3},
                    {"name": "Documentation", "url": "/docs", "order": 4},
                    {"name": "API Reference", "url": "/api", "order": 5},
                    {"name": "Downloads", "url": "/downloads", "order": 6},
                ],
                'footer-quick-links': [
                    {"name": "Get Quote", "url": "/quote", "order": 1},
                    {"name": "Contact Us", "url": "#contact", "order": 2},
                    {"name": "Schedule Meeting", "url": "/meeting", "order": 3},
                    {"name": "Support", "url": "/support", "order": 4},
                    {"name": "Privacy Policy", "url": "/privacy", "order": 5},
                    {"name": "Terms of Service", "url": "/terms", "order": 6},
                ],
            }
            
            if menu_data['slug'] in submenu_data:
                for submenu in submenu_data[menu_data['slug']]:
                    SubMenuItem.objects.create(
                        parent_menu=menu,
                        **submenu
                    )

        self.stdout.write('Created navigation menus with submenu items')

    def create_page_contents(self):
        pages_data = [
            {
                "page_type": "home",
                "title": "site gen it - Your Creative Partner",
                "subtitle": "Transform your ideas into extraordinary digital experiences",
                "meta_description": "Professional site gen it offering web development, mobile apps, and digital marketing services.",
                "hero_title": "We Create Digital Experiences",
                "hero_subtitle": "Transform your ideas into extraordinary digital experiences with our cutting-edge solutions.",
                "hero_button_text": "Start Your Project",
                "hero_button_url": "/quote",
                "content": "<p>Welcome to our site gen it where creativity meets technology.</p>"
            },
            {
                "page_type": "about",
                "title": "About site gen it",
                "subtitle": "Your trusted partner in digital transformation",
                "meta_description": "Learn about our site gen it, our team, and our commitment to delivering exceptional results.",
                "content": "<p>We are a team of passionate digital experts committed to delivering exceptional results.</p>"
            },
            {
                "page_type": "services",
                "title": "Our Services",
                "subtitle": "Comprehensive digital solutions for your business",
                "meta_description": "Explore our comprehensive range of digital services including web development, mobile apps, and more.",
                "content": "<p>Discover our full range of digital services designed to grow your business.</p>"
            },
            {
                "page_type": "team",
                "title": "Our Team",
                "subtitle": "Meet the experts behind our success",
                "meta_description": "Meet our talented team of developers, designers, and digital strategists.",
                "content": "<p>Our diverse team brings together expertise from various fields to deliver exceptional results.</p>"
            },
            {
                "page_type": "careers",
                "title": "Careers at site gen it",
                "subtitle": "Join our team and shape the future of digital innovation",
                "meta_description": "Explore career opportunities at site gen it and join our team of creative professionals.",
                "hero_title": "Join Our Team",
                "hero_subtitle": "Be part of something amazing and help us create the future of digital experiences.",
                "hero_button_text": "View Open Positions",
                "hero_button_url": "#jobs",
                "content": "<p>We're always looking for talented individuals to join our growing team.</p>"
            },
            {
                "page_type": "contact",
                "title": "Contact Us",
                "subtitle": "Get in touch with our team",
                "meta_description": "Contact site gen it for your next project. We're here to help bring your ideas to life.",
                "content": "<p>Ready to start your project? Get in touch with us today.</p>"
            }
        ]

        for page_data in pages_data:
            PageContent.objects.create(**page_data)

        self.stdout.write('Created page contents')

    def create_team_members(self):
        team_members = [
            {
                "name": "Sarah Johnson",
                "position": "CEO & Founder",
                "department": "leadership",
                "bio": "Sarah founded site gen it with a vision to bridge the gap between creative design and cutting-edge technology. With over 10 years of experience in digital strategy, she leads our team with passion and innovation.",
                "image_url": "https://images.unsplash.com/photo-1494790108755-2616b9bfc8bd?w=300&h=300&fit=crop&crop=face",
                "years_experience": 10,
                "skills": ["Strategic Planning", "Team Leadership", "Business Development", "Digital Strategy"],
                "email": "sarah@sitegenit.com",
                "linkedin_url": "https://linkedin.com/in/sarahjohnson",
                "is_featured": True,
                "order": 1
            },
            {
                "name": "Michael Chen",
                "position": "CTO",
                "department": "leadership",
                "bio": "Michael brings technical excellence and architectural expertise to every project. His deep understanding of emerging technologies helps us stay ahead of the curve.",
                "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                "years_experience": 12,
                "skills": ["System Architecture", "Cloud Computing", "DevOps", "Technology Strategy"],
                "email": "michael@sitegenit.com",
                "linkedin_url": "https://linkedin.com/in/michaelchen",
                "github_url": "https://github.com/michaelchen",
                "is_featured": True,
                "order": 2
            },
            {
                "name": "Emily Rodriguez",
                "position": "Lead Designer",
                "department": "design",
                "bio": "Emily creates stunning visual experiences that captivate users and drive engagement. Her design philosophy centers on user-centric solutions that are both beautiful and functional.",
                "image_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
                "years_experience": 8,
                "skills": ["UI/UX Design", "Brand Identity", "Prototyping", "Design Systems"],
                "email": "emily@sitegenit.com",
                "linkedin_url": "https://linkedin.com/in/emilyrodriguez",
                "is_featured": True,
                "order": 3
            },
            {
                "name": "David Thompson",
                "position": "Senior Developer",
                "department": "development",
                "bio": "David is our full-stack development expert who turns complex ideas into robust, scalable applications. His attention to detail and code quality is unmatched.",
                "image_url": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
                "years_experience": 9,
                "skills": ["React", "Node.js", "Python", "Database Design", "API Development"],
                "email": "david@sitegenit.com",
                "linkedin_url": "https://linkedin.com/in/davidthompson",
                "github_url": "https://github.com/davidthompson",
                "is_featured": True,
                "order": 4
            },
            {
                "name": "Lisa Wang",
                "position": "Marketing Director",
                "department": "marketing",
                "bio": "Lisa drives our digital marketing strategies and helps our clients achieve exceptional growth through data-driven campaigns and creative storytelling.",
                "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
                "years_experience": 7,
                "skills": ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
                "email": "lisa@sitegenit.com",
                "linkedin_url": "https://linkedin.com/in/lisawang",
                "order": 5
            },
            {
                "name": "James Miller",
                "position": "Mobile Developer",
                "department": "development",
                "bio": "James specializes in creating native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
                "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
                "years_experience": 6,
                "skills": ["React Native", "Flutter", "iOS", "Android", "Mobile UX"],
                "email": "james@sitegenit.com",
                "github_url": "https://github.com/jamesmiller",
                "order": 6
            }
        ]

        for member_data in team_members:
            TeamMember.objects.create(**member_data)

        self.stdout.write('Created team members')

    def create_job_positions(self):
        job_positions = [
            {
                "title": "Senior React Developer",
                "department": "Development",
                "job_type": "full-time",
                "experience_level": "senior",
                "location": "Remote / New York",
                "description": "We're looking for a Senior React Developer to join our growing development team. You'll be responsible for building scalable web applications and mentoring junior developers.",
                "requirements": [
                    "5+ years of experience with React and JavaScript",
                    "Strong understanding of modern JavaScript (ES6+)",
                    "Experience with state management (Redux, Context API)",
                    "Knowledge of testing frameworks (Jest, React Testing Library)",
                    "Experience with TypeScript",
                    "Understanding of REST APIs and GraphQL",
                    "Bachelor's degree in Computer Science or equivalent"
                ],
                "responsibilities": [
                    "Develop and maintain React-based web applications",
                    "Collaborate with designers and product managers",
                    "Write clean, maintainable, and testable code",
                    "Mentor junior developers and conduct code reviews",
                    "Participate in technical planning and architecture decisions",
                    "Stay up-to-date with React ecosystem and best practices"
                ],
                "benefits": [
                    "Competitive salary ($120k - $160k)",
                    "Health, dental, and vision insurance",
                    "401(k) with company matching",
                    "Flexible work schedule",
                    "Remote work options",
                    "Professional development budget",
                    "Unlimited PTO",
                    "Latest equipment and tools"
                ],
                "salary_min": 120000,
                "salary_max": 160000,
                "is_featured": True,
                "application_deadline": date.today() + timedelta(days=30)
            },
            {
                "title": "UI/UX Designer",
                "department": "Design",
                "job_type": "full-time",
                "experience_level": "mid",
                "location": "Remote / San Francisco",
                "description": "Join our creative team as a UI/UX Designer and help create amazing user experiences for our clients' digital products.",
                "requirements": [
                    "3+ years of UI/UX design experience",
                    "Proficiency in Figma, Sketch, or Adobe Creative Suite",
                    "Strong portfolio showcasing web and mobile designs",
                    "Understanding of user-centered design principles",
                    "Experience with prototyping and wireframing",
                    "Knowledge of HTML/CSS basics",
                    "Excellent communication and collaboration skills"
                ],
                "responsibilities": [
                    "Create user-centered designs for web and mobile applications",
                    "Develop wireframes, prototypes, and user flows",
                    "Conduct user research and usability testing",
                    "Collaborate with developers to ensure design implementation",
                    "Maintain design systems and style guides",
                    "Present design concepts to clients and stakeholders"
                ],
                "benefits": [
                    "Competitive salary ($80k - $110k)",
                    "Creative freedom and autonomy",
                    "Health and wellness benefits",
                    "Remote work flexibility",
                    "Design tools and software licenses",
                    "Conference and workshop attendance",
                    "Collaborative team environment"
                ],
                "salary_min": 80000,
                "salary_max": 110000,
                "is_featured": True,
                "application_deadline": date.today() + timedelta(days=25)
            },
            {
                "title": "Digital Marketing Specialist",
                "department": "Marketing",
                "job_type": "full-time",
                "experience_level": "mid",
                "location": "Remote / Chicago",
                "description": "We're seeking a Digital Marketing Specialist to develop and execute marketing strategies that drive growth for our agency and clients.",
                "requirements": [
                    "3+ years of digital marketing experience",
                    "Experience with Google Ads, Facebook Ads, LinkedIn Ads",
                    "Knowledge of SEO/SEM best practices",
                    "Analytics tools proficiency (Google Analytics, etc.)",
                    "Content marketing and social media experience",
                    "Email marketing platform experience",
                    "Strong analytical and reporting skills"
                ],
                "responsibilities": [
                    "Develop and execute digital marketing campaigns",
                    "Manage social media accounts and content calendar",
                    "Optimize websites for search engines (SEO)",
                    "Create and manage paid advertising campaigns",
                    "Analyze campaign performance and provide insights",
                    "Collaborate with design team on marketing materials"
                ],
                "benefits": [
                    "Competitive salary ($60k - $85k)",
                    "Performance-based bonuses",
                    "Marketing tools and platforms access",
                    "Professional development opportunities",
                    "Flexible work arrangements",
                    "Health and dental insurance",
                    "Growth potential within the company"
                ],
                "salary_min": 60000,
                "salary_max": 85000,
                "application_deadline": date.today() + timedelta(days=20)
            },
            {
                "title": "DevOps Engineer",
                "department": "Development",
                "job_type": "full-time",
                "experience_level": "senior",
                "location": "Remote / Austin",
                "description": "Looking for a DevOps Engineer to help us scale our infrastructure and improve our deployment processes.",
                "requirements": [
                    "5+ years of DevOps/Infrastructure experience",
                    "Experience with AWS, Docker, Kubernetes",
                    "CI/CD pipeline setup and management",
                    "Infrastructure as Code (Terraform, CloudFormation)",
                    "Monitoring and logging tools experience",
                    "Linux system administration",
                    "Security best practices knowledge"
                ],
                "responsibilities": [
                    "Design and maintain scalable cloud infrastructure",
                    "Implement CI/CD pipelines and automation",
                    "Monitor system performance and reliability",
                    "Ensure security best practices",
                    "Collaborate with development teams",
                    "Optimize costs and resource utilization"
                ],
                "benefits": [
                    "Competitive salary ($130k - $170k)",
                    "Stock options",
                    "Cloud platform credits",
                    "Conference and certification support",
                    "Remote work support",
                    "Health, dental, vision insurance",
                    "Retirement planning"
                ],
                "salary_min": 130000,
                "salary_max": 170000,
                "application_deadline": date.today() + timedelta(days=35)
            }
        ]

        for job_data in job_positions:
            JobPosition.objects.create(**job_data)

        self.stdout.write('Created job positions')

    def create_feature_flags(self):
        feature_flags = [
            {
                "name": "dark_mode",
                "description": "Enable dark mode theme toggle",
                "is_enabled": True
            },
            {
                "name": "new_portfolio_layout",
                "description": "Enable new portfolio grid layout",
                "is_enabled": True
            },
            {
                "name": "chatbot_widget",
                "description": "Enable AI chatbot widget",
                "is_enabled": True
            },
            {
                "name": "newsletter_popup",
                "description": "Enable newsletter subscription popup",
                "is_enabled": False
            },
            {
                "name": "testimonials_video",
                "description": "Enable video testimonials",
                "is_enabled": False
            },
            {
                "name": "blog_comments",
                "description": "Enable blog post comments",
                "is_enabled": True
            },
            {
                "name": "live_chat",
                "description": "Enable live chat support",
                "is_enabled": True
            },
            {
                "name": "maintenance_mode",
                "description": "Enable site maintenance mode",
                "is_enabled": False
            }
        ]

        for flag_data in feature_flags:
            FeatureFlag.objects.create(**flag_data)

        self.stdout.write('Created feature flags')
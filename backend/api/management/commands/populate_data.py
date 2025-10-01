from django.core.management.base import BaseCommand
from django.utils.text import slugify
from api.models import Project, Testimonial, Service, BlogPost, NewsletterSubscriber, CaseStudy
import json


class Command(BaseCommand):
    help = 'Populate database with sample data for the agency website'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to populate sample data...'))

        # Create sample projects
        projects_data = [
            {
                'title': 'E-Commerce Platform',
                'category': 'web',
                'description': 'Modern online shopping experience with advanced features',
                'detailed_description': 'A comprehensive e-commerce solution built with React and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard.',
                'image_url': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
                'technologies': ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
                'year': 2024,
                'client_name': 'TechStore Inc.',
                'is_featured': True
            },
            {
                'title': 'Fitness Tracking App',
                'category': 'mobile',
                'description': 'Cross-platform mobile app with real-time tracking',
                'detailed_description': 'A comprehensive fitness tracking application with features like workout planning, nutrition tracking, social challenges, and AI-powered recommendations.',
                'image_url': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
                'technologies': ['React Native', 'Firebase', 'Machine Learning', 'Redux'],
                'year': 2024,
                'client_name': 'FitLife Studios',
                'is_featured': True
            },
            {
                'title': 'Corporate Website',
                'category': 'web',
                'description': 'Professional website with CMS integration',
                'detailed_description': 'A modern corporate website with custom content management system, SEO optimization, and responsive design for optimal user experience across all devices.',
                'image_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
                'technologies': ['Next.js', 'Strapi', 'PostgreSQL', 'Tailwind CSS'],
                'year': 2024,
                'client_name': 'Global Enterprises'
            },
            {
                'title': 'Restaurant Brand Identity',
                'category': 'branding',
                'description': 'Complete visual identity for fine dining restaurant',
                'detailed_description': 'Comprehensive branding package including logo design, brand guidelines, menu design, packaging, and marketing materials for a premium dining experience.',
                'image_url': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
                'technologies': ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma'],
                'year': 2023,
                'client_name': 'Bella Vista Restaurant'
            },
            {
                'title': 'Digital Marketing Campaign',
                'category': 'marketing',
                'description': 'Multi-channel campaign that increased ROI by 300%',
                'detailed_description': 'Strategic digital marketing campaign utilizing social media, SEO, PPC advertising, and content marketing to dramatically increase brand awareness and conversions.',
                'image_url': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
                'technologies': ['Google Ads', 'Facebook Ads', 'Analytics', 'SEMrush'],
                'year': 2023,
                'client_name': 'GrowthCorp'
            },
            {
                'title': 'Banking Mobile App',
                'category': 'mobile',
                'description': 'Secure banking application with biometric authentication',
                'detailed_description': 'A secure mobile banking application featuring biometric authentication, real-time transactions, budget tracking, and advanced security measures.',
                'image_url': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
                'technologies': ['Flutter', 'Dart', 'Firebase', 'Biometric API'],
                'year': 2024,
                'client_name': 'SecureBank'
            }
        ]

        for project_data in projects_data:
            project_data['slug'] = slugify(project_data['title'])
            project, created = Project.objects.get_or_create(
                slug=project_data['slug'],
                defaults=project_data
            )
            if created:
                self.stdout.write(f'Created project: {project.title}')

        # Create sample testimonials
        testimonials_data = [
            {
                'name': 'Sarah Johnson',
                'position': 'CEO',
                'company': 'TechStart Inc.',
                'text': 'Working with this agency transformed our digital presence completely. Their attention to detail and innovative approach exceeded all our expectations. The team delivered exceptional results on time and within budget.',
                'rating': 5,
                'image_url': 'https://images.unsplash.com/photo-1494790108755-2616b9bfc8bd?w=200&h=200&fit=crop&crop=face',
                'is_featured': True
            },
            {
                'name': 'Michael Chen',
                'position': 'Marketing Director',
                'company': 'GrowthCorp',
                'text': 'The digital marketing campaign they created for us increased our ROI by 300%. Their strategic thinking and execution are unmatched. I highly recommend them to anyone looking to scale their business.',
                'rating': 5,
                'image_url': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
                'is_featured': True
            },
            {
                'name': 'Emily Rodriguez',
                'position': 'Founder',
                'company': 'DesignStudio',
                'text': 'Amazing team! They took our complex requirements and turned them into a beautiful, functional website. The communication throughout the project was excellent, and they were always available for questions.',
                'rating': 5,
                'image_url': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
                'is_featured': True
            },
            {
                'name': 'David Thompson',
                'position': 'CTO',
                'company': 'Innovation Labs',
                'text': 'Their technical expertise is outstanding. They built a scalable mobile app that handles thousands of users seamlessly. The code quality and architecture are top-notch. Definitely our go-to development partner.',
                'rating': 5,
                'image_url': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face'
            },
            {
                'name': 'Lisa Wang',
                'position': 'Brand Manager',
                'company': 'StyleCo',
                'text': 'The branding work they did for us was incredible. They understood our vision perfectly and created a brand identity that truly represents who we are. Our customers love the new look!',
                'rating': 5,
                'image_url': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face'
            }
        ]

        for testimonial_data in testimonials_data:
            testimonial, created = Testimonial.objects.get_or_create(
                name=testimonial_data['name'],
                company=testimonial_data['company'],
                defaults=testimonial_data
            )
            if created:
                self.stdout.write(f'Created testimonial: {testimonial.name}')

        # Create sample services
        services_data = [
            {
                'name': 'Web Development',
                'short_description': 'Custom websites and web applications built with cutting-edge technologies',
                'description': 'We create modern, responsive websites and powerful web applications using the latest technologies like React, Next.js, and Node.js. Our development process ensures optimal performance, security, and user experience.',
                'icon': 'Code',
                'features': ['React & Next.js', 'Node.js Backend', 'Database Design', 'API Development', 'SEO Optimization'],
                'price_range': '$5,000 - $50,000',
                'order': 1
            },
            {
                'name': 'UI/UX Design',
                'short_description': 'Beautiful, intuitive designs that engage users and drive conversions',
                'description': 'Our design team creates stunning user interfaces and experiences that not only look great but also provide intuitive navigation and optimal user journeys. We focus on user research, prototyping, and testing.',
                'icon': 'Palette',
                'features': ['User Research', 'Wireframing', 'Visual Design', 'Prototyping', 'Usability Testing'],
                'price_range': '$3,000 - $25,000',
                'order': 2
            },
            {
                'name': 'Mobile App Development',
                'short_description': 'Native and cross-platform mobile applications',
                'description': 'We develop high-performance mobile applications for iOS and Android platforms using React Native, Flutter, and native technologies. Our apps are designed for optimal performance and user experience.',
                'icon': 'Smartphone',
                'features': ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'App Store Deployment'],
                'price_range': '$10,000 - $100,000',
                'order': 3
            },
            {
                'name': 'Digital Marketing',
                'short_description': 'Comprehensive digital marketing strategies to boost your online presence',
                'description': 'Our marketing experts develop and execute comprehensive digital marketing strategies including SEO, social media marketing, content marketing, and paid advertising to help you reach your target audience.',
                'icon': 'Globe',
                'features': ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'PPC Advertising', 'Analytics & Reporting'],
                'price_range': '$2,000 - $20,000/month',
                'order': 4
            },
            {
                'name': 'Branding & Identity',
                'short_description': 'Complete brand identity design and strategy',
                'description': 'We create compelling brand identities that resonate with your target audience. Our branding services include logo design, brand guidelines, marketing materials, and brand strategy development.',
                'icon': 'Zap',
                'features': ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Brand Strategy', 'Visual Identity'],
                'price_range': '$3,000 - $30,000',
                'order': 5
            },
            {
                'name': 'Consulting & Strategy',
                'short_description': 'Digital transformation and technology consulting',
                'description': 'Our experienced consultants help businesses navigate digital transformation, choose the right technologies, and develop effective digital strategies for growth and success.',
                'icon': 'Rocket',
                'features': ['Digital Strategy', 'Technology Consulting', 'Process Optimization', 'Team Training', 'Growth Planning'],
                'price_range': '$200 - $500/hour',
                'order': 6
            }
        ]

        for service_data in services_data:
            service_data['slug'] = slugify(service_data['name'])
            service, created = Service.objects.get_or_create(
                slug=service_data['slug'],
                defaults=service_data
            )
            if created:
                self.stdout.write(f'Created service: {service.name}')

        # Create sample blog posts
        blog_posts_data = [
            {
                'title': '10 Web Development Trends to Watch in 2024',
                'excerpt': 'Discover the latest trends shaping the future of web development and how they can benefit your business.',
                'content': 'The web development landscape is constantly evolving, and 2024 brings exciting new trends that will shape how we build and interact with websites...',
                'featured_image_url': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
                'tags': ['Web Development', 'Trends', 'Technology', 'Frontend'],
                'is_published': True,
                'is_featured': True,
                'read_time': 8
            },
            {
                'title': 'The Complete Guide to React Performance Optimization',
                'excerpt': 'Learn how to optimize your React applications for better performance and user experience.',
                'content': 'React applications can become slow and unresponsive if not optimized properly. In this comprehensive guide, we will explore various techniques...',
                'featured_image_url': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
                'tags': ['React', 'Performance', 'JavaScript', 'Optimization'],
                'is_published': True,
                'read_time': 12
            },
            {
                'title': 'Building Responsive Designs with CSS Grid and Flexbox',
                'excerpt': 'Master modern CSS layout techniques to create beautiful, responsive web designs.',
                'content': 'CSS Grid and Flexbox are powerful layout systems that have revolutionized how we approach web design...',
                'featured_image_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
                'tags': ['CSS', 'Responsive Design', 'Web Design', 'Layout'],
                'is_published': True,
                'read_time': 6
            }
        ]

        for blog_data in blog_posts_data:
            blog_data['slug'] = slugify(blog_data['title'])
            blog_post, created = BlogPost.objects.get_or_create(
                slug=blog_data['slug'],
                defaults=blog_data
            )
            if created:
                self.stdout.write(f'Created blog post: {blog_post.title}')

        # Create sample newsletter subscribers
        subscribers_data = [
            {'email': 'john@example.com', 'name': 'John Doe'},
            {'email': 'jane@example.com', 'name': 'Jane Smith'},
            {'email': 'mike@example.com', 'name': 'Mike Johnson'},
        ]

        for subscriber_data in subscribers_data:
            subscriber, created = NewsletterSubscriber.objects.get_or_create(
                email=subscriber_data['email'],
                defaults=subscriber_data
            )
            if created:
                self.stdout.write(f'Created newsletter subscriber: {subscriber.email}')

        # Create sample case studies
        case_studies_data = [
            {
                'title': 'E-commerce Platform Transformation for TechGear',
                'client_name': 'TechGear Solutions',
                'industry': 'technology',
                'challenge': 'TechGear, a USA-based electronics retailer, was struggling with their outdated e-commerce platform that couldn\'t handle increasing traffic and had a poor user experience. They needed a modern solution that could scale with their business growth and provide a seamless shopping experience.',
                'solution': 'Our team developed a custom e-commerce platform using React for the frontend and Node.js for the backend. We implemented features like real-time inventory management, personalized product recommendations, and a streamlined checkout process. The platform was designed with mobile-first principles and integrated with multiple payment gateways.',
                'results': 'The new platform resulted in a 120% increase in conversion rates, 70% reduction in page load times, and a 200% increase in mobile transactions. TechGear saw a 40% increase in overall revenue within the first quarter after launch.',
                'featured_image_url': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
                'project_duration': '4 months',
                'technologies_used': ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'Stripe'],
                'project_url': 'https://techgear-demo.example.com',
                'is_featured': True,
                'metrics': {
                    'conversion_rate_increase': '120%',
                    'page_load_reduction': '70%',
                    'revenue_increase': '40%',
                    'mobile_transactions': '200% increase'
                }
            },
            {
                'title': 'Healthcare Portal Development for MediCare Plus',
                'client_name': 'MediCare Plus',
                'industry': 'healthcare',
                'challenge': 'MediCare Plus, a Bangladesh-based healthcare provider, needed a secure patient portal to manage appointments, medical records, and telehealth consultations. They required a solution that complied with healthcare regulations and could handle sensitive patient data.',
                'solution': 'We built a HIPAA-compliant healthcare portal using React for the frontend and Django for the backend. The solution included features like appointment scheduling, secure messaging, telehealth video consultations, and electronic health records management. We implemented robust security measures including end-to-end encryption and multi-factor authentication.',
                'results': 'The portal reduced administrative costs by 35%, increased patient engagement by 80%, and improved appointment scheduling efficiency by 60%. Patient satisfaction scores increased by 45% due to the convenience of online services.',
                'featured_image_url': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
                'project_duration': '6 months',
                'technologies_used': ['React', 'Django', 'PostgreSQL', 'AWS', 'Docker', 'Redis'],
                'project_url': 'https://medicare-demo.example.com',
                'is_featured': True,
                'metrics': {
                    'cost_reduction': '35%',
                    'patient_engagement': '80% increase',
                    'scheduling_efficiency': '60% improvement',
                    'patient_satisfaction': '45% increase'
                }
            },
            {
                'title': 'Financial Dashboard for InvestPro Analytics',
                'client_name': 'InvestPro Analytics',
                'industry': 'finance',
                'challenge': 'InvestPro Analytics, a USA-based fintech company, needed a comprehensive financial dashboard to visualize complex market data for their clients. They required real-time data processing capabilities and customizable reporting features.',
                'solution': 'We developed a powerful financial dashboard using React and D3.js for data visualization, with Python and Django powering the backend. The solution included real-time market data feeds, customizable widgets, advanced charting capabilities, and automated report generation. We implemented WebSocket connections for real-time updates.',
                'results': 'The dashboard increased client retention by 50%, reduced report generation time by 85%, and enabled the processing of 10x more data points than the previous solution. Client onboarding time was reduced by 40% due to the intuitive interface.',
                'featured_image_url': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
                'project_duration': '8 months',
                'technologies_used': ['React', 'Python', 'Django', 'PostgreSQL', 'Redis', 'WebSocket', 'D3.js'],
                'project_url': 'https://investpro-demo.example.com',
                'is_featured': False,
                'metrics': {
                    'client_retention': '50% increase',
                    'report_generation': '85% faster',
                    'data_processing': '10x capacity',
                    'onboarding_time': '40% reduction'
                }
            },
            {
                'title': 'Mobile Banking App for Sonali Bank',
                'client_name': 'Sonali Bank',
                'industry': 'finance',
                'challenge': 'Sonali Bank, one of Bangladesh\'s largest state-owned banks, wanted to digitize their services by launching a mobile banking app. They needed a secure, user-friendly solution that would work on basic smartphones and support local language (Bangla).',
                'solution': 'We developed a cross-platform mobile banking app using Flutter that worked seamlessly on both iOS and Android devices. The app featured Bangla language support, biometric authentication, QR code payments, and offline functionality. We implemented bank-level security with encryption and compliance with Bangladesh Bank regulations.',
                'results': 'The app achieved 500,000 downloads within the first 6 months, with 95% positive user reviews. Transaction volume through the mobile app reached 30% of total bank transactions, significantly reducing branch visits. Customer satisfaction scores improved by 60%.',
                'featured_image_url': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
                'project_duration': '5 months',
                'technologies_used': ['Flutter', 'Dart', 'Firebase', 'Biometric API', 'Docker'],
                'project_url': 'https://sonali-demo.example.com',
                'is_featured': True,
                'metrics': {
                    'downloads': '500,000',
                    'user_reviews': '95% positive',
                    'transaction_volume': '30% of total',
                    'customer_satisfaction': '60% increase'
                }
            },
            {
                'title': 'Educational Platform for Bright Minds Academy',
                'client_name': 'Bright Minds Academy',
                'industry': 'education',
                'challenge': 'Bright Minds Academy, a USA-based online education provider, needed a scalable learning management system to accommodate their growing student base. They required features like course management, progress tracking, and interactive assessments.',
                'solution': 'We built a comprehensive LMS using React for the frontend and Node.js with MongoDB for the backend. The platform included features like video streaming, interactive quizzes, progress dashboards, and certificate generation. We implemented a microservices architecture for scalability and integrated with popular tools like Zoom and Google Classroom.',
                'results': 'The platform now serves over 50,000 students with 99.9% uptime. Course completion rates increased by 40%, and administrative workload decreased by 60%. The system can now handle 10x more concurrent users than the previous solution.',
                'featured_image_url': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop',
                'project_duration': '7 months',
                'technologies_used': ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS', 'Redis'],
                'project_url': 'https://brightminds-demo.example.com',
                'is_featured': False,
                'metrics': {
                    'students_served': '50,000+',
                    'uptime': '99.9%',
                    'completion_rates': '40% increase',
                    'scalability': '10x capacity'
                }
            },
            {
                'title': 'Agricultural Marketplace for Krishi Bazaar',
                'client_name': 'Krishi Bazaar',
                'industry': 'ecommerce',
                'challenge': 'Krishi Bazaar, a Bangladesh-based agricultural marketplace, needed a platform to connect farmers directly with buyers. They required a solution that worked on basic feature phones and supported local languages and payment methods.',
                'solution': 'We developed a lightweight web application optimized for low-end devices with SMS-based functionality for areas with poor internet connectivity. The platform supported Bangla and regional languages, integrated with local mobile payment systems like bKash, and featured real-time price tracking for agricultural commodities.',
                'results': 'The platform connected over 100,000 farmers with buyers, resulting in 25% better prices for farmers on average. Transaction volume reached $2M within the first year, and the platform reduced middleman dependency by 70%. User adoption was 90% in targeted regions.',
                'featured_image_url': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop',
                'project_duration': '6 months',
                'technologies_used': ['React', 'Node.js', 'MongoDB', 'SMS API', 'Progressive Web App'],
                'project_url': 'https://krishibazaar-demo.example.com',
                'is_featured': True,
                'metrics': {
                    'farmers_connected': '100,000+',
                    'price_improvement': '25% average',
                    'transaction_volume': '$2M',
                    'middleman_reduction': '70%'
                }
            }
        ]

        for case_study_data in case_studies_data:
            case_study_data['slug'] = slugify(case_study_data['title'])
            case_study, created = CaseStudy.objects.get_or_create(
                slug=case_study_data['slug'],
                defaults=case_study_data
            )
            if created:
                self.stdout.write(f'Created case study: {case_study.title}')

        self.stdout.write(
            self.style.SUCCESS('Successfully populated database with sample data!')
        )
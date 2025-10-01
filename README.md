# 🌐 Modern Digital Agency Website

A cutting-edge, professional agency website built with React frontend and Django backend, featuring a sophisticated dark theme with vibrant neon accents and fluid animations. Experience seamless navigation, dynamic content, and modern web technologies in action.

## 📅 Recent Updates

### Deployment Fixes (August 2025)
- Fixed Netlify deployment issues by removing conflicting Python dependencies
- Resolved Railway deployment problems with updated configuration files
- Updated Pillow version to 10.4.0 to address compatibility issues
- Improved CORS configuration for better cross-origin support

## ✨ Features

### Frontend Features
- **🎨 Modern Dark Theme Design** - Elegant black interface with cyan/blue neon accents and gradient effects
- **🚀 Dynamic Hero Section** - Auto-changing animated words with 3D floating elements and particles
- **💼 Advanced Portfolio Showcase** - Filterable project grid with category sorting and smooth hover effects
- **🛠️ Interactive Services Display** - Professional service cards with neon glow effects and detailed feature lists
- **⭐ Smart Testimonials Slider** - Auto-playing responsive carousel with client reviews and ratings
- **👥 Our Team Page** - Comprehensive team showcase with member profiles, skills, and social links
- **💼 Careers Page** - Full-featured job listings with application forms and company benefits
- **📞 Advanced Contact System** - Multi-step contact forms with real-time validation
- **📱 Fully Responsive Design** - Optimized for all devices with mobile-first approach
- **🎭 Premium Animations** - Framer Motion powered transitions and micro-interactions
- **🧭 Seamless Navigation** - Smooth scrolling and direct page routing without popups

### Backend Features
- **🔧 Django REST API** - Robust backend with comprehensive endpoints
- **📊 Admin Interface** - Django admin for content management
- **💾 Database Models** - Projects, testimonials, services, blog posts, contacts
- **🔍 Advanced Filtering** - Search and filter capabilities for all content
- **📧 Contact Management** - Email contact form with status tracking
- **📈 Analytics Ready** - Built-in stats and metrics endpoints

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with functional components and hooks
- **Vite 7** - Ultra-fast build tool and development server with HMR
- **Framer Motion 12** - Advanced animations, transitions, and 3D effects
- **Lucide React** - Comprehensive modern icon library
- **React Router DOM 7** - Client-side routing with nested routes
- **CSS-in-JS** - Styled-jsx for component-scoped styling

### Backend
- **Django 5.2** - Python web framework
- **Django REST Framework** - API development
- **SQLite** - Database (easily changeable to PostgreSQL)
- **Django CORS Headers** - Cross-origin resource sharing
- **Pillow** - Image processing

## 🚀 Quick Start

### Prerequisites
- Node.js 20.18+ (20.19+ recommended)
- Python 3.8+
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AGENCY
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   .\\venv\\Scripts\\activate
   
   # On macOS/Linux
   source venv/bin/activate
   
   pip install django djangorestframework django-cors-headers pillow django-filter
   python manage.py makemigrations
   python manage.py migrate
   python manage.py populate_data
   ```

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Start the Development Servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   .\\venv\\Scripts\\activate  # Windows
   python manage.py runserver 8000
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5176 (or available port)
   - Backend API: http://localhost:8000/api
   - Django Admin: http://localhost:8000/admin
   
   **Note**: Vite automatically finds available ports. Check terminal output for exact URL.

## 📁 Project Structure

```
AGENCY/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Hero.jsx          # Hero section with animations
│   │   │   ├── About.jsx         # About us section
│   │   │   ├── Services.jsx      # Services showcase
│   │   │   ├── Portfolio.jsx     # Portfolio gallery
│   │   │   ├── Process.jsx       # Work process timeline
│   │   │   ├── Testimonials.jsx  # Client testimonials
│   │   │   ├── CallToAction.jsx  # CTA sections
│   │   │   └── Footer.jsx        # Footer with navigation
│   │   │   └── ContactForm.jsx   # Contact forms
│   │   ├── pages/           # Page components
│   │   │   ├── OurTeamPage.jsx   # Team members showcase
│   │   │   └── CareersPage.jsx   # Job listings and applications
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Django backend
│   ├── agency_backend/      # Django project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── api/                 # Django app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── management/
│   │       └── commands/
│   │           └── populate_data.py
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/health/` - Health check
- `GET /api/projects/` - List all projects
- `GET /api/projects/featured/` - Featured projects
- `GET /api/services/` - List all services
- `GET /api/testimonials/` - List all testimonials
- `GET /api/testimonials/featured/` - Featured testimonials
- `POST /api/contact/` - Send contact message
- `POST /api/newsletter/subscribe/` - Newsletter subscription
- `GET /api/stats/` - Website statistics

### Admin Endpoints
- `/admin/` - Django admin interface

## 🎨 Design Features

### Color Scheme
- **Primary Background**: `#0a0a0a` (Deep Black)
- **Secondary Background**: `#1a1a1a` (Dark Gray)
- **Gradient Backgrounds**: Multi-layer gradients for depth
- **Accent Colors**: 
  - Cyan: `#00f5ff` (Primary accent)
  - Blue: `#0066ff` (Secondary accent) 
  - Purple: `#9966ff` (Tertiary accent)
  - Gold: `#ffd700` (Star ratings)
- **Text Colors**:
  - Primary: `#ffffff` (White)
  - Secondary: `#b0b0b0` (Light Gray)
  - Muted: `#666666` (Dark Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Animations & Interactions
- **Hero Section**: Auto-changing words with gradient text and 3D floating cubes
- **Cards**: Advanced hover effects with neon glow, scale transforms, and rotation
- **Scroll Animations**: Smooth reveal animations with staggered delays
- **Loading States**: Custom spinners and skeleton screens
- **Particle Effects**: Floating particle backgrounds
- **3D Elements**: CSS transforms for depth and perspective
- **Micro-interactions**: Button hover effects, form validations, and transitions
- **Page Transitions**: Smooth navigation between sections and pages

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Mobile**: < 480px (Small phones)
- **Mobile Large**: 480px - 768px (Large phones)
- **Tablet**: 768px - 1024px (Tablets)
- **Desktop**: > 1024px (Desktops and larger)

Key responsive features:
- **Adaptive Grid Layouts**: CSS Grid with auto-fit and minmax
- **Mobile-Optimized Navigation**: Collapsible menus and touch targets
- **Touch-Friendly Elements**: Large buttons and interactive areas
- **Optimized Image Loading**: Responsive images with proper aspect ratios
- **Content Reflow**: Smart content stacking for smaller screens
- **Performance Optimization**: Reduced animations on mobile for better performance

## 🔧 Configuration

### Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_TITLE=Digital Agency
VITE_NODE_ENV=development
```

**Backend** (`backend/.env`):
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Database Configuration

The project uses SQLite by default. To use PostgreSQL:

1. Install psycopg2: `pip install psycopg2-binary`
2. Update `backend/agency_backend/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'agency_db',
           'USER': 'your_username',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

## 🚀 Deployment

### Recent Improvements (Latest Update)
- **✅ Popup Removal**: Eliminated all popup alerts for seamless user experience
- **🔗 Direct Navigation**: All buttons now navigate directly to relevant content
- **💼 Company Pages**: Added comprehensive Our Team and Careers pages
- **🛠️ Enhanced Routing**: Improved React Router implementation with proper navigation
- **📱 Mobile Optimization**: Better responsive design for all screen sizes
- **⚡ Performance**: Optimized animations and loading for better user experience
- **🌏 Hot Reload**: Vite HMR working perfectly for instant development feedback

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API base URL for production

### Backend (Heroku/DigitalOcean)
1. Install gunicorn: `pip install gunicorn`
2. Create `requirements.txt`: `pip freeze > requirements.txt`
3. Configure production settings
4. Set up environment variables
5. Run migrations: `python manage.py migrate`

## 🔧 Development Workflow

### Getting Started
1. **Clone and Setup**: Follow the Quick Start guide above
2. **Development Server**: Use `npm run dev` (not `npm start` - this is Vite, not Create React App)
3. **Hot Reload**: Changes automatically reflect in the browser
4. **Port Management**: Vite finds available ports automatically (typically 5173, 5174, 5176, etc.)

### Common Commands
```bash
# Frontend Development
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend Development
cd backend
python manage.py runserver           # Start Django server
python manage.py makemigrations      # Create migrations
python manage.py migrate             # Apply migrations
python manage.py populate_data       # Populate sample data
```

### Troubleshooting

#### Common Issues
1. **"Missing script: start"** 
   - **Solution**: Use `npm run dev` instead of `npm start`
   - **Reason**: This project uses Vite, not Create React App

2. **Node.js Version Warning**
   - **Current**: Works with Node.js 20.18.1+
   - **Recommended**: 20.19+ for optimal performance
   - **Solution**: Update Node.js or continue with current version

3. **Port Conflicts**
   - **Vite Auto-Detection**: Automatically finds available ports
   - **Check Terminal**: Look for actual port in terminal output
   - **Manual Port**: Use `--port 3000` flag if needed

4. **Build Tool Issues**
   - **Clear Cache**: `npm run dev -- --force`
   - **Reinstall**: Delete `node_modules` and run `npm install`
   - **Check Vite Config**: Ensure vite.config.js is properly configured

## 🆕 Page Structure

### Main Application (`/`)
- **Hero Section**: Animated intro with call-to-action buttons
- **About Section**: Company overview and values
- **Services Section**: Service offerings with interactive cards
- **Portfolio Section**: Project showcase with filtering
- **Process Section**: Work methodology timeline
- **Testimonials Section**: Client reviews carousel
- **Contact Section**: Contact forms and information

### Dedicated Pages
- **`/our-team`**: Team member profiles with skills and social links
- **`/careers`**: Job listings with application forms and company benefits
- **`/quote`**: Project quote request forms
- **`/all-projects`**: Complete portfolio gallery

### Navigation Features
- **Smooth Scrolling**: Anchor-based navigation within main page
- **Direct Routing**: Button clicks navigate to specific pages
- **Mobile Menu**: Responsive navigation for all screen sizes
- **Footer Links**: Comprehensive site navigation in footer

## 🔍 SEO & Performance

### SEO Optimization
- **Meta Tags**: Proper title, description, and keywords
- **Semantic HTML**: Proper heading hierarchy and structure
- **Alt Text**: Image descriptions for accessibility
- **Open Graph**: Social media sharing optimization

### Performance Features
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Automatic chunking with Vite
- **Image Optimization**: Responsive images with proper formats
- **CSS Optimization**: Scoped styles with styled-jsx
- **Tree Shaking**: Unused code elimination

## 🍎 Browser Support

### Supported Browsers
- **Chrome**: 88+ (Recommended)
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

### Features Requiring Modern Browsers
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6+ JavaScript features
- Fetch API
- CSS backdrop-filter

## 🔨 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

### Design & Development
- **Design Inspiration**: Modern agency websites, dark theme trends, and neon aesthetics
- **UI/UX Patterns**: Contemporary web design principles and user experience best practices
- **Color Theory**: Cyberpunk and modern tech aesthetics

### Libraries & Tools
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icon library
- **Images**: [Unsplash](https://unsplash.com/) - High-quality placeholder images
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Typography**: [Inter](https://rsms.me/inter/) by Rasmus Andersson via Google Fonts
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Framework**: [React](https://reactjs.org/) - User interface library

### Development Resources
- **MDN Web Docs**: CSS Grid, Flexbox, and modern JavaScript
- **React Documentation**: Hooks, components, and best practices
- **Framer Motion Docs**: Animation patterns and techniques
- **CSS Tricks**: Advanced CSS techniques and layouts

## 📞 Support & Contact

### Getting Help
- **Issues**: Create an issue in the repository for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: sitegenit@gmail.com for direct support
- **Documentation**: Check this README and inline code comments

### Response Times
- **Critical Issues**: Within 24 hours
- **General Questions**: Within 48 hours
- **Feature Requests**: Within 1 week

### What to Include in Issues
1. **Environment**: OS, Node.js version, browser
2. **Steps to Reproduce**: Clear, step-by-step instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console Logs**: Any error messages or warnings

---

**💫 Built with ❤️ by the Digital Agency Team**

*This project demonstrates modern web development practices with a focus on user experience, performance, accessibility, and maintainability. Updated with the latest features including seamless navigation, comprehensive team pages, and career opportunities.*

### Project Status
- **✅ Frontend**: Fully functional with all pages complete
- **✅ Backend**: API ready with comprehensive endpoints
- **✅ Responsive**: Mobile-first design implemented
- **✅ Navigation**: Popup-free, direct routing
- **✅ Development**: Hot reload and development tools working
- **🔎 Testing**: Manual testing completed, automated tests pending
- **🚀 Deployment**: Ready for production deployment

### Version Information
- **Last Updated**: December 2024
- **React Version**: 19.1.1
- **Vite Version**: 7.1.2
- **Node.js**: 20.18.1+ supported
- **Browser Support**: Modern browsers (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)

*Keep building amazing experiences! 🚀*
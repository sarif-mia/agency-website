import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Eye, Filter, Search, Calendar, Tag } from 'lucide-react';

const AllProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [projects, setProjects] = useState([]);

  const filters = ['All', 'Web', 'Mobile', 'Branding', 'Marketing', 'E-commerce', 'Design'];
  
  // Extended project data
  const allProjects = [
    {
      id: 1,
      title: 'TechStart E-commerce Platform',
      category: 'E-commerce',
      description: 'Modern online shopping experience with advanced features including AI-powered recommendations, real-time inventory, and seamless checkout process.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      year: '2024',
      client: 'TechStart Inc.',
      duration: '4 months',
      featured: true,
      tags: ['E-commerce', 'AI', 'Payment Gateway']
    },
    {
      id: 2,
      title: 'HealthCare Mobile App',
      category: 'Mobile',
      description: 'Cross-platform healthcare application connecting patients with doctors through video consultations, appointment scheduling, and health tracking.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
      year: '2024',
      client: 'MediCare Solutions',
      duration: '6 months',
      featured: true,
      tags: ['Healthcare', 'Video Chat', 'Mobile']
    },
    {
      id: 3,
      title: 'Financial Dashboard',
      category: 'Web',
      description: 'Comprehensive financial analytics dashboard with real-time data visualization, portfolio management, and investment tracking.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      year: '2024',
      client: 'FinTech Pro',
      duration: '3 months',
      featured: true,
      tags: ['Finance', 'Analytics', 'Dashboard']
    },
    {
      id: 4,
      title: 'Restaurant Brand Identity',
      category: 'Branding',
      description: 'Complete visual identity for fine dining restaurant including logo design, menu design, packaging, and marketing materials.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
      technologies: ['Illustrator', 'Photoshop', 'InDesign', 'Figma'],
      year: '2023',
      client: 'Bella Vista Restaurant',
      duration: '2 months',
      featured: false,
      tags: ['Branding', 'Logo Design', 'Print']
    },
    {
      id: 5,
      title: 'Real Estate Platform',
      category: 'Web',
      description: 'Property listing and management platform with advanced search filters, virtual tours, and mortgage calculator.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Cloudinary'],
      year: '2023',
      client: 'PropertyPro',
      duration: '5 months',
      featured: false,
      tags: ['Real Estate', 'Virtual Tours', 'Search']
    },
    {
      id: 6,
      title: 'Fitness Tracking App',
      category: 'Mobile',
      description: 'Comprehensive fitness application with workout tracking, nutrition logging, progress analytics, and social features.',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      year: '2023',
      client: 'FitLife',
      duration: '4 months',
      featured: false,
      tags: ['Fitness', 'Health', 'Social']
    },
    {
      id: 7,
      title: 'Digital Marketing Campaign',
      category: 'Marketing',
      description: 'Multi-channel digital marketing campaign that increased brand awareness by 250% and ROI by 300% through strategic social media and PPC advertising.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['Google Ads', 'Facebook Ads', 'Analytics', 'HubSpot'],
      year: '2023',
      client: 'GrowthCorp',
      duration: '3 months',
      featured: false,
      tags: ['Marketing', 'PPC', 'Social Media']
    },
    {
      id: 8,
      title: 'Educational Platform',
      category: 'Web',
      description: 'Online learning management system with interactive courses, progress tracking, and certification management.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      technologies: ['React', 'Express.js', 'MongoDB', 'Socket.io'],
      year: '2022',
      client: 'EduTech Solutions',
      duration: '6 months',
      featured: false,
      tags: ['Education', 'LMS', 'Interactive']
    },
    {
      id: 9,
      title: 'SaaS Dashboard Design',
      category: 'Design',
      description: 'Modern SaaS application UI/UX design with focus on user experience, data visualization, and responsive design.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
      technologies: ['Figma', 'Sketch', 'Principle', 'Adobe XD'],
      year: '2022',
      client: 'CloudTech',
      duration: '2 months',
      featured: false,
      tags: ['UI/UX', 'SaaS', 'Dashboard']
    }
  ];

  // Initialize projects
  useEffect(() => {
    setProjects(allProjects);
  }, []);

  // Filter and search projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'featured':
        return b.featured - a.featured;
      default:
        return 0;
    }
  });

  const handleViewProject = (project) => {
    alert(`🚀 Project Details: ${project.title}\n\n📝 Description: ${project.description}\n\n🏷️ Category: ${project.category}\n📅 Year: ${project.year}\n👥 Client: ${project.client}\n⏱️ Duration: ${project.duration}\n⚡ Technologies: ${project.technologies.join(', ')}\n🏷️ Tags: ${project.tags.join(', ')}\n\n✨ This is a demo project showcase. In a real implementation, this would open a detailed project page with more images, case study, and project outcomes.`);
  };

  const handleExternalLink = (project) => {
    const confirmMessage = `🌐 Opening Live Demo for "${project.title}"\n\nThis would normally open the live project website.\nWould you like to see our agency website instead?`;
    if (confirm(confirmMessage)) {
      window.open(window.location.origin, '_blank');
    }
  };

  return (
    <div className="all-projects-page">
      <div className="container">
        <motion.div
          className="back-navigation"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="back-btn">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </motion.div>

        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">Our Projects</h1>
          <p className="page-description">
            Explore our complete portfolio of successful digital projects and client solutions
          </p>
        </motion.header>

        {/* Controls */}
        <motion.div
          className="controls-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-section">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Project Name</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="results-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Showing {sortedProjects.length} of {projects.length} projects</p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="projects-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                layout
              >
                {project.featured && <div className="featured-badge">Featured</div>}
                
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <motion.button
                        className="overlay-btn view-btn"
                        onClick={() => handleViewProject(project)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={20} />
                      </motion.button>
                      <motion.button
                        className="overlay-btn link-btn"
                        onClick={() => handleExternalLink(project)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={20} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="project-category">{project.category}</div>
                  <div className="project-year">{project.year}</div>
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-client">Client: {project.client}</p>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{project.duration}</span>
                    </div>
                    <div className="meta-item">
                      <Tag size={16} />
                      <span>{project.tags.length} tags</span>
                    </div>
                  </div>
                  
                  <div className="project-technologies">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag more">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="project-tags">
                    {project.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {sortedProjects.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3>No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.section
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="cta-card">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's create something amazing together. Get in touch to discuss your vision.</p>
            <div className="cta-buttons">
              <Link to="/quote" className="cta-btn primary">
                Get Started
              </Link>
              <Link to="/#contact" className="cta-btn secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      <style jsx>{`
        .all-projects-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #00f5ff;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 10px 0;
          margin-bottom: 40px;
        }

        .back-btn:hover {
          color: #ffffff;
          transform: translateX(-5px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        .page-description {
          font-size: 1.2rem;
          color: #b0b0b0;
          line-height: 1.6;
        }

        /* Controls */
        .controls-section {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: center;
        }

        .search-bar {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-bar svg {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #00f5ff;
        }

        .search-bar input {
          width: 100%;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 25px;
          padding: 12px 20px 12px 50px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-bar input:focus {
          outline: none;
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
        }

        .filter-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          padding: 8px 16px;
          color: #00f5ff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .filter-btn:hover {
          background: rgba(0, 245, 255, 0.1);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          border-color: transparent;
        }

        .sort-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sort-section label {
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .sort-section select {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          padding: 8px 12px;
          color: #ffffff;
        }

        .results-info {
          margin-bottom: 30px;
          color: #b0b0b0;
          text-align: center;
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .project-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 245, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0, 245, 255, 0.1);
        }

        .project-card.featured {
          border-color: rgba(255, 215, 0, 0.4);
        }

        .featured-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #ffd700, #ff8c00);
          color: #000;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 10;
        }

        .project-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .project-card:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          display: flex;
          gap: 15px;
        }

        .overlay-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #00f5ff;
          background: rgba(0, 245, 255, 0.2);
          color: #00f5ff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .overlay-btn:hover {
          background: #00f5ff;
          color: #000;
        }

        .project-category {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(0, 245, 255, 0.9);
          color: #000;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .project-year {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background: rgba(0, 0, 0, 0.8);
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .project-info {
          padding: 25px;
        }

        .project-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .project-client {
          color: #00f5ff;
          font-size: 0.9rem;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .project-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 15px;
          font-size: 0.95rem;
        }

        .project-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          color: #888;
          font-size: 0.85rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }

        .tech-tag {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .tech-tag.more {
          background: rgba(153, 102, 255, 0.1);
          border-color: rgba(153, 102, 255, 0.3);
          color: #9966ff;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag-badge {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 0.75rem;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #b0b0b0;
        }

        .no-results h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #ffffff;
        }

        /* CTA Section */
        .cta-section {
          margin-bottom: 60px;
        }

        .cta-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .cta-card h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .cta-card p {
          font-size: 1.2rem;
          color: #b0b0b0;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          padding: 15px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
        }

        .cta-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .cta-btn.secondary {
          background: transparent;
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
        }

        .cta-btn.secondary:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
        }

        @media (max-width: 768px) {
          .all-projects-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.5rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .controls-section {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-tabs {
            justify-content: center;
          }

          .cta-card {
            padding: 40px 20px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AllProjectsPage;
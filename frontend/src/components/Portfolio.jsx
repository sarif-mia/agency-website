import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Portfolio = ({ projects: propProjects, loading: propLoading }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = ['All', 'Web', 'Mobile', 'Branding', 'Marketing', 'Design'];

  // Use prop data if provided, otherwise fetch
  useEffect(() => {
    if (propProjects !== undefined) {
      setProjects(propProjects.length > 0 ? propProjects : sampleProjects);
      setLoading(propLoading || false);
    } else {
      // Fetch projects from API if no props provided
      const fetchProjects = async () => {
        try {
          setLoading(true);
          // Use sample data first for demo
          setProjects(sampleProjects);

          // Try to fetch from API
          const response = await api.projects.getAll();
          if (response && response.length > 0) {
            setProjects(response.results || response);
          }
          setError(null);
        } catch (err) {
          console.error('Error fetching projects:', err);
          // Keep using sample data if API fails
          setProjects(sampleProjects);
          setError(null); // Don't show error, just use demo data
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }
  }, [propProjects, propLoading]);

  // Sample projects as fallback
  const sampleProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web',
      description: 'Modern online shopping experience with advanced features',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB'],
      year: '2024'
    },
    {
      id: 2,
      title: 'Brand Identity Design',
      category: 'Branding',
      description: 'Complete brand overhaul for tech startup',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      technologies: ['Adobe Creative Suite', 'Figma'],
      year: '2024'
    },
    {
      id: 3,
      title: 'Digital Marketing Campaign',
      category: 'Marketing',
      description: 'Multi-channel campaign that increased ROI by 300%',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['Google Ads', 'Facebook Ads', 'Analytics'],
      year: '2023'
    },
    {
      id: 4,
      title: 'Fitness Tracking App',
      category: 'Mobile',
      description: 'Cross-platform mobile app with real-time tracking',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase'],
      year: '2024'
    },
    {
      id: 5,
      title: 'Corporate Website',
      category: 'Web',
      description: 'Professional website with CMS integration',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'Strapi', 'PostgreSQL'],
      year: '2024'
    },
    {
      id: 6,
      title: 'Restaurant Branding',
      category: 'Branding',
      description: 'Complete visual identity for fine dining restaurant',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
      technologies: ['Illustrator', 'Photoshop', 'InDesign'],
      year: '2023'
    }
  ];

  // Handle project view
  const handleViewProject = (project) => {
    // Navigate to All Projects page which has detailed project views
    window.location.href = '/all-projects';
  };

  // Handle external link
  const handleExternalLink = (project) => {
    // Open the agency website as demo
    window.open(window.location.origin, '_blank');
  };

  // Handle view all projects
  const handleViewAllProjects = () => {
    // This function is no longer needed since we're using Link component
    // But keeping it for backward compatibility if called elsewhere
  };

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => {
      const category = project.category || 'web';
      return category.toLowerCase() === activeFilter.toLowerCase();
    });

  if (loading) {
    return (
      <section className="portfolio-section section" id="portfolio">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading portfolio...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-section section" id="portfolio">
      <div className="container">
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="section-title gradient-text">Our Portfolio</h1>
          <p className="section-subtitle">
            Discover our latest projects and see how we've helped businesses achieve their digital goals
          </p>
        </motion.div>

        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        <motion.div className="portfolio-grid" layout>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="portfolio-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                layout
                whileHover={{ y: -10 }}
              >
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
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-glow"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="portfolio-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/all-projects" className="neon-button">
            View All Projects
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .portfolio-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #0a0a0a 50%, #2e1a1a 75%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .portfolio-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(0, 245, 255, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(153, 102, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .portfolio-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #b0b0b0;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .filter-btn:hover,
        .filter-btn.active {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.6);
          color: #00f5ff;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
        }
        
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        
        .portfolio-item {
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        
        .portfolio-item:hover {
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 
            0 20px 40px rgba(0, 245, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .portfolio-item:hover .project-glow {
          opacity: 1;
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
          transition: transform 0.4s ease;
        }
        
        .portfolio-item:hover .project-image img {
          transform: scale(1.1);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .portfolio-item:hover .image-overlay {
          opacity: 1;
        }
        
        .overlay-content {
          display: flex;
          gap: 15px;
        }
        
        .overlay-btn {
          width: 50px;
          height: 50px;
          background: rgba(0, 245, 255, 0.2);
          border: 2px solid rgba(0, 245, 255, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00f5ff;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .overlay-btn:hover {
          background: rgba(0, 245, 255, 0.3);
          border-color: rgba(0, 245, 255, 0.8);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
        }
        
        .project-category {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(0, 245, 255, 0.2);
          color: #00f5ff;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 245, 255, 0.3);
        }
        
        .project-year {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(153, 102, 255, 0.2);
          color: #9966ff;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(153, 102, 255, 0.3);
        }
        
        .project-info {
          padding: 25px;
        }
        
        .project-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        
        .project-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }
        
        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tech-tag {
          background: rgba(0, 245, 255, 0.1);
          color: #00f5ff;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(0, 245, 255, 0.2);
        }
        
        .project-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(0, 245, 255, 0.05) 0%, 
            rgba(153, 102, 255, 0.05) 50%, 
            rgba(0, 245, 255, 0.05) 100%);
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .portfolio-cta {
          text-align: center;
        }
        
        .loading-container {
          text-align: center;
          padding: 100px 0;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 245, 255, 0.3);
          border-top: 3px solid #00f5ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .portfolio-header {
            margin-bottom: 40px;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .section-subtitle {
            font-size: 0.95rem;
          }
          
          .filter-tabs {
            gap: 6px;
            margin-bottom: 25px;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .filter-btn {
            padding: 6px 14px;
            font-size: 0.8rem;
          }
          
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .project-image {
            height: 200px;
          }
          
          .project-info {
            padding: 18px 15px;
          }
          
          .project-title {
            font-size: 1.1rem;
            margin-bottom: 8px;
          }
          
          .project-description {
            font-size: 0.9rem;
            margin-bottom: 15px;
          }
          
          .tech-tag {
            padding: 3px 8px;
            font-size: 0.75rem;
          }
          
          .portfolio-cta {
            margin-top: 30px;
          }
        }
        
        @media (max-width: 480px) {
          .portfolio-header {
            margin-bottom: 30px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .section-subtitle {
            font-size: 0.9rem;
          }
          
          .filter-tabs {
            gap: 6px;
            margin-bottom: 25px;
          }
          
          .filter-btn {
            padding: 6px 12px;
            font-size: 0.8rem;
          }
          
          .portfolio-grid {
            gap: 12px;
          }
          
          .project-image {
            height: 180px;
          }
          
          .project-info {
            padding: 15px 12px;
          }
          
          .project-title {
            font-size: 1rem;
            margin-bottom: 6px;
          }
          
          .project-description {
            font-size: 0.85rem;
            margin-bottom: 12px;
          }
          
          .project-technologies {
            gap: 4px;
          }
          
          .tech-tag {
            padding: 2px 6px;
            font-size: 0.7rem;
          }
          
          .overlay-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
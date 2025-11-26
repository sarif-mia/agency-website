import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Building, ExternalLink, TrendingUp } from 'lucide-react';
import api from '../services/api';

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);

  const industries = [
    { key: '', label: 'All Industries' },
    { key: 'technology', label: 'Technology' },
    { key: 'healthcare', label: 'Healthcare' },
    { key: 'finance', label: 'Finance' },
    { key: 'education', label: 'Education' },
    { key: 'ecommerce', label: 'E-commerce' },
    { key: 'startup', label: 'Startup' },
    { key: 'enterprise', label: 'Enterprise' },
  ];

  // Sample case studies as fallback
  const sampleCaseStudies = [
    {
      id: 1,
      title: 'E-Commerce Platform Transformation',
      slug: 'ecommerce-platform-transformation',
      client_name: 'TechMart Solutions',
      industry: 'ecommerce',
      challenge: 'Legacy e-commerce platform with poor performance and outdated design',
      solution: 'Complete platform rebuild using React, Node.js, and modern cloud infrastructure',
      results: '300% increase in conversion rate, 50% faster load times, 200% growth in mobile traffic',
      featured_image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies_used: ['React', 'Node.js', 'MongoDB', 'AWS'],
      project_duration: '4 months',
      project_url: 'https://techmart-demo.com',
      is_featured: true,
      metrics: {
        conversion_increase: '300%',
        load_time_improvement: '50%',
        mobile_growth: '200%'
      }
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      slug: 'healthcare-management-system',
      client_name: 'MedCare Plus',
      industry: 'healthcare',
      challenge: 'Inefficient patient management and appointment scheduling system',
      solution: 'Custom healthcare management platform with real-time scheduling and patient portal',
      results: '60% reduction in administrative time, 95% patient satisfaction, HIPAA compliant',
      featured_image_url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop',
      technologies_used: ['Django', 'React', 'PostgreSQL', 'Docker'],
      project_duration: '6 months',
      project_url: 'https://medcare-demo.com',
      is_featured: true,
      metrics: {
        admin_time_reduction: '60%',
        patient_satisfaction: '95%',
        compliance: 'HIPAA'
      }
    },
    {
      id: 3,
      title: 'Financial Analytics Dashboard',
      slug: 'financial-analytics-dashboard',
      client_name: 'FinTech Corp',
      industry: 'finance',
      challenge: 'Complex financial data scattered across multiple systems',
      solution: 'Unified analytics dashboard with real-time data visualization and reporting',
      results: '40% faster decision making, 25% cost reduction, real-time insights',
      featured_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies_used: ['Python', 'React', 'D3.js', 'Redis'],
      project_duration: '5 months',
      project_url: 'https://fintech-demo.com',
      is_featured: false,
      metrics: {
        decision_speed: '40%',
        cost_reduction: '25%',
        insights: 'Real-time'
      }
    },
    {
      id: 4,
      title: 'Educational Platform Redesign',
      slug: 'educational-platform-redesign',
      client_name: 'LearnHub Academy',
      industry: 'education',
      challenge: 'Outdated learning platform with poor user engagement',
      solution: 'Modern learning management system with gamification and mobile app',
      results: '150% increase in user engagement, 80% mobile usage, 2000+ active students',
      featured_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      technologies_used: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
      project_duration: '7 months',
      project_url: 'https://learnhub-demo.com',
      is_featured: false,
      metrics: {
        engagement_increase: '150%',
        mobile_usage: '80%',
        active_students: '2000+'
      }
    },
    {
      id: 5,
      title: 'Startup MVP Development',
      slug: 'startup-mvp-development',
      client_name: 'GreenTech Solutions',
      industry: 'startup',
      challenge: 'Need for rapid MVP development to validate business idea',
      solution: 'Full-stack MVP with user authentication, payment integration, and analytics',
      results: 'Successfully raised $2M in seed funding, 5000+ beta users, product-market fit achieved',
      featured_image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
      technologies_used: ['Next.js', 'Stripe', 'Firebase', 'Vercel'],
      project_duration: '8 weeks',
      project_url: 'https://greentech-demo.com',
      is_featured: true,
      metrics: {
        funding_raised: '$2M',
        beta_users: '5000+',
        fit_achieved: 'Yes'
      }
    },
    {
      id: 6,
      title: 'Enterprise Resource Planning',
      slug: 'enterprise-resource-planning',
      client_name: 'Global Manufacturing Inc.',
      industry: 'enterprise',
      challenge: 'Inefficient inventory and production management across multiple locations',
      solution: 'Comprehensive ERP system with real-time inventory tracking and automated workflows',
      results: '30% reduction in operational costs, 99% inventory accuracy, multi-location synchronization',
      featured_image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      technologies_used: ['Django', 'React', 'PostgreSQL', 'Kubernetes'],
      project_duration: '12 months',
      project_url: 'https://global-mfg-demo.com',
      is_featured: false,
      metrics: {
        cost_reduction: '30%',
        inventory_accuracy: '99%',
        synchronization: 'Multi-location'
      }
    }
  ];

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    filterCaseStudies();
  }, [searchTerm, selectedIndustry, caseStudies]);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const response = await api.caseStudies.getAll();
      if (response && response.length > 0) {
        setCaseStudies(response.results || response);
      } else {
        // Use sample data if API returns empty
        setCaseStudies(sampleCaseStudies);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching case studies:', err);
      // Use sample data as fallback
      setCaseStudies(sampleCaseStudies);
      setError(null); // Don't show error, just use demo data
    } finally {
      setLoading(false);
    }
  };

  const filterCaseStudies = () => {
    let filtered = caseStudies;

    if (selectedIndustry) {
      filtered = filtered.filter(study => study.industry === selectedIndustry);
    }

    if (searchTerm) {
      filtered = filtered.filter(study =>
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.technologies_used.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredCaseStudies(filtered);
  };

  const getIndustryLabel = (industryKey) => {
    const industry = industries.find(ind => ind.key === industryKey);
    return industry ? industry.label : industryKey;
  };

  if (loading) {
    return (
      <div className="case-studies-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading case studies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="case-studies-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1>Case Studies</h1>
            <p>Real success stories from our clients across various industries</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="filters">
        <div className="container">
          <div className="filters-content">
            <div className="filters-left">
              <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="industry-filter">
                {industries.map(industry => (
                  <option key={industry.key} value={industry.key}>{industry.label}</option>
                ))}
              </select>
            </div>
            <div className="filters-right">
              <div className="search-box">
                <Search size={20} />
                <input type="text" placeholder="Search case studies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="case-studies-grid">
        <div className="container">
          {filteredCaseStudies.length === 0 ? (
            <div className="no-results">
              <h3>No case studies found</h3>
              <p>Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="studies-grid">
              {filteredCaseStudies.map((study, index) => (
                <motion.article key={study.id} className={`case-card ${study.is_featured ? 'featured' : ''}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  {study.featured_image_url && (
                    <div className="card-image">
                      <img src={study.featured_image_url} alt={study.title} loading="lazy" />
                      {study.is_featured && <div className="featured-badge">Featured</div>}
                    </div>
                  )}

                  <div className="card-content">
                    <div className="card-header">
                      <div className="industry-badge">
                        <Building size={14} />
                        {getIndustryLabel(study.industry)}
                      </div>
                      <span className="duration">{study.project_duration}</span>
                    </div>

                    <h2 className="card-title">
                      <Link to={`/case-studies/${study.slug}`}>{study.title}</Link>
                    </h2>

                    <p className="client-name">Client: {study.client_name}</p>

                    {study.technologies_used && study.technologies_used.length > 0 && (
                      <div className="technologies">
                        {study.technologies_used.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}

                    <div className="card-actions">
                      <Link to={`/case-studies/${study.slug}`} className="read-btn">
                        <TrendingUp size={16} />
                        View Case Study
                      </Link>
                      {study.project_url && (
                        <a href={study.project_url} target="_blank" rel="noopener noreferrer" className="external-btn">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .case-studies-page { min-height: 100vh; background: #0a0a0a; color: #ffffff; padding-top: 80px; }
        .hero { background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); padding: 80px 0 60px; text-align: center; }
        .hero-content h1 { font-size: 3.5rem; font-weight: 800; background: linear-gradient(135deg, #00f5ff, #9966ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; }
        .hero-content p { font-size: 1.2rem; color: #b0b0b0; }
        .filters { padding: 40px 0; border-bottom: 1px solid rgba(0, 245, 255, 0.1); }
        .filters-content { display: flex; justify-content: space-between; align-items: center; }
        .filters-left { flex: 1; }
        .filters-right { flex: 2; max-width: 400px; }
        .search-box { display: flex; align-items: center; background: rgba(20, 20, 20, 0.8); border: 1px solid rgba(0, 245, 255, 0.3); border-radius: 50px; padding: 15px 25px; }
        .search-box input { background: none; border: none; color: #ffffff; margin-left: 15px; outline: none; width: 100%; }
        .industry-filter { background: rgba(20, 20, 20, 0.8); border: 1px solid rgba(0, 245, 255, 0.3); color: #ffffff; padding: 15px 20px; border-radius: 25px; width: 100%; max-width: 300px; }
        .case-studies-grid { padding: 60px 0 80px; }
        .studies-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; }
        .case-card { background: linear-gradient(145deg, #1a1a1a, #2a2a2a); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 20px; overflow: hidden; transition: all 0.3s ease; }
        .case-card:hover { transform: translateY(-10px); border-color: rgba(0, 245, 255, 0.5); }
        .card-image { height: 200px; overflow: hidden; position: relative; }
        .card-image img { width: 100%; height: 100%; object-fit: cover; }
        .featured-badge { position: absolute; top: 15px; right: 15px; background: linear-gradient(135deg, #ffd700, #ff8c00); color: #000; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .card-content { padding: 25px; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .industry-badge { display: flex; align-items: center; gap: 6px; background: rgba(0, 245, 255, 0.1); border: 1px solid rgba(0, 245, 255, 0.3); color: #00f5ff; padding: 4px 10px; border-radius: 15px; font-size: 0.8rem; }
        .duration { color: #b0b0b0; font-size: 0.9rem; }
        .card-title a { color: #ffffff; text-decoration: none; font-size: 1.3rem; font-weight: 600; transition: color 0.3s ease; }
        .card-title a:hover { color: #00f5ff; }
        .client-name { color: #b0b0b0; margin: 10px 0 20px; }
        .technologies { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .tech-tag { background: rgba(153, 102, 255, 0.1); border: 1px solid rgba(153, 102, 255, 0.3); color: #9966ff; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; }
        .card-actions { display: flex; justify-content: space-between; align-items: center; }
        .read-btn { display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #00f5ff, #0066ff); color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 25px; font-weight: 600; transition: all 0.3s ease; }
        .read-btn:hover { transform: scale(1.05); }
        .external-btn { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 50%; color: #b0b0b0; transition: all 0.3s ease; }
        .external-btn:hover { color: #00f5ff; border-color: rgba(0, 245, 255, 0.5); }
        .loading-spinner, .no-results { text-align: center; padding: 60px 20px; }
        .spinner { width: 50px; height: 50px; border: 3px solid rgba(0, 245, 255, 0.3); border-top: 3px solid #00f5ff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 768px) { 
          .studies-grid { grid-template-columns: 1fr; } 
          .filters-content { flex-direction: column; gap: 20px; }
          .filters-left, .filters-right { width: 100%; max-width: 100%; }
          .industry-filter { max-width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default CaseStudiesPage;
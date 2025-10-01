import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Smartphone, Globe, Zap, Rocket } from 'lucide-react';
import api from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  
  // Handle service details
  const handleLearnMore = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };
  
  // Icon mapping
  const iconMap = {
    Code: Code,
    Palette: Palette,
    Smartphone: Smartphone,
    Globe: Globe,
    Zap: Zap,
    Rocket: Rocket
  };
  
  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.services.getAll();
        setServices(response.results || response);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        // Fallback to sample data if API fails
        setServices(sampleServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  
  // Sample services as fallback
  const sampleServices = [
    {
      id: 1,
      icon: 'Code',
      name: 'Web Development',
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience. We create responsive, fast, and secure web solutions.',
      short_description: 'Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.',
      features: ['React & Next.js Development', 'Node.js Backend Solutions', 'Database Design & Integration', 'RESTful API Development', 'Performance Optimization', 'SEO Implementation']
    },
    {
      id: 2,
      icon: 'Palette',
      name: 'UI/UX Design',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that engage users and drive conversions. From wireframes to pixel-perfect interfaces that deliver exceptional user experiences.',
      short_description: 'Beautiful, intuitive designs that engage users and drive conversions. From wireframes to pixel-perfect interfaces.',
      features: ['User Research & Analysis', 'Interactive Prototyping', 'Visual Design Systems', 'Usability Testing', 'Mobile-First Design', 'Accessibility Compliance']
    },
    {
      id: 3,
      icon: 'Smartphone',
      name: 'Mobile Apps',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android devices with optimal performance.',
      short_description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
      features: ['React Native Development', 'Flutter Cross-Platform', 'iOS Native Development', 'Android Native Development', 'App Store Optimization', 'Push Notifications']
    },
    {
      id: 4,
      icon: 'Globe',
      name: 'Digital Marketing',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive qualified traffic that converts into loyal customers.',
      short_description: 'Comprehensive digital marketing strategies to boost your online presence and drive qualified traffic.',
      features: ['SEO Optimization', 'Social Media Management', 'Content Strategy', 'Google Analytics Setup', 'PPC Campaign Management', 'Email Marketing']
    },
    {
      id: 5,
      icon: 'Zap',
      name: 'Performance Optimization',
      title: 'Performance Optimization',
      description: 'Speed up your website and applications with advanced optimization techniques for better user experience and improved search rankings.',
      short_description: 'Speed up your website and applications with advanced optimization techniques for better user experience.',
      features: ['Core Web Vitals Optimization', 'CDN Setup & Configuration', 'Database Performance Tuning', 'Caching Strategies', 'Image Optimization', 'Code Minification']
    },
    {
      id: 6,
      icon: 'Rocket',
      name: 'DevOps & Deployment',
      title: 'DevOps & Deployment',
      description: 'Streamlined deployment processes and infrastructure management for scalable and reliable applications with automated workflows.',
      short_description: 'Streamlined deployment processes and infrastructure management for scalable and reliable applications.',
      features: ['CI/CD Pipeline Setup', 'Cloud Services Management', 'Monitoring & Alerting', 'Security Implementation', 'Auto-scaling Configuration', 'Backup & Recovery']
    }
  ];

  if (loading) {
    return (
      <section className="services-section section" id="services">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="services-section section" id="services">
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="section-title gradient-text">Our Services</h1>
          <p className="section-subtitle">
            We offer a comprehensive suite of digital services to help your business thrive in the modern world
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <motion.div
                key={service.id || index}
                className="service-card"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="service-icon">
                  <IconComponent size={40} />
                  <div className="icon-glow"></div>
                </div>
                
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.short_description || service.description}</p>
                
                <ul className="service-features">
                  {(service.features || []).map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="feature-bullet">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className="service-cta"
                  onClick={() => handleLearnMore(service)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
                
                <div className="card-glow"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Service Details Modal */}
      {showServiceModal && selectedService && (
        <motion.div
          className="service-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowServiceModal(false);
            }
          }}
        >
          <motion.div
            className="service-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h3>{selectedService.name || selectedService.title}</h3>
              <button
                className="close-btn"
                onClick={() => setShowServiceModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="service-detail-icon">
                {React.createElement(iconMap[selectedService.icon] || Code, { size: 60 })}
              </div>
              <p className="service-detail-description">
                {selectedService.description || selectedService.short_description}
              </p>
              
              <div className="service-features-detailed">
                <h4>What's Included:</h4>
                <ul>
                  {(selectedService.features || []).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="service-pricing">
                <h4>Starting From:</h4>
                <p className="price">৳১৫,০০০</p>
                <p className="price-note">*Price varies based on project scope and requirements. Bangladeshi pricing</p>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="neon-button primary"
                  onClick={() => {
                    setShowServiceModal(false);
                    window.location.href = '/quote';
                  }}
                >
                  Get Started
                </button>
                <button 
                  className="neon-button secondary"
                  onClick={() => {
                    setShowServiceModal(false);
                    window.location.href = '/quote';
                  }}
                >
                  Request Quote
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <style jsx>{`
        .services-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .services-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at top, rgba(0, 245, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .services-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: #b0b0b0;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          position: relative;
        }
        
        .service-card {
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 20px;
          padding: 40px 30px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        
        .service-card:hover {
          border-color: rgba(0, 245, 255, 0.6);
          background: rgba(20, 20, 20, 0.9);
          box-shadow: 
            0 20px 40px rgba(0, 245, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .service-card:hover .card-glow {
          opacity: 1;
        }
        
        .service-card:hover .service-icon {
          transform: scale(1.1);
        }
        
        .service-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(153, 102, 255, 0.2));
          border: 2px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          color: #00f5ff;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .service-card:hover .icon-glow {
          opacity: 1;
        }
        
        .service-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 15px;
          line-height: 1.3;
        }
        
        .service-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 25px;
          font-size: 0.95rem;
        }
        
        .service-features {
          list-style: none;
          margin-bottom: 30px;
        }
        
        .feature-item {
          color: #d0d0d0;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }
        
        .feature-bullet {
          color: #00f5ff;
          font-size: 1.5rem;
          margin-right: 10px;
          line-height: 1;
        }
        
        .service-cta {
          background: transparent;
          border: 2px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .service-cta:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
        }
        
        .card-glow {
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
        
        @media (max-width: 768px) {
          .services-header {
            margin-bottom: 35px;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .section-subtitle {
            font-size: 0.95rem;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .service-card {
            padding: 20px 15px;
          }
          
          .service-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 15px;
          }
          
          .service-title {
            font-size: 1.2rem;
            margin-bottom: 12px;
          }
          
          .service-description {
            font-size: 0.9rem;
            margin-bottom: 15px;
            line-height: 1.5;
          }
          
          .service-features {
            margin-bottom: 18px;
          }
          
          .feature-item {
            font-size: 0.85rem;
            margin-bottom: 6px;
          }
          
          .service-cta {
            padding: 10px 20px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .services-header {
            margin-bottom: 30px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .section-subtitle {
            font-size: 0.9rem;
          }
          
          .services-grid {
            gap: 12px;
          }
          
          .service-card {
            padding: 20px 15px;
          }
          
          .service-icon {
            width: 50px;
            height: 50px;
            margin-bottom: 12px;
          }
          
          .service-title {
            font-size: 1.1rem;
            margin-bottom: 10px;
          }
          
          .service-description {
            font-size: 0.85rem;
            margin-bottom: 12px;
          }
          
          .feature-item {
            font-size: 0.8rem;
            margin-bottom: 5px;
          }
          
          .service-cta {
            padding: 8px 16px;
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 400px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
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
        
        .service-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        
        .service-modal-content {
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 90%;
          max-width: min(600px, 90vw);
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-sizing: border-box;
        }
        
        @media (max-width: 768px) {
          .service-modal-content {
            padding: 25px 20px;
            width: 95%;
            max-width: calc(100vw - 20px);
            margin: 10px;
            border-radius: 15px;
          }
          
          .modal-header {
            margin-bottom: 20px;
            padding-bottom: 15px;
          }
          
          .modal-header h3 {
            font-size: 1.4rem;
          }
          
          .service-detail-description {
            font-size: 1rem;
            margin-bottom: 25px;
          }
          
          .modal-actions {
            flex-direction: column;
            gap: 10px;
          }
          
          .modal-actions .neon-button {
            width: 100%;
            max-width: 250px;
            padding: 14px 20px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .service-modal-content {
            padding: 20px 15px;
            width: 98%;
            max-width: calc(100vw - 10px);
            margin: 5px;
            border-radius: 12px;
          }
          
          .modal-header h3 {
            font-size: 1.2rem;
          }
          
          .service-detail-description {
            font-size: 0.9rem;
            line-height: 1.5;
          }
          
          .service-features-detailed h4 {
            font-size: 1rem;
          }
          
          .service-features-detailed li {
            font-size: 0.85rem;
            padding: 6px 0;
          }
          
          .service-pricing {
            padding: 15px;
          }
          
          .price {
            font-size: 1.6rem;
          }
          
          .modal-actions .neon-button {
            padding: 12px 18px;
            font-size: 0.85rem;
          }
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(0, 245, 255, 0.2);
        }
        
        .modal-header h3 {
          color: #ffffff;
          font-size: 1.8rem;
          font-weight: 600;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #b0b0b0;
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .close-btn:hover {
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.1);
        }
        
        .modal-body {
          text-align: center;
        }
        
        .service-detail-icon {
          color: #00f5ff;
          margin-bottom: 20px;
        }
        
        .service-detail-description {
          color: #b0b0b0;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .service-features-detailed {
          text-align: left;
          margin-bottom: 30px;
        }
        
        .service-features-detailed h4 {
          color: #ffffff;
          font-size: 1.2rem;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .service-features-detailed ul {
          list-style: none;
          padding: 0;
        }
        
        .service-features-detailed li {
          color: #b0b0b0;
          padding: 8px 0;
          padding-left: 20px;
          position: relative;
        }
        
        .service-features-detailed li::before {
          content: '✓';
          color: #00f5ff;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .service-pricing {
          background: rgba(0, 245, 255, 0.05);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 30px;
        }
        
        .service-pricing h4 {
          color: #ffffff;
          margin-bottom: 10px;
        }
        
        .price {
          font-size: 2rem;
          font-weight: bold;
          color: #00f5ff;
          margin-bottom: 5px;
        }
        
        .price-note {
          color: #888;
          font-size: 0.9rem;
          margin: 0;
        }
        
        .modal-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .modal-actions .neon-button {
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }
        
        .modal-actions .primary {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: white;
        }
        
        .modal-actions .secondary {
          background: transparent;
          border: 2px solid rgba(0, 245, 255, 0.5);
          color: #00f5ff;
        }
        
        .modal-actions .neon-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Services;
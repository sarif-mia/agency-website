import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();
  
  // Handle CTA button
  const handleGetStarted = () => {
    // Navigate directly to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: navigate to quote page using React Router
      navigate('/quote');
    }
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);
      // Reset current index when switching between desktop and mobile
      setCurrentIndex(0);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.testimonials.getAll();
        setTestimonials(response.results || response);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
        // Fallback to sample data if API fails
        setTestimonials(sampleTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  
  // Sample testimonials as fallback
  const sampleTestimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO, TechStart Inc.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9bfc8bd?w=200&h=200&fit=crop&crop=face',
      rating: 5,
      text: 'Working with this agency transformed our digital presence completely. Their attention to detail and innovative approach exceeded all our expectations. The team delivered exceptional results on time and within budget.',
      company: 'TechStart Inc.',
      project: 'E-Commerce Platform'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Marketing Director, GrowthCorp',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      rating: 5,
      text: 'The digital marketing campaign they created for us increased our ROI by 300%. Their strategic thinking and execution are unmatched. I highly recommend them to anyone looking to scale their business.',
      company: 'GrowthCorp',
      project: 'Digital Marketing Campaign'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Founder, DesignStudio',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
      rating: 5,
      text: 'Amazing team! They took our complex requirements and turned them into a beautiful, functional website. The communication throughout the project was excellent, and they were always available for questions.',
      company: 'DesignStudio',
      project: 'Brand Identity & Website'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'CTO, Innovation Labs',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      rating: 5,
      text: 'Their technical expertise is outstanding. They built a scalable mobile app that handles thousands of users seamlessly. The code quality and architecture are top-notch. Definitely our go-to development partner.',
      company: 'Innovation Labs',
      project: 'Mobile Application'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      position: 'Brand Manager, StyleCo',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
      rating: 5,
      text: 'The branding work they did for us was incredible. They understood our vision perfectly and created a brand identity that truly represents who we are. Our customers love the new look!',
      company: 'StyleCo',
      project: 'Brand Identity Design'
    }
  ];

  const nextSlide = () => {
    if (testimonials.length > 0) {
      // For desktop: move by 2, for mobile: move by 1
      const maxIndex = isDesktop ? 
        Math.ceil(testimonials.length / 2) - 1 : 
        testimonials.length - 1;
      setCurrentIndex((prev) => (prev + 1) > maxIndex ? 0 : prev + 1);
    }
  };

  const prevSlide = () => {
    if (testimonials.length > 0) {
      const maxIndex = isDesktop ? 
        Math.ceil(testimonials.length / 2) - 1 : 
        testimonials.length - 1;
      setCurrentIndex((prev) => (prev - 1) < 0 ? maxIndex : prev - 1);
    }
  };

  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  if (loading) {
    return (
      <section className="testimonials-section section" id="testimonials">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="testimonials-section section" id="testimonials">
        <div className="container">
          <div className="no-data-container">
            <p>No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <section className="testimonials-section section" id="testimonials">
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="section-title gradient-text">What Our Clients Say</h1>
          <p className="section-subtitle">
            Don't just take our word for it - hear from the businesses we've helped succeed
          </p>
        </motion.div>

        <div 
          className="testimonials-container"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.button
            className="nav-btn prev-btn"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="testimonials-slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="testimonials-grid"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Desktop: Show 2 testimonials, Mobile: Show 1 */}
                {isDesktop ? (
                  // Desktop view - 2 testimonials
                  <>
                    {testimonials.slice(currentIndex * 2, currentIndex * 2 + 2).map((testimonial, index) => (
                      <div key={testimonial.id || index} className="testimonial-card">
                        <div className="quote-icon">
                          <Quote size={32} />
                        </div>

                        <div className="testimonial-content">
                          <div className="rating">
                            {renderStars(testimonial.rating)}
                          </div>

                          <blockquote className="testimonial-text">
                            "{testimonial.text}"
                          </blockquote>

                          <div className="testimonial-author">
                            <div className="author-image">
                              <img 
                                src={testimonial.image_url || testimonial.image} 
                                alt={testimonial.name}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b9bfc8bd?w=200&h=200&fit=crop&crop=face';
                                }}
                              />
                              <div className="image-glow"></div>
                            </div>
                            
                            <div className="author-info">
                              <h4 className="author-name">{testimonial.name}</h4>
                              <p className="author-position">{testimonial.position}</p>
                              <div className="project-info">
                                <span className="company">{testimonial.company}</span>
                                {testimonial.project_title && (
                                  <span className="project">{testimonial.project_title}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-glow"></div>
                      </div>
                    ))}
                    {/* Fill empty space if odd number of testimonials */}
                    {testimonials.slice(currentIndex * 2, currentIndex * 2 + 2).length === 1 && (
                      <div className="testimonial-card placeholder">
                        <div className="placeholder-content">
                          <Quote size={32} className="placeholder-quote" />
                          <p>More testimonials coming soon...</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Mobile view - 1 testimonial
                  <div className="testimonial-card">
                    <div className="quote-icon">
                      <Quote size={32} />
                    </div>

                    <div className="testimonial-content">
                      <div className="rating">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>

                      <blockquote className="testimonial-text">
                        "{testimonials[currentIndex].text}"
                      </blockquote>

                      <div className="testimonial-author">
                        <div className="author-image">
                          <img 
                            src={testimonials[currentIndex].image_url || testimonials[currentIndex].image} 
                            alt={testimonials[currentIndex].name}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b9bfc8bd?w=200&h=200&fit=crop&crop=face';
                            }}
                          />
                          <div className="image-glow"></div>
                        </div>
                        
                        <div className="author-info">
                          <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                          <p className="author-position">{testimonials[currentIndex].position}</p>
                          <div className="project-info">
                            <span className="company">{testimonials[currentIndex].company}</span>
                            {testimonials[currentIndex].project_title && (
                              <span className="project">{testimonials[currentIndex].project_title}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-glow"></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            className="nav-btn next-btn"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        <div className="testimonials-indicators">
          {Array.from({ 
            length: isDesktop ? Math.ceil(testimonials.length / 2) : testimonials.length 
          }, (_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        <motion.div
          className="testimonials-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="cta-title">Ready to Join Our Success Stories?</h3>
          <button className="neon-button" onClick={handleGetStarted}>
            Start Your Project
          </button>
        </motion.div>
      </div>
      
      <style jsx>{`
        .testimonials-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #0a0a0a 50%, #2e1a1a 75%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 30% 30%, rgba(0, 245, 255, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(153, 102, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .testimonials-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .testimonials-container {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 40px;
          position: relative;
        }
        
        .nav-btn {
          width: 60px;
          height: 60px;
          background: rgba(0, 245, 255, 0.1);
          border: 2px solid rgba(0, 245, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00f5ff;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          flex-shrink: 0;
        }
        
        .nav-btn:hover {
          background: rgba(0, 245, 255, 0.2);
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
        }
        
        .testimonials-slider {
          flex: 1;
          position: relative;
          min-height: 400px;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        
        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        
        .testimonial-card {
          background: rgba(15, 15, 15, 0.9);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 25px;
          padding: 40px;
          position: relative;
          backdrop-filter: blur(15px);
          overflow: hidden;
        }
        
        .quote-icon {
          position: absolute;
          top: 20px;
          right: 30px;
          color: rgba(0, 245, 255, 0.3);
          transform: rotate(180deg);
        }
        
        .rating {
          display: flex;
          gap: 4px;
          margin-bottom: 25px;
        }
        
        .star-filled {
          color: #ffd700;
          fill: #ffd700;
        }
        
        .star-empty {
          color: #444;
        }
        
        .testimonial-text {
          font-size: 1.2rem;
          line-height: 1.7;
          color: #ffffff;
          margin-bottom: 30px;
          font-style: italic;
          position: relative;
          z-index: 2;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .author-image {
          position: relative;
          width: 70px;
          height: 70px;
          flex-shrink: 0;
        }
        
        .author-image img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(0, 245, 255, 0.3);
        }
        
        .image-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }
        
        .author-info {
          flex: 1;
        }
        
        .author-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 5px;
        }
        
        .author-position {
          color: #b0b0b0;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }
        
        .project-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .company {
          color: #00f5ff;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .project {
          color: #9966ff;
          font-size: 0.85rem;
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
          border-radius: 25px;
          opacity: 0.7;
          pointer-events: none;
        }
        
        .placeholder {
          opacity: 0.5;
        }
        
        .placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
        }
        
        .placeholder-quote {
          color: rgba(0, 245, 255, 0.3);
          margin-bottom: 20px;
        }
        
        .placeholder-content p {
          color: #666;
          font-style: italic;
        }
        
        .testimonials-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 60px;
        }
        
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 245, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .indicator.active {
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.5);
        }
        
        .testimonials-cta {
          text-align: center;
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }
        
        .cta-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @media (max-width: 768px) {
          .testimonials-container {
            flex-direction: column;
            gap: 15px;
            margin-bottom: 25px;
          }
          
          .nav-btn {
            display: none;
          }
          
          .testimonial-card {
            padding: 20px 15px;
          }
          
          .testimonial-text {
            font-size: 1rem;
            margin-bottom: 20px;
            line-height: 1.5;
          }
          
          .testimonial-author {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
          
          .author-image {
            width: 50px;
            height: 50px;
          }
          
          .author-name {
            font-size: 1.1rem;
          }
          
          .author-position {
            font-size: 0.85rem;
          }
          
          .company {
            font-size: 0.8rem;
          }
          
          .project {
            font-size: 0.75rem;
          }
          
          .testimonials-indicators {
            margin-bottom: 40px;
          }
          
          .cta-title {
            font-size: 1.4rem;
          }
          
          .testimonials-cta {
            padding: 25px 20px;
          }
        }
        
        @media (max-width: 480px) {
          .testimonials-header {
            margin-bottom: 35px;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-subtitle {
            font-size: 0.9rem;
          }
          
          .testimonial-card {
            padding: 20px 15px;
          }
          
          .quote-icon {
            top: 15px;
            right: 20px;
          }
          
          .rating {
            margin-bottom: 15px;
          }
          
          .testimonial-text {
            font-size: 0.95rem;
            margin-bottom: 15px;
          }
          
          .author-image {
            width: 45px;
            height: 45px;
          }
          
          .author-name {
            font-size: 1rem;
          }
          
          .author-position {
            font-size: 0.8rem;
          }
          
          .cta-title {
            font-size: 1.2rem;
          }
          
          .testimonials-cta {
            padding: 20px 15px;
          }
        }
        
        .loading-container, .no-data-container {
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
      `}</style>
    </section>
  );
};

export default Testimonials;
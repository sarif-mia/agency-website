import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, CheckCircle, Clock, DollarSign, Users, Briefcase } from 'lucide-react';

const GetQuotePage = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Project Details
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: [],
    designPreference: '',
    
    // Additional Services
    additionalServices: [],
    maintenance: false,
    hosting: false,
    seo: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(null);

  const projectTypes = [
    { id: 'website', name: 'Business Website', basePrice: 1500, icon: '🌐' },
    { id: 'ecommerce', name: 'E-commerce Store', basePrice: 3000, icon: '🛒' },
    { id: 'webapp', name: 'Web Application', basePrice: 5000, icon: '💻' },
    { id: 'mobile', name: 'Mobile App', basePrice: 8000, icon: '📱' },
    { id: 'dashboard', name: 'Admin Dashboard', basePrice: 4000, icon: '📊' },
    { id: 'portfolio', name: 'Portfolio Website', basePrice: 1000, icon: '🎨' }
  ];

  const budgetRanges = [
    { id: 'small', label: '$1,000 - $5,000', multiplier: 1 },
    { id: 'medium', label: '$5,000 - $15,000', multiplier: 1.2 },
    { id: 'large', label: '$15,000 - $50,000', multiplier: 1.5 },
    { id: 'enterprise', label: '$50,000+', multiplier: 2 }
  ];

  const timelineOptions = [
    { id: 'rush', label: '1-2 weeks (Rush)', multiplier: 1.5 },
    { id: 'standard', label: '1-2 months', multiplier: 1 },
    { id: 'extended', label: '3-6 months', multiplier: 0.9 },
    { id: 'flexible', label: '6+ months', multiplier: 0.8 }
  ];

  const featureOptions = [
    { id: 'cms', name: 'Content Management System', price: 800 },
    { id: 'payment', name: 'Payment Integration', price: 1200 },
    { id: 'booking', name: 'Booking System', price: 1500 },
    { id: 'multiuser', name: 'Multi-user Authentication', price: 1000 },
    { id: 'api', name: 'Third-party API Integration', price: 600 },
    { id: 'analytics', name: 'Advanced Analytics', price: 400 },
    { id: 'chat', name: 'Live Chat Support', price: 300 },
    { id: 'multilang', name: 'Multi-language Support', price: 700 }
  ];

  const additionalServicesOptions = [
    { id: 'seo', name: 'SEO Optimization', price: 800 },
    { id: 'maintenance', name: 'Monthly Maintenance', price: 200 },
    { id: 'hosting', name: 'Premium Hosting', price: 150 },
    { id: 'ssl', name: 'SSL Certificate', price: 100 },
    { id: 'backup', name: 'Daily Backups', price: 80 },
    { id: 'support', name: '24/7 Support', price: 300 }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const calculateEstimate = () => {
    let total = 0;
    
    // Base project cost
    const selectedProject = projectTypes.find(p => p.id === formData.projectType);
    if (selectedProject) {
      total += selectedProject.basePrice;
    }

    // Timeline multiplier
    const selectedTimeline = timelineOptions.find(t => t.id === formData.timeline);
    if (selectedTimeline) {
      total *= selectedTimeline.multiplier;
    }

    // Features cost
    formData.features.forEach(featureId => {
      const feature = featureOptions.find(f => f.id === featureId);
      if (feature) {
        total += feature.price;
      }
    });

    // Additional services
    formData.additionalServices.forEach(serviceId => {
      const service = additionalServicesOptions.find(s => s.id === serviceId);
      if (service) {
        total += service.price;
      }
    });

    // Budget range adjustment
    const selectedBudget = budgetRanges.find(b => b.id === formData.budget);
    if (selectedBudget) {
      total *= selectedBudget.multiplier;
    }

    return Math.round(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const estimate = calculateEstimate();
      setEstimatedCost(estimate);
      setIsSubmitting(false);
      setCurrentStep(4);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <motion.div
      className="form-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3>Tell us about yourself</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Company/Organization</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      className="form-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3>Project Details</h3>
      
      <div className="form-group">
        <label>Project Type *</label>
        <div className="project-types">
          {projectTypes.map(type => (
            <div
              key={type.id}
              className={`project-type-card ${formData.projectType === type.id ? 'selected' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
            >
              <span className="project-icon">{type.icon}</span>
              <span className="project-name">{type.name}</span>
              <span className="project-price">Starting ${type.basePrice}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
          >
            <option value="">Select budget range</option>
            {budgetRanges.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Timeline</label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
          >
            <option value="">Select timeline</option>
            {timelineOptions.map(timeline => (
              <option key={timeline.id} value={timeline.id}>{timeline.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Project Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          placeholder="Tell us about your project goals, target audience, and any specific requirements..."
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      className="form-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3>Features & Services</h3>
      
      <div className="form-group">
        <label>Required Features</label>
        <div className="features-grid">
          {featureOptions.map(feature => (
            <div
              key={feature.id}
              className={`feature-card ${formData.features.includes(feature.id) ? 'selected' : ''}`}
              onClick={() => handleFeatureToggle(feature.id)}
            >
              <CheckCircle size={20} />
              <span className="feature-name">{feature.name}</span>
              <span className="feature-price">+${feature.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Additional Services</label>
        <div className="services-grid">
          {additionalServicesOptions.map(service => (
            <div
              key={service.id}
              className={`service-card ${formData.additionalServices.includes(service.id) ? 'selected' : ''}`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <CheckCircle size={16} />
              <span className="service-name">{service.name}</span>
              <span className="service-price">${service.price}/mo</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      className="form-step quote-result"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="quote-header">
        <Calculator size={48} />
        <h3>Your Project Quote</h3>
        <div className="estimated-cost">
          ${estimatedCost?.toLocaleString()}
        </div>
        <p>Estimated project cost based on your requirements</p>
      </div>

      <div className="quote-breakdown">
        <h4>What's Included:</h4>
        <div className="breakdown-items">
          <div className="breakdown-item">
            <Briefcase size={16} />
            <span>Project Development</span>
          </div>
          <div className="breakdown-item">
            <Users size={16} />
            <span>Dedicated Team</span>
          </div>
          <div className="breakdown-item">
            <Clock size={16} />
            <span>Project Management</span>
          </div>
          <div className="breakdown-item">
            <CheckCircle size={16} />
            <span>Quality Assurance</span>
          </div>
        </div>
      </div>

      <div className="next-steps">
        <h4>Next Steps:</h4>
        <ol>
          <li>We'll review your requirements within 24 hours</li>
          <li>Schedule a consultation call to discuss details</li>
          <li>Receive a detailed proposal with timeline</li>
          <li>Start your project with a 50% deposit</li>
        </ol>
      </div>

      <div className="cta-buttons">
        <button className="btn-primary">
          Schedule Consultation
        </button>
        <button className="btn-secondary">
          Download Quote PDF
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="quote-page">
      <div className="container">
        {/* Back Button */}
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

        {/* Header */}
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="header-icon">
            <DollarSign size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Get Free Quote</h1>
          <p className="page-description">
            Tell us about your project and get an instant estimate for your next digital solution
          </p>
        </motion.header>

        {/* Progress Bar */}
        {currentStep <= 3 && (
          <motion.div
            className="progress-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="progress-steps">
              {[1, 2, 3].map(step => (
                <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 && 'Personal Info'}
                    {step === 2 && 'Project Details'}
                    {step === 3 && 'Features'}
                  </div>
                </div>
              ))}
            </div>
            <div className="progress-line">
              <div 
                className="progress-fill"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <div className="quote-form-container">
          <form onSubmit={handleSubmit} className="quote-form">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            {currentStep <= 3 && (
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className="btn-secondary">
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button 
                    type="button" 
                    onClick={nextStep} 
                    className="btn-primary"
                    disabled={
                      (currentStep === 1 && (!formData.name || !formData.email)) ||
                      (currentStep === 2 && !formData.projectType)
                    }
                  >
                    Next Step
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Calculating...' : 'Get Quote'}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .quote-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .back-navigation {
          margin-bottom: 40px;
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
        }

        .back-btn:hover {
          color: #ffffff;
          transform: translateX(-5px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header-icon {
          position: relative;
          display: inline-block;
          margin-bottom: 30px;
        }

        .header-icon svg {
          color: #00f5ff;
          filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.5));
        }

        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.4; }
        }

        .page-title {
          font-size: 3rem;
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

        .progress-bar {
          margin-bottom: 50px;
          position: relative;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.8);
          border: 2px solid rgba(0, 245, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: rgba(0, 245, 255, 0.2);
          border-color: #00f5ff;
          color: #00f5ff;
        }

        .step-label {
          font-size: 0.9rem;
          color: #b0b0b0;
        }

        .progress-step.active .step-label {
          color: #00f5ff;
        }

        .progress-line {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          height: 2px;
          background: rgba(0, 245, 255, 0.1);
          z-index: -1;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
          transition: width 0.3s ease;
        }

        .quote-form-container {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
        }

        .form-step h3 {
          font-size: 1.5rem;
          margin-bottom: 30px;
          color: #ffffff;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #b0b0b0;
          font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
        }

        .project-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .project-type-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .project-type-card:hover,
        .project-type-card.selected {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
          transform: translateY(-2px);
        }

        .project-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .project-name {
          font-weight: 600;
          margin-bottom: 5px;
        }

        .project-price {
          color: #00f5ff;
          font-size: 0.9rem;
        }

        .features-grid,
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .feature-card,
        .service-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .feature-card:hover,
        .service-card:hover,
        .feature-card.selected,
        .service-card.selected {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
        }

        .feature-card.selected svg,
        .service-card.selected svg {
          color: #00f5ff;
        }

        .feature-price,
        .service-price {
          margin-left: auto;
          color: #00f5ff;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .quote-result {
          text-align: center;
        }

        .quote-header .estimated-cost {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 20px 0;
        }

        .quote-breakdown,
        .next-steps {
          margin: 30px 0;
          text-align: left;
        }

        .breakdown-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .breakdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #b0b0b0;
        }

        .breakdown-item svg {
          color: #00f5ff;
        }

        .next-steps ol {
          color: #b0b0b0;
          line-height: 1.8;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 30px;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: transparent;
          color: #00f5ff;
          border: 1px solid rgba(0, 245, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
        }

        @media (max-width: 768px) {
          .quote-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .quote-form-container {
            padding: 25px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .project-types {
            grid-template-columns: 1fr;
          }

          .features-grid,
          .services-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .form-navigation {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default GetQuotePage;
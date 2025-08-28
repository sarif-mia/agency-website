import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Handshake, Users, TrendingUp, Award, Mail, Phone, CheckCircle } from 'lucide-react';

const PartnershipPage = () => {
  const [selectedPartnership, setSelectedPartnership] = useState('agency');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnership_type: 'agency',
    experience: '',
    message: ''
  });

  const partnershipTypes = [
    {
      id: 'agency',
      title: 'Agency Partnership',
      icon: Users,
      description: 'Join our network of trusted agencies',
      benefits: [
        'Revenue sharing opportunities',
        'Joint marketing initiatives',
        'Shared resources and expertise',
        'Priority project collaboration',
        'Exclusive training programs'
      ]
    },
    {
      id: 'technology',
      title: 'Technology Partnership',
      icon: TrendingUp,
      description: 'Integrate your solutions with ours',
      benefits: [
        'Technical integration support',
        'Co-marketing opportunities',
        'Developer resources access',
        'Joint solution development',
        'API partnership programs'
      ]
    },
    {
      id: 'referral',
      title: 'Referral Partnership',
      icon: Award,
      description: 'Earn commissions by referring clients',
      benefits: [
        'Competitive commission rates',
        'Dedicated partner support',
        'Marketing materials provided',
        'Performance tracking tools',
        'Regular payout schedules'
      ]
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const partnershipType = partnershipTypes.find(p => p.id === formData.partnership_type);
    alert(`🤝 Partnership Application Submitted!\n\nThank you ${formData.name}!\n\nPartnership Type: ${partnershipType.title}\nCompany: ${formData.company}\n\nOur partnership team will review your application and contact you within 48 hours.\n\nNext Steps:\n• Initial consultation call\n• Partnership agreement review\n• Onboarding process\n• Welcome to the SiteGenIT family! 🚀`);
  };

  return (
    <div className="partnership-page">
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
          <div className="header-icon">
            <Handshake size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Partner With Us</h1>
          <p className="page-description">
            Join our network of partners and grow together. Let's create amazing digital experiences as a team.
          </p>
        </motion.header>

        <motion.section
          className="partnership-types"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3>Choose Your Partnership Type</h3>
          <div className="types-grid">
            {partnershipTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <div 
                  key={type.id} 
                  className={`partnership-card ${selectedPartnership === type.id ? 'active' : ''}`}
                  onClick={() => setSelectedPartnership(type.id)}
                >
                  <div className="card-header">
                    <IconComponent size={32} />
                    <h4>{type.title}</h4>
                  </div>
                  <p>{type.description}</p>
                  <div className="benefits-list">
                    {type.benefits.map((benefit, index) => (
                      <div key={index} className="benefit-item">
                        <CheckCircle size={16} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="partnership-form-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="form-container">
            <div className="form-header">
              <h3>Start Your Partnership Journey</h3>
              <p>Fill out the form below and our partnership team will get in touch with you.</p>
            </div>

            <form onSubmit={handleSubmit} className="partnership-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@company.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Partnership Type *</label>
                <select
                  name="partnership_type"
                  value={formData.partnership_type}
                  onChange={handleInputChange}
                  required
                >
                  {partnershipTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Your Experience & Expertise</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about your company, experience, and what you bring to the partnership..."
                />
              </div>

              <div className="form-group">
                <label>Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <button type="submit" className="submit-btn">
                <Handshake size={20} />
                Submit Partnership Application
              </button>
            </form>
          </div>
        </motion.section>

        <motion.section
          className="contact-info-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="contact-cards">
            <div className="contact-card">
              <Mail size={24} />
              <h4>Partnership Inquiry</h4>
              <p>sitegenit@gmail.com</p>
              <a href="mailto:sitegenit@gmail.com">Send Email</a>
            </div>
            <div className="contact-card">
              <Phone size={24} />
              <h4>Direct Line</h4>
              <p>+880 1571 447 136</p>
              <a href="tel:+8801571447136">Call Now</a>
            </div>
          </div>
        </motion.section>
      </div>

      <style jsx>{`
        .partnership-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 1200px;
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

        .partnership-types {
          margin-bottom: 60px;
        }

        .partnership-types h3 {
          text-align: center;
          margin-bottom: 40px;
          color: #ffffff;
          font-size: 1.8rem;
        }

        .types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }

        .partnership-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .partnership-card:hover,
        .partnership-card.active {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.2);
        }

        .partnership-card.active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .card-header svg {
          color: #00f5ff;
        }

        .card-header h4 {
          margin: 0;
          color: #ffffff;
        }

        .partnership-card p {
          color: #b0b0b0;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .benefit-item svg {
          color: #00f5ff;
          flex-shrink: 0;
        }

        .partnership-form-section {
          margin-bottom: 60px;
        }

        .form-container {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .form-header h3 {
          color: #ffffff;
          margin-bottom: 10px;
        }

        .form-header p {
          color: #b0b0b0;
        }

        .partnership-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #ffffff;
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
          resize: vertical;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 25px;
          padding: 15px 30px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .contact-info-section {
          margin-bottom: 40px;
        }

        .contact-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-5px);
        }

        .contact-card svg {
          color: #00f5ff;
          margin-bottom: 15px;
        }

        .contact-card h4 {
          color: #ffffff;
          margin-bottom: 8px;
        }

        .contact-card p {
          color: #b0b0b0;
          margin-bottom: 15px;
        }

        .contact-card a {
          color: #00f5ff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .contact-card a:hover {
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .partnership-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .types-grid {
            grid-template-columns: 1fr;
          }

          .form-container {
            padding: 25px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .partnership-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnershipPage;
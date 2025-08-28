import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Heart, 
  Coffee, 
  Award, 
  BookOpen,
  Send,
  Upload,
  CheckCircle,
  Globe,
  Zap
} from 'lucide-react';

const CareersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [applicationForm, setApplicationForm] = useState({
    position: '',
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const jobCategories = ['All', 'Development', 'Design', 'Marketing'];

  const openPositions = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      category: 'Development',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      salary: '$40,000 - $60,000',
      description: 'Join our development team to create stunning web applications using React, Next.js, and modern technologies.',
      requirements: ['Expert in React, JavaScript', 'Experience with Next.js, Node.js', 'Strong CSS skills'],
      benefits: ['Health Insurance', 'Remote Work', 'Learning Budget'],
      featured: true
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      category: 'Design',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      salary: '$35,000 - $50,000',
      description: 'Create intuitive and beautiful user experiences for web and mobile applications.',
      requirements: ['Proficiency in Figma, Adobe Suite', 'Strong portfolio', 'User research skills'],
      benefits: ['Health Insurance', 'Creative Environment', 'Design Tools Budget'],
      featured: true
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      category: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: '$30,000 - $45,000',
      description: 'Drive growth through strategic digital marketing campaigns and content creation.',
      requirements: ['Google Ads, Facebook Ads experience', 'SEO knowledge', 'Analytics skills'],
      benefits: ['Remote Work', 'Marketing Tools', 'Performance Bonuses'],
      featured: false
    },
    {
      id: 4,
      title: 'Junior Full Stack Developer',
      category: 'Development',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      salary: '$25,000 - $35,000',
      description: 'Start your career building full-stack applications using modern technologies.',
      requirements: ['Knowledge of React, Node.js', 'Web development fundamentals', 'Problem-solving skills'],
      benefits: ['Mentorship Program', 'Learning Budget', 'Growth Path'],
      featured: false
    }
  ];

  const companyBenefits = [
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
    { icon: Coffee, title: 'Work-Life Balance', description: 'Flexible hours and unlimited vacation policy' },
    { icon: BookOpen, title: 'Learning & Development', description: 'Annual learning budget and skill development programs' },
    { icon: Award, title: 'Recognition', description: 'Performance bonuses and career advancement opportunities' },
    { icon: Users, title: 'Collaboration', description: 'Team-focused environment with open communication' },
    { icon: Globe, title: 'Global Impact', description: 'Work on projects that make a worldwide difference' }
  ];

  const filteredJobs = selectedCategory === 'All' 
    ? openPositions 
    : openPositions.filter(job => job.category === selectedCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after successful submission
    setTimeout(() => {
      setApplicationForm({
        position: '',
        name: '',
        email: '',
        phone: '',
        experience: '',
        coverLetter: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="careers-page">
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
            <Briefcase size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Join Our Team</h1>
          <p className="page-description">
            Build your career with a passionate team creating exceptional digital experiences.
          </p>
        </motion.header>

        {/* Benefits */}
        <motion.section
          className="benefits-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="section-title">Why Work With Us?</h2>
          <div className="benefits-grid">
            {companyBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="benefit-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="benefit-icon">
                    <IconComponent size={28} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Job Filters */}
        <motion.section
          className="jobs-filter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="section-title">Open Positions</h2>
          <div className="filter-buttons">
            {jobCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Job Listings */}
        <motion.section
          className="jobs-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="jobs-grid">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className={`job-card ${job.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                {job.featured && <div className="featured-badge">Featured</div>}
                
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <div className="meta-item">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{job.type}</span>
                    </div>
                    <div className="meta-item">
                      <DollarSign size={16} />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="job-content">
                  <p className="job-description">{job.description}</p>
                  
                  <div className="job-requirements">
                    <h4>Key Requirements:</h4>
                    <ul>
                      {job.requirements.map((req, idx) => (
                        <li key={idx}>
                          <CheckCircle size={14} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="job-benefits">
                    <h4>Benefits:</h4>
                    <div className="benefits-tags">
                      {job.benefits.map((benefit, idx) => (
                        <span key={idx} className="benefit-tag">{benefit}</span>
                      ))}
                    </div>
                  </div>

                  <div className="job-actions">
                    <button 
                      className="apply-btn"
                      onClick={() => setApplicationForm(prev => ({ ...prev, position: job.id.toString() }))}
                    >
                      <Send size={16} />
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Application Form */}
        <motion.section
          className="application-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="application-container">
            <h2>Apply for a Position</h2>
            <p>Ready to join our team? Fill out the form below and we'll get back to you soon.</p>

            {submitted && (
              <div className="success-message">
                <CheckCircle size={24} />
                <h3>Application Submitted Successfully!</h3>
                <p>Thank you for your interest! We'll review your application and contact you within 48 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="application-form" style={{ opacity: submitted ? 0.5 : 1 }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Position *</label>
                  <select
                    name="position"
                    value={applicationForm.position}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a position</option>
                    {openPositions.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} - {job.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={applicationForm.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={applicationForm.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationForm.phone}
                    onChange={handleInputChange}
                    placeholder="+880 1XXX XXX XXX"
                  />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <select
                    name="experience"
                    value={applicationForm.experience}
                    onChange={handleInputChange}
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={applicationForm.coverLetter}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>

              <button type="submit" className="submit-btn">
                <Send size={20} />
                Submit Application
              </button>
            </form>
          </div>
        </motion.section>
      </div>

      <style jsx>{`
        .careers-page {
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
          margin-bottom: 80px;
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
          max-width: 600px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 50px;
          color: #ffffff;
        }

        .benefits-section {
          margin-bottom: 100px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-5px);
        }

        .benefit-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(0, 245, 255, 0.1);
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .benefit-icon svg {
          color: #00f5ff;
        }

        .benefit-card h3 {
          color: #ffffff;
          margin-bottom: 15px;
        }

        .benefit-card p {
          color: #b0b0b0;
          line-height: 1.6;
        }

        .jobs-filter {
          text-align: center;
          margin-bottom: 60px;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 25px;
          padding: 12px 24px;
          color: #00f5ff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .filter-btn:hover {
          background: rgba(0, 245, 255, 0.1);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          border-color: transparent;
        }

        .jobs-section {
          margin-bottom: 100px;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 30px;
        }

        .job-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 25px;
          padding: 30px;
          transition: all 0.3s ease;
          position: relative;
        }

        .job-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 245, 255, 0.1);
        }

        .job-card.featured {
          border-color: rgba(255, 215, 0, 0.4);
        }

        .featured-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ffd700, #ff8c00);
          color: #000;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .job-title {
          color: #ffffff;
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 20px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .meta-item svg {
          color: #00f5ff;
        }

        .job-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .job-requirements h4,
        .job-benefits h4 {
          color: #ffffff;
          font-size: 1rem;
          margin-bottom: 10px;
        }

        .job-requirements ul {
          list-style: none;
          margin-bottom: 20px;
        }

        .job-requirements li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #b0b0b0;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .job-requirements li svg {
          color: #00f5ff;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .benefits-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .benefit-tag {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .job-actions {
          display: flex;
          gap: 15px;
        }

        .apply-btn {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 20px;
          padding: 10px 20px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .application-section {
          margin-bottom: 60px;
        }

        .application-container {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .application-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .application-container h2 {
          color: #ffffff;
          margin-bottom: 10px;
          text-align: center;
        }

        .application-container p {
          color: #b0b0b0;
          text-align: center;
          margin-bottom: 30px;
        }

        .success-message {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          margin-bottom: 30px;
        }

        .success-message svg {
          color: #22c55e;
          margin-bottom: 15px;
        }

        .success-message h3 {
          color: #22c55e;
          margin-bottom: 10px;
        }

        .success-message p {
          color: #b0b0b0;
          margin: 0;
        }

        .application-form {
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

        @media (max-width: 768px) {
          .careers-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.5rem;
          }

          .jobs-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .application-container {
            padding: 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default CareersPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  Calendar, 
  LogIn, 
  UserPlus,
  MessageCircle,
  HelpCircle,
  FileText,
  BarChart
} from 'lucide-react';
import api from '../services/api';

const Header3D = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  
  // Form states
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  
  const [meetingForm, setMeetingForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferred_date: '',
    preferred_time: '',
    meeting_type: 'consultation',
    project_description: ''
  });

  // Navigation items
  const navItems = [
    { id: 'home', label: 'HOME', href: '/' },
    { id: 'about', label: 'ABOUT', href: '/about-us' },
    { id: 'services', label: 'SERVICES', href: '/services' },
    { id: 'portfolio', label: 'PORTFOLIO', href: '/all-projects' },
    { id: 'blog', label: 'BLOG', href: '/blog' },
    { id: 'contact', label: 'CONTACT', href: '/quote' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section or navigate to route
  const handleNavigation = (item) => {
    if (item.isRoute) {
      // This will be handled by React Router Link component
      return;
    } else {
      // Handle scroll navigation
      scrollToSection(item.href);
    }
  };
  
  // Smooth scroll to section
  const scrollToSection = (href) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };
  
  // Helper function to render navigation item
  const renderNavItem = (item, className, index, isMobile = false) => {
    const content = (
      <>
        <span>{item.label}</span>
        {!isMobile && <div className="nav-glow"></div>}
      </>
    );
    
    const motionProps = {
      key: item.id,
      className: className,
      whileHover: isMobile 
        ? { x: 10, backgroundColor: "rgba(0, 245, 255, 0.1)" }
        : { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95 },
      initial: { opacity: 0, [isMobile ? 'x' : 'y']: -20 },
      animate: { opacity: 1, [isMobile ? 'x' : 'y']: 0 },
      transition: { delay: index * 0.1 }
    };
    
    if (item.isRoute || item.href.startsWith('/')) {
      return (
        <motion.div {...motionProps}>
          <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
            {content}
          </Link>
        </motion.div>
      );
    } else {
      return (
        <motion.button
          {...motionProps}
          onClick={() => handleNavigation(item)}
        >
          {content}
        </motion.button>
      );
    }
  };
  
  // Handle form inputs
  const handleAuthChange = (e) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleMeetingChange = (e) => {
    setMeetingForm({
      ...meetingForm,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      let response;
      if (authMode === 'login') {
        response = await api.auth.login({
          email: authForm.email,
          password: authForm.password
        });
      } else {
        if (authForm.password !== authForm.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        response = await api.auth.register({
          email: authForm.email,
          password: authForm.password,
          confirm_password: authForm.confirmPassword,
          first_name: authForm.firstName,
          last_name: authForm.lastName
        });
      }
      
      setMessage(response.message);
      setMessageType('success');
      
      // Store token if provided
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      // Close modal after success
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setAuthForm({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          confirmPassword: ''
        });
        setMessage('');
      }, 2000);
      
    } catch (error) {
      setMessage(error.message || 'Authentication failed');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle meeting scheduling
  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await api.meeting.scheduleRequest(meetingForm);
      setMessage('✅ Meeting request submitted successfully! Your request has been added to our priority queue. Our team will contact you within 24 hours to confirm your meeting schedule. Check your email for confirmation.');
      setMessageType('success');
      
      // Close modal after success
      setTimeout(() => {
        setIsMeetingModalOpen(false);
        setMeetingForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          preferred_date: '',
          preferred_time: '',
          meeting_type: 'consultation',
          project_description: ''
        });
        setMessage('');
      }, 4000);
      
    } catch (error) {
      setMessage('❌ Failed to schedule meeting. Please check your information and try again. If the problem persists, contact us directly.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.header
        className={`header-3d ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-container">
          {/* Simple Logo */}
          <motion.div
            className="logo-3d"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => scrollToSection('#')}
          >
            <span className="logo-text gradient-text">SiteGenIT</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item, index) => 
              renderNavItem(item, "nav-item", index, false)
            )}
          </nav>

          {/* Action Buttons */}
          <div className="action-buttons">
            <motion.button
              className="action-btn meeting-btn"
              onClick={() => setIsMeetingModalOpen(true)}
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 245, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar size={20} />
            </motion.button>

            <motion.button
              className="action-btn auth-btn"
              onClick={() => setIsAuthModalOpen(true)}
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(153, 102, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={20} />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-nav-content">
                {navItems.map((item, index) => 
                  renderNavItem(item, "mobile-nav-item", index, true)
                )}
                
                <div className="mobile-actions">
                  <button
                    className="mobile-action-btn"
                    onClick={() => {
                      setIsMeetingModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Calendar size={18} />
                    Schedule Meeting
                  </button>
                  <button
                    className="mobile-action-btn"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <User size={18} />
                    Sign In
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Authentication Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthModalOpen(false)}
          >
            <motion.div
              className="auth-modal"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="auth-tabs">
                  <button
                    className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                    onClick={() => setAuthMode('login')}
                  >
                    <LogIn size={18} />
                    Sign In
                  </button>
                  <button
                    className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
                    onClick={() => setAuthMode('register')}
                  >
                    <UserPlus size={18} />
                    Register
                  </button>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="auth-content">
                {authMode === 'login' ? (
                  <div className="auth-form">
                    <h3>Welcome Back!</h3>
                    <p>Sign in to access your dashboard and projects</p>
                    
                    {message && (
                      <div className={`message ${messageType}`}>
                        {message}
                      </div>
                    )}
                    
                    <form onSubmit={handleAuth}>
                      <div className="form-group">
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Email address" 
                          value={authForm.email}
                          onChange={handleAuthChange}
                          required 
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <input 
                          type="password" 
                          name="password"
                          placeholder="Password" 
                          value={authForm.password}
                          onChange={handleAuthChange}
                          required 
                          disabled={loading}
                        />
                      </div>
                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                      </button>
                    </form>
                    <div className="auth-footer">
                      <a href="#" className="forgot-link">Forgot password?</a>
                    </div>
                  </div>
                ) : (
                  <div className="auth-form">
                    <h3>Join Our Agency</h3>
                    <p>Create an account to start your journey with us</p>
                    
                    {message && (
                      <div className={`message ${messageType}`}>
                        {message}
                      </div>
                    )}
                    
                    <form onSubmit={handleAuth}>
                      <div className="form-row">
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="firstName"
                            placeholder="First Name" 
                            value={authForm.firstName}
                            onChange={handleAuthChange}
                            required 
                            disabled={loading}
                          />
                        </div>
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="lastName"
                            placeholder="Last Name" 
                            value={authForm.lastName}
                            onChange={handleAuthChange}
                            required 
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Email address" 
                          value={authForm.email}
                          onChange={handleAuthChange}
                          required 
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <input 
                          type="password" 
                          name="password"
                          placeholder="Password" 
                          value={authForm.password}
                          onChange={handleAuthChange}
                          required 
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <input 
                          type="password" 
                          name="confirmPassword"
                          placeholder="Confirm Password" 
                          value={authForm.confirmPassword}
                          onChange={handleAuthChange}
                          required 
                          disabled={loading}
                        />
                      </div>
                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meeting Scheduling Modal */}
      <AnimatePresence>
        {isMeetingModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMeetingModalOpen(false)}
          >
            <motion.div
              className="meeting-modal"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>
                  <Calendar size={24} />
                  Schedule a Meeting
                </h3>
                <button
                  className="close-modal"
                  onClick={() => setIsMeetingModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="meeting-content">
                <p>Let's discuss your project and how we can help bring your vision to life.</p>
                
                {message && (
                  <div className={`message ${messageType}`}>
                    {message}
                  </div>
                )}
                
                <form className="meeting-form" onSubmit={handleMeetingSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={meetingForm.name}
                        onChange={handleMeetingChange}
                        required 
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input 
                        type="text" 
                        name="company"
                        value={meetingForm.company}
                        onChange={handleMeetingChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={meetingForm.email}
                        onChange={handleMeetingChange}
                        required 
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={meetingForm.phone}
                        onChange={handleMeetingChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Preferred Date *</label>
                      <input 
                        type="date" 
                        name="preferred_date"
                        value={meetingForm.preferred_date}
                        onChange={handleMeetingChange}
                        min={new Date().toISOString().split('T')[0]}
                        required 
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <label>Preferred Time *</label>
                      <select 
                        name="preferred_time"
                        value={meetingForm.preferred_time}
                        onChange={handleMeetingChange}
                        required
                        disabled={loading}
                      >
                        <option value="">Select Time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Meeting Type</label>
                    <select 
                      name="meeting_type"
                      value={meetingForm.meeting_type}
                      onChange={handleMeetingChange}
                      disabled={loading}
                    >
                      <option value="consultation">Free Consultation</option>
                      <option value="project">Project Discussion</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tell us about your project *</label>
                    <textarea 
                      rows="4" 
                      name="project_description"
                      placeholder="Describe your project, goals, and requirements..."
                      value={meetingForm.project_description}
                      onChange={handleMeetingChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    <Calendar size={18} />
                    {loading ? 'Scheduling...' : 'Schedule Meeting'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .header-3d {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 245, 255, 0.2);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header-3d.scrolled {
          background: rgba(15, 15, 15, 0.98);
          box-shadow: 0 10px 40px rgba(0, 245, 255, 0.1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }

        /* Logo */
        .logo-3d {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .logo-text {
          font-size: 1.6rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #b0b0b0;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          padding: 10px 12px;
          border-radius: 10px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .nav-item:hover {
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.1);
        }

        .nav-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .nav-item:hover .nav-glow {
          left: 100%;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .meeting-btn {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: white;
        }

        .auth-btn {
          background: linear-gradient(135deg, #9966ff, #6644cc);
          color: white;
        }

        .mobile-menu-toggle {
          display: none;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          color: #00f5ff;
          padding: 8px;
          cursor: pointer;
        }

        /* Mobile Navigation */
        .mobile-nav {
          display: none;
          background: rgba(15, 15, 15, 0.98);
          border-top: 1px solid rgba(0, 245, 255, 0.2);
          backdrop-filter: blur(20px);
        }

        .mobile-nav-content {
          padding: 20px;
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          background: none;
          border: none;
          color: #b0b0b0;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .mobile-actions {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 245, 255, 0.2);
        }

        .mobile-action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 15px 20px;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .auth-modal,
        .meeting-modal {
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .meeting-modal {
          max-width: 600px;
        }

        .modal-header {
          padding: 30px 30px 20px;
          border-bottom: 1px solid rgba(0, 245, 255, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .auth-tabs {
          display: flex;
          gap: 10px;
        }

        .auth-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: none;
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 25px;
          color: #b0b0b0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auth-tab.active {
          background: rgba(0, 245, 255, 0.1);
          color: #00f5ff;
          border-color: rgba(0, 245, 255, 0.5);
        }

        .close-modal {
          background: none;
          border: none;
          color: #b0b0b0;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-modal:hover {
          color: #ff4757;
          background: rgba(255, 71, 87, 0.1);
        }

        .auth-content,
        .meeting-content {
          padding: 30px;
        }

        .auth-form h3,
        .meeting-content p {
          color: #ffffff;
          margin-bottom: 10px;
        }

        .auth-form p {
          color: #b0b0b0;
          margin-bottom: 30px;
        }

        .meeting-content p {
          color: #b0b0b0;
          margin-bottom: 30px;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
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
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 12px;
          padding: 15px 20px;
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
          box-shadow: 0 0 30px rgba(0, 245, 255, 0.4);
          transform: translateY(-2px);
        }

        .auth-footer {
          text-align: center;
          margin-top: 20px;
        }

        .forgot-link {
          color: #00f5ff;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }
        
        /* Message Styles */
        .message {
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid;
          animation: fadeIn 0.3s ease;
        }
        
        .message.success {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }
        
        .message.error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .mobile-nav {
            display: block;
          }
          
          .header-container {
            padding: 0 15px;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 12px;
            height: 55px;
          }

          .action-buttons {
            gap: 8px;
          }

          .action-btn {
            width: 36px;
            height: 36px;
            padding: 8px;
          }

          .action-btn span {
            display: none;
          }

          .logo-text {
            font-size: 1.4rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .auth-modal,
          .meeting-modal {
            margin: 10px;
            max-width: none;
            width: calc(100% - 20px);
          }

          .modal-header,
          .auth-content,
          .meeting-content {
            padding: 15px;
          }
        }
        
        @media (max-width: 480px) {
          .header-container {
            padding: 0 10px;
            height: 50px;
          }
          
          .logo-text {
            font-size: 1.2rem;
          }
          
          .action-btn {
            width: 32px;
            height: 32px;
            padding: 6px;
          }
          
          .mobile-nav {
            top: 50px;
          }
        }
      `}</style>
    </>
  );
};

export default Header3D;
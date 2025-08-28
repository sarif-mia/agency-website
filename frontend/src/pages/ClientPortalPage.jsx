import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, User, Mail, Key, Eye, EyeOff } from 'lucide-react';

const ClientPortalPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`🔐 Demo Login Successful!\n\nWelcome back!\n\nIn the full application, you would access:\n• Project dashboard\n• File downloads\n• Invoice history\n• Communication center\n• Project timelines\n• Support tickets`);
    } else {
      alert(`✅ Demo Registration Successful!\n\nAccount created for ${formData.name}!\n\nYou would receive:\n• Welcome email\n• Account activation link\n• Client onboarding guide\n• Direct contact information`);
    }
  };

  return (
    <div className="client-portal-page">
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
            <Lock size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Client Portal</h1>
          <p className="page-description">
            Access your project dashboard, files, and account information
          </p>
        </motion.header>

        <motion.div
          className="portal-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="auth-tabs">
            <button
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <User size={20} />
              Sign In
            </button>
            <button
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <Key size={20} />
              Register
            </button>
          </div>

          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label>Full Name</label>
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
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isLogin ? 'Sign In to Portal' : 'Create Account'}
              </button>
            </form>

            <div className="portal-features">
              <h4>What you'll get access to:</h4>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <span>Project Dashboard</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📁</div>
                  <span>File Downloads</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💬</div>
                  <span>Direct Communication</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📅</div>
                  <span>Project Timeline</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🧾</div>
                  <span>Invoice Management</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🛠️</div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="demo-credentials"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h4>Demo Credentials</h4>
          <p>Use these credentials to test the portal:</p>
          <div className="credentials">
            <div className="credential-item">
              <strong>Email:</strong> demo@client.com
            </div>
            <div className="credential-item">
              <strong>Password:</strong> demo123
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .client-portal-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 600px;
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

        .portal-container {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .auth-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.3);
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          background: transparent;
          border: none;
          color: #b0b0b0;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .tab-btn.active {
          background: rgba(0, 245, 255, 0.1);
          color: #00f5ff;
          border-bottom: 2px solid #00f5ff;
        }

        .tab-btn:hover {
          background: rgba(0, 245, 255, 0.05);
        }

        .auth-form-container {
          padding: 40px;
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

        .form-group input {
          width: 100%;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-with-icon svg {
          position: absolute;
          left: 12px;
          color: #00f5ff;
          z-index: 2;
        }

        .input-with-icon input {
          padding-left: 45px;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #b0b0b0;
          cursor: pointer;
          padding: 5px;
          z-index: 2;
        }

        .password-toggle:hover {
          color: #00f5ff;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b0b0b0;
          cursor: pointer;
        }

        .forgot-link {
          color: #00f5ff;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 8px;
          padding: 15px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 30px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .portal-features h4 {
          color: #ffffff;
          margin-bottom: 20px;
          border-top: 1px solid rgba(0, 245, 255, 0.1);
          padding-top: 25px;
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .feature-icon {
          font-size: 1.2rem;
        }

        .demo-credentials {
          background: rgba(0, 245, 255, 0.05);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 15px;
          padding: 25px;
          text-align: center;
        }

        .demo-credentials h4 {
          color: #00f5ff;
          margin-bottom: 10px;
        }

        .demo-credentials p {
          color: #b0b0b0;
          margin-bottom: 15px;
        }

        .credentials {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .credential-item {
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 15px;
          border-radius: 8px;
          font-family: monospace;
        }

        .credential-item strong {
          color: #00f5ff;
        }

        @media (max-width: 768px) {
          .client-portal-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .auth-form-container {
            padding: 25px;
          }

          .features-list {
            grid-template-columns: 1fr;
          }

          .form-options {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default ClientPortalPage;
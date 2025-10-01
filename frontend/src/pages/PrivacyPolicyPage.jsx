import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-page">
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
            <Shield size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-description">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="last-updated">Last updated: August 28, 2025</div>
        </motion.header>

        {/* Content */}
        <motion.div
          className="page-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="content-sections">
            
            <section className="content-section">
              <div className="section-icon">
                <Database size={24} />
              </div>
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul>
                <li>Fill out our contact forms</li>
                <li>Schedule a meeting or consultation</li>
                <li>Subscribe to our newsletter</li>
                <li>Create an account on our platform</li>
                <li>Communicate with us via email or phone</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name and contact information</li>
                <li>Company details and project requirements</li>
                <li>Communication preferences</li>
                <li>Technical information about your project needs</li>
              </ul>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <Eye size={24} />
              </div>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Communicate with you about projects and services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <Lock size={24} />
              </div>
              <h2>Information Security</h2>
              <p>We take the security of your personal information seriously and implement appropriate measures to protect it:</p>
              <ul>
                <li>Data encryption in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data storage and backup systems</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <Mail size={24} />
              </div>
              <h2>Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
              <ul>
                <li>With trusted service providers who assist in operating our website</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent for specific purposes</li>
              </ul>
              <p>All third-party service providers are bound by confidentiality agreements and data protection requirements.</p>
            </section>

            <section className="content-section">
              <h2>Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar tracking technologies to:</p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve site functionality and user experience</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>
            </section>

            <section className="content-section">
              <h2>Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal data</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p>To exercise these rights, please contact us at <a href="mailto:sitegenit@gmail.com">sitegenit@gmail.com</a></p>
            </section>

            <section className="content-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> <a href="mailto:sitegenit@gmail.com">sitegenit@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+8801571447136">+880 1571 447 136</a></p>
                <p><strong>Address:</strong> Dhaka, Bangladesh</p>
              </div>
            </section>

          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .privacy-policy-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 800px;
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
          margin-bottom: 20px;
        }

        .last-updated {
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
        }

        .content-sections {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .content-section {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        .content-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .section-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 15px;
          margin-bottom: 20px;
        }

        .section-icon svg {
          color: #00f5ff;
        }

        .content-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .content-section p {
          color: #b0b0b0;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .content-section ul {
          color: #b0b0b0;
          margin: 15px 0;
          padding-left: 20px;
        }

        .content-section li {
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .content-section a {
          color: #00f5ff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .content-section a:hover {
          color: #ffffff;
        }

        .contact-info {
          background: rgba(0, 245, 255, 0.05);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 15px;
          padding: 20px;
          margin-top: 20px;
        }

        .contact-info p {
          margin-bottom: 10px;
        }

        .contact-info strong {
          color: #00f5ff;
        }

        @media (max-width: 768px) {
          .privacy-policy-page {
            padding: 80px 0 60px;
          }

          .container {
            padding: 0 15px;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .page-description {
            font-size: 1rem;
          }

          .content-section {
            padding: 20px;
          }

          .content-section h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyPage;
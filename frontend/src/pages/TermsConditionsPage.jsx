import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, AlertTriangle, DollarSign, Calendar, Scale } from 'lucide-react';

const TermsConditionsPage = () => {
  return (
    <div className="terms-page">
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
            <FileText size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Terms & Conditions</h1>
          <p className="page-description">
            Please read these terms and conditions carefully before using our services.
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
              <h2>Acceptance of Terms</h2>
              <p>By accessing and using SiteGenIT's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <FileText size={24} />
              </div>
              <h2>Service Description</h2>
              <p>SiteGenIT provides web development, design, and digital marketing services including but not limited to:</p>
              <ul>
                <li>Custom website development and design</li>
                <li>E-commerce platform development</li>
                <li>Mobile application development</li>
                <li>UI/UX design services</li>
                <li>Digital marketing and SEO services</li>
                <li>Brand identity and logo design</li>
                <li>Website maintenance and support</li>
              </ul>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <DollarSign size={24} />
              </div>
              <h2>Payment Terms</h2>
              <p>Our payment terms are as follows:</p>
              <ul>
                <li><strong>Project Payment:</strong> 50% deposit required before project commencement, remaining 50% due upon project completion</li>
                <li><strong>Monthly Retainer:</strong> Payment due at the beginning of each service period</li>
                <li><strong>Additional Work:</strong> Any work beyond the agreed scope will be billed separately</li>
                <li><strong>Late Payments:</strong> A 2% monthly service charge may be applied to overdue accounts</li>
                <li><strong>Refunds:</strong> Deposits are non-refundable once work has commenced</li>
              </ul>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <Calendar size={24} />
              </div>
              <h2>Project Timeline & Delivery</h2>
              <p>Project timelines and deliverables:</p>
              <ul>
                <li>Project timelines are estimates and may vary based on project complexity and client feedback</li>
                <li>Delays caused by client feedback, content provision, or approval processes may extend the timeline</li>
                <li>We will make reasonable efforts to meet agreed deadlines</li>
                <li>Rush projects may incur additional charges (minimum 25% surcharge)</li>
                <li>Final delivery is contingent upon full payment of all fees</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Client Responsibilities</h2>
              <p>As our client, you agree to:</p>
              <ul>
                <li>Provide all necessary content, materials, and information required for the project</li>
                <li>Respond to requests for feedback and approvals in a timely manner</li>
                <li>Ensure all provided content is original or properly licensed</li>
                <li>Make payments according to the agreed schedule</li>
                <li>Provide constructive and specific feedback during the review process</li>
                <li>Communicate any concerns or changes promptly</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Intellectual Property Rights</h2>
              <p>Ownership and intellectual property terms:</p>
              <ul>
                <li>Upon full payment, you will own the final deliverables and custom work created specifically for your project</li>
                <li>We retain ownership of our general methodologies, know-how, and any pre-existing intellectual property</li>
                <li>Third-party software, plugins, or tools used may have their own licensing terms</li>
                <li>You grant us permission to showcase completed work in our portfolio unless otherwise agreed</li>
                <li>Any code, designs, or materials developed remain our property until full payment is received</li>
              </ul>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <AlertTriangle size={24} />
              </div>
              <h2>Limitation of Liability</h2>
              <p>Our liability limitations:</p>
              <ul>
                <li>Our total liability for any project shall not exceed the total amount paid for that project</li>
                <li>We are not liable for indirect, special, or consequential damages</li>
                <li>We are not responsible for losses due to third-party services, hosting, or external factors</li>
                <li>Client is responsible for maintaining backups of their data and content</li>
                <li>We provide no warranties beyond those explicitly stated in our service agreements</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Revisions and Changes</h2>
              <p>Project revision policy:</p>
              <ul>
                <li>Each project includes a specified number of revision rounds as outlined in the project agreement</li>
                <li>Additional revisions beyond the agreed scope may incur extra charges</li>
                <li>Major changes to project scope require a separate agreement and additional payment</li>
                <li>Revisions must be requested within 30 days of delivery</li>
                <li>All revision requests should be detailed and specific</li>
              </ul>
            </section>

            <section className="content-section">
              <div className="section-icon">
                <Scale size={24} />
              </div>
              <h2>Governing Law</h2>
              <p>Legal terms and jurisdiction:</p>
              <ul>
                <li>These terms are governed by the laws of Bangladesh</li>
                <li>Any disputes shall be resolved through arbitration or local courts in Dhaka, Bangladesh</li>
                <li>If any provision is found unenforceable, the remainder shall remain in full force</li>
                <li>These terms constitute the entire agreement between parties</li>
              </ul>
            </section>

            <section className="content-section">
              <h2>Contact Information</h2>
              <p>For any questions regarding these terms and conditions, please contact us:</p>
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
        .terms-page {
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

        .content-section strong {
          color: #ffffff;
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
          .terms-page {
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

export default TermsConditionsPage;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Mail, Phone } from 'lucide-react';
import ContactForm from './ContactForm';

const CallToAction = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  return (
    <section className="cta-section section" id="contact">
      <div className="container">
        <div className="cta-background">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="cta-icon"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Rocket size={60} />
              <div className="icon-glow"></div>
            </motion.div>

            <motion.h1
              className="cta-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Let's Build Something Great Together 🚀
            </motion.h1>

            <motion.p
              className="cta-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to transform your digital presence? We're here to turn your vision into reality 
              with cutting-edge solutions that drive results. Let's create something amazing together.
            </motion.p>

            <motion.div
              className="cta-stats"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="stat-item">
                <span className="stat-number gradient-text">24h</span>
                <span className="stat-label">Response Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-number gradient-text">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-number gradient-text">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </motion.div>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="neon-button primary-cta"
                onClick={() => setShowContactForm(true)}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(0, 245, 255, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Project</span>
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                className="neon-button secondary-cta"
                onClick={() => setShowContactForm(true)}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(0, 245, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Schedule a Call</span>
                <Phone size={18} />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="cta-decoration"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="decoration-ring ring-1"></div>
            <div className="decoration-ring ring-2"></div>
            <div className="decoration-ring ring-3"></div>
          </motion.div>

          <div className="floating-elements">
            <motion.div
              className="floating-element element-1"
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="floating-element element-2"
              animate={{ 
                y: [0, 15, 0],
                x: [0, -10, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className="floating-element element-3"
              animate={{ 
                y: [0, -15, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      {showContactForm && (
        <motion.div
          className="contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowContactForm(false);
            }
          }}
        >
          <motion.div
            className="contact-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h3>Get In Touch</h3>
              <button
                className="close-btn"
                onClick={() => setShowContactForm(false)}
              >
                ×
              </button>
            </div>
            <ContactForm
              isQuick={false}
              onSuccess={() => {
                setTimeout(() => setShowContactForm(false), 3000);
              }}
            />
          </motion.div>
        </motion.div>
      )}
      
      <style jsx>{`
        .cta-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .cta-background {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9) 0%, 
            rgba(26, 26, 46, 0.9) 25%,
            rgba(46, 26, 26, 0.9) 50%,
            rgba(26, 26, 46, 0.9) 75%,
            rgba(0, 0, 0, 0.9) 100%
          );
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 30px;
          padding: 80px 60px;
          position: relative;
          text-align: center;
          backdrop-filter: blur(15px);
          overflow: hidden;
        }
        
        .cta-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 30% 30%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(153, 102, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .cta-content {
          position: relative;
          z-index: 2;
        }
        
        .cta-icon {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(153, 102, 255, 0.2));
          border: 3px solid rgba(0, 245, 255, 0.3);
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 40px;
          color: #00f5ff;
          position: relative;
        }
        
        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }
        
        .cta-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 30px;
          line-height: 1.2;
        }
        
        .cta-description {
          font-size: 1.2rem;
          color: #b0b0b0;
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto 50px;
        }
        
        .cta-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 8px;
        }
        
        .stat-label {
          color: #b0b0b0;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .cta-buttons {
          display: flex;
          gap: 25px;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        
        .primary-cta {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          padding: 18px 35px;
          font-size: 1.1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        }
        
        .secondary-cta {
          background: transparent;
          border: 2px solid rgba(0, 245, 255, 0.5);
          color: #00f5ff;
          padding: 16px 35px;
          font-size: 1rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #b0b0b0;
          font-size: 0.95rem;
          padding: 12px 20px;
          background: rgba(0, 245, 255, 0.05);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 25px;
          backdrop-filter: blur(10px);
        }
        
        .contact-item svg {
          color: #00f5ff;
        }
        
        .cta-decoration {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 150px;
          height: 150px;
          z-index: 1;
        }
        
        .decoration-ring {
          position: absolute;
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 50%;
        }
        
        .ring-1 {
          width: 50px;
          height: 50px;
          top: 50px;
          left: 50px;
          border-color: rgba(0, 245, 255, 0.4);
        }
        
        .ring-2 {
          width: 100px;
          height: 100px;
          top: 25px;
          left: 25px;
          border-color: rgba(153, 102, 255, 0.3);
        }
        
        .ring-3 {
          width: 150px;
          height: 150px;
          top: 0;
          left: 0;
          border-color: rgba(0, 245, 255, 0.2);
        }
        
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }
        
        .floating-element {
          position: absolute;
          border-radius: 50%;
        }
        
        .element-1 {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(0, 245, 255, 0.1));
          top: 20%;
          left: 10%;
        }
        
        .element-2 {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, rgba(153, 102, 255, 0.3), rgba(153, 102, 255, 0.1));
          top: 70%;
          right: 15%;
        }
        
        .element-3 {
          width: 15px;
          height: 15px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.1));
          top: 40%;
          left: 20%;
        }
        
        @media (max-width: 768px) {
          .cta-background {
            padding: 35px 20px;
            border-radius: 20px;
          }
          
          .cta-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 25px;
          }
          
          .cta-title {
            font-size: 2rem;
            margin-bottom: 20px;
          }
          
          .cta-description {
            font-size: 1rem;
            margin-bottom: 25px;
            line-height: 1.6;
          }
          
          .cta-stats {
            gap: 20px;
            margin-bottom: 25px;
          }
          
          .stat-number {
            font-size: 1.8rem;
          }
          
          .stat-label {
            font-size: 0.85rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
          }
          
          .primary-cta {
            width: 100%;
            max-width: 250px;
            justify-content: center;
            padding: 14px 28px;
            font-size: 1rem;
          }
          
          .secondary-cta {
            width: 100%;
            max-width: 250px;
            justify-content: center;
            padding: 12px 28px;
            font-size: 0.9rem;
          }
          
          .contact-info {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          
          .contact-item {
            font-size: 0.9rem;
            padding: 10px 16px;
          }
          
          .cta-decoration {
            display: none;
          }
          
          .contact-modal-content {
            padding: 25px;
            width: 95%;
          }
          
          .modal-header {
            margin-bottom: 20px;
            padding-bottom: 15px;
          }
          
          .modal-header h3 {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .cta-background {
            padding: 30px 15px;
            border-radius: 15px;
          }
          
          .cta-icon {
            width: 70px;
            height: 70px;
            margin-bottom: 20px;
          }
          
          .cta-title {
            font-size: 1.7rem;
            margin-bottom: 15px;
            line-height: 1.3;
          }
          
          .cta-description {
            font-size: 0.9rem;
            margin-bottom: 25px;
          }
          
          .cta-stats {
            gap: 15px;
            margin-bottom: 25px;
          }
          
          .stat-number {
            font-size: 1.6rem;
          }
          
          .stat-label {
            font-size: 0.8rem;
          }
          
          .cta-buttons {
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .primary-cta {
            max-width: 220px;
            padding: 12px 24px;
            font-size: 0.9rem;
          }
          
          .secondary-cta {
            max-width: 220px;
            padding: 10px 24px;
            font-size: 0.85rem;
          }
          
          .contact-info {
            gap: 10px;
          }
          
          .contact-item {
            font-size: 0.85rem;
            padding: 8px 14px;
          }
          
          .contact-modal-content {
            padding: 20px;
            border-radius: 15px;
          }
          
          .modal-header {
            margin-bottom: 15px;
            padding-bottom: 12px;
          }
          
          .modal-header h3 {
            font-size: 1.3rem;
          }
          
          .close-btn {
            width: 35px;
            height: 35px;
            font-size: 1.5rem;
          }
        }
        
        .contact-modal {
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
        
        .contact-modal-content {
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
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
      `}</style>
    </section>
  );
};

export default CallToAction;
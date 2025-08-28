import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Mail,
  Phone,
  ArrowUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle footer link clicks
  const handleFooterClick = (href, name) => {
    if (href.startsWith('#')) {
      // Scroll to section
      if (href === '#') {
        scrollToTop();
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // External links
      window.open(href, '_blank');
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/sitegenit', name: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/sitegenit', name: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/sitegenit', name: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/sitegenit', name: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/sitegenit', name: 'GitHub' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="brand-logo">
              <h3 className="brand-name gradient-text">SiteGenIT</h3>
              <div className="brand-tagline">Creative Digital Solutions</div>
            </div>
            
            <p className="brand-description">
              Building exceptional digital experiences that drive growth and success.
            </p>
          </motion.div>

          <motion.div
            className="footer-navigation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="nav-title">Quick Links</h4>
            <ul className="nav-list">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={link.href} 
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFooterClick(link.href, link.name);
                    }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="contact-title">Get In Touch</h4>
            
            <div className="contact-info">
              <a 
                href="mailto:sitegenit@gmail.com" 
                className="contact-item"
              >
                <Mail size={16} />
                <span>sitegenit@gmail.com</span>
              </a>
              <a 
                href="tel:+8801571447136" 
                className="contact-item"
              >
                <Phone size={16} />
                <span>+880 1571 447 136</span>
              </a>
            </div>

            <div className="social-links">
              <h5 className="social-title">Follow Us</h5>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="social-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFooterClick(social.href, social.name);
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -3,
                      boxShadow: "0 5px 15px rgba(0, 245, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <div className="copyright-section">
              <p className="copyright">
                © 2024 SiteGenIT. All rights reserved. Made with{' '}
                <motion.span
                  className="heart"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={14} fill="#ff4757" color="#ff4757" />
                </motion.span>{' '}
                in Bangladesh.
              </p>
            </div>
            
            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
              title="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .footer {
          background: #0a0a0a;
          border-top: 1px solid rgba(0, 245, 255, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(0, 245, 255, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(153, 102, 255, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 40px;
          padding: 60px 0 30px;
          position: relative;
          z-index: 2;
        }
        
        .footer-brand {
          max-width: 400px;
        }
        
        .brand-logo {
          margin-bottom: 20px;
        }
        
        .brand-name {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 5px;
        }
        
        .brand-tagline {
          color: #00f5ff;
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.8;
        }
        
        .brand-description {
          color: #b0b0b0;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        .footer-navigation {
          min-width: 0;
        }
        
        .nav-title {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 20px;
          position: relative;
        }
        
        .nav-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 30px;
          height: 2px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
        }
        
        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .nav-link {
          color: #b0b0b0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: block;
          padding: 2px 0;
        }
        
        .nav-link:hover {
          color: #00f5ff;
          padding-left: 5px;
        }
        
        .footer-contact {
          min-width: 0;
        }
        
        .contact-title {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 20px;
          position: relative;
        }
        
        .contact-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 30px;
          height: 2px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 25px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b0b0b0;
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          padding: 4px 0;
        }
        
        .contact-item:hover {
          color: #00f5ff;
        }
        
        .contact-item svg {
          color: #00f5ff;
          flex-shrink: 0;
        }
        
        .social-title {
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 12px;
        }
        
        .social-icons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .social-link {
          width: 36px;
          height: 36px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00f5ff;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: rgba(0, 245, 255, 0.2);
          border-color: rgba(0, 245, 255, 0.6);
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(0, 245, 255, 0.1);
          padding: 20px 0;
        }
        
        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .copyright {
          color: #888;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .heart {
          display: inline-flex;
          align-items: center;
        }
        
        .scroll-to-top {
          width: 40px;
          height: 40px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00f5ff;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .scroll-to-top:hover {
          background: rgba(0, 245, 255, 0.2);
          border-color: rgba(0, 245, 255, 0.6);
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 40px 0 20px;
            text-align: center;
          }
          
          .footer-brand {
            max-width: none;
          }
          
          .brand-name {
            font-size: 1.8rem;
          }
          
          .brand-description {
            font-size: 0.9rem;
          }
          
          .nav-list {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .contact-info {
            align-items: center;
          }
          
          .social-icons {
            justify-content: center;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            gap: 15px;
          }
          
          .copyright {
            font-size: 0.8rem;
            text-align: center;
          }
        }
        
        @media (max-width: 480px) {
          .footer-content {
            padding: 30px 0 15px;
            gap: 25px;
          }
          
          .brand-name {
            font-size: 1.6rem;
          }
          
          .brand-description {
            font-size: 0.85rem;
          }
          
          .nav-list {
            gap: 12px;
          }
          
          .nav-link {
            font-size: 0.85rem;
          }
          
          .contact-item {
            font-size: 0.8rem;
          }
          
          .social-link {
            width: 32px;
            height: 32px;
          }
          
          .scroll-to-top {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
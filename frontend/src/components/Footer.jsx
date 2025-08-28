import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Footer = () => {
  const [openSections, setOpenSections] = useState({});
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Toggle dropdown sections for mobile
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle newsletter subscription
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert(`🎉 Success! Thank you for subscribing with ${email}!\n\nYou'll receive:\n• Weekly design inspiration\n• Latest industry trends\n• Exclusive project insights\n• Special offers & discounts\n\nWelcome to our community! 🚀`);
      e.target.reset();
    }
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

  // Helper function to render appropriate link component
  const renderLink = (link) => {
    // Use React Router Link for internal pages
    if (link.href.startsWith('/') || link.isRoute) {
      return (
        <Link 
          to={link.href} 
          className="footer-link"
          title={link.description}
        >
          {link.name}
        </Link>
      );
    }
    
    // Use regular anchor tag for hash links and external links
    return (
      <a 
        href={link.href} 
        className="footer-link"
        onClick={(e) => {
          e.preventDefault();
          handleFooterClick(link.href, link.name);
        }}
        title={link.description}
      >
        {link.name}
      </a>
    );
  };

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '#services', description: 'Custom websites & web apps' },
      { name: 'UI/UX Design', href: '#services', description: 'User-centered design solutions' },
      { name: 'Mobile Apps', href: '#services', description: 'iOS & Android development' },
      { name: 'Digital Marketing', href: '#services', description: 'SEO, social media & ads' },
      { name: 'E-commerce', href: '#services', description: 'Online store development' },
      { name: 'Branding & Identity', href: '#services', description: 'Logo & brand design' }
    ],
    company: [
      { name: 'About Us', href: '/about-us', description: 'Our story & mission', isRoute: true },
      { name: 'Our Team', href: '/our-team', description: 'Meet the experts', isRoute: true },
      { name: 'Our Process', href: '#process', description: 'How we work' },
      { name: 'Portfolio', href: '#portfolio', description: 'Our best work' },
      { name: 'Testimonials', href: '#testimonials', description: 'Client reviews' },
      { name: 'Careers', href: '/careers', description: 'Join our team', isRoute: true }
    ],
    resources: [
      { name: 'Blog', href: '/blog', description: 'Latest insights' },
      { name: 'Case Studies', href: '/case-studies', description: 'Detailed project stories' },
      { name: 'Free Resources', href: '/resources', description: 'Templates & guides', isRoute: true },
      { name: 'Help Center', href: '/help', description: '24/7 support' },
      { name: 'Privacy Policy', href: '/privacy-policy', description: 'Data protection', isRoute: true },
      { name: 'Terms of Service', href: '/terms-conditions', description: 'Service agreements', isRoute: true }
    ],
    quickLinks: [
      { name: 'Get Quote', href: '/quote', description: 'Free project estimate', isRoute: true },
      { name: 'Contact Us', href: '#contact', description: 'Get in touch' },
      { name: 'Schedule Meeting', href: '#contact', description: 'Book consultation' },
      { name: 'Download Portfolio', href: '/portfolio-download', description: 'PDF portfolio', isRoute: true },
      { name: 'Client Login', href: '/client-portal', description: 'Access client portal', isRoute: true },
      { name: 'Partner With Us', href: '/partnership', description: 'Collaboration opportunities', isRoute: true }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/sitegenit', name: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/sitegenit', name: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/sitegenit', name: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/sitegenit', name: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/sitegenit', name: 'GitHub' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@sitegenit.com', href: 'mailto:hello@sitegenit.com' },
    { icon: Phone, text: '+880 1571 447 136', href: 'tel:+8801571447136' },
    { icon: MapPin, text: 'Dhaka, Bangladesh', href: 'https://maps.google.com' }
  ];
  
  // Additional business info
  const businessHours = [
    { day: 'Mon - Fri', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];
  
  const certifications = [
    'Google Partner',
    'Facebook Marketing Partner',
    'Certified Developers',
    'ISO 9001:2015 Certified'
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
              We're a passionate team of creators building exceptional digital experiences 
              that drive growth and success for businesses worldwide.
            </p>

            <div className="contact-info">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="contact-item"
                  whileHover={{ scale: 1.05, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <contact.icon size={18} />
                  <span>{contact.text}</span>
                </motion.a>
              ))}
            </div>
            
            <div className="business-hours">
              <h5 className="hours-title">Business Hours</h5>
              {businessHours.map((schedule, index) => (
                <div key={index} className="hours-item">
                  <span className="day">{schedule.day}:</span>
                  <span className="time">{schedule.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="links-section">
              <div className="links-header" onClick={() => toggleSection('services')}>
                <h4 className="links-title">Services</h4>
                <button className="mobile-toggle">
                  {openSections.services ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              <ul className="links-list desktop-always-visible">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderLink(link)}
                  </motion.li>
                ))}
              </ul>
              
              <AnimatePresence>
                {openSections.services && (
                  <motion.ul
                    className="links-list mobile-dropdown"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {footerLinks.services.map((link, index) => (
                      <motion.li
                        key={`mobile-${index}`}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderLink(link)}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="links-section">
              <div className="links-header" onClick={() => toggleSection('company')}>
                <h4 className="links-title">Company</h4>
                <button className="mobile-toggle">
                  {openSections.company ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              <ul className="links-list desktop-always-visible">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderLink(link)}
                  </motion.li>
                ))}
              </ul>
              
              <AnimatePresence>
                {openSections.company && (
                  <motion.ul
                    className="links-list mobile-dropdown"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {footerLinks.company.map((link, index) => (
                      <motion.li
                        key={`mobile-${index}`}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderLink(link)}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="links-section">
              <div className="links-header" onClick={() => toggleSection('resources')}>
                <h4 className="links-title">Resources</h4>
                <button className="mobile-toggle">
                  {openSections.resources ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              <ul className="links-list desktop-always-visible">
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderLink(link)}
                  </motion.li>
                ))}
              </ul>
              
              <AnimatePresence>
                {openSections.resources && (
                  <motion.ul
                    className="links-list mobile-dropdown"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {footerLinks.resources.map((link, index) => (
                      <motion.li
                        key={`mobile-${index}`}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderLink(link)}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            
            <div className="links-section">
              <div className="links-header" onClick={() => toggleSection('quickLinks')}>
                <h4 className="links-title">Quick Links</h4>
                <button className="mobile-toggle">
                  {openSections.quickLinks ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              <ul className="links-list desktop-always-visible">
                {footerLinks.quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderLink(link)}
                  </motion.li>
                ))}
              </ul>
              
              <AnimatePresence>
                {openSections.quickLinks && (
                  <motion.ul
                    className="links-list mobile-dropdown"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {footerLinks.quickLinks.map((link, index) => (
                      <motion.li
                        key={`mobile-${index}`}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderLink(link)}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="footer-newsletter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="newsletter-title">Stay Updated</h4>
            <p className="newsletter-description">
              Subscribe to our newsletter for the latest updates, insights, and exclusive offers.
            </p>
            
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="newsletter-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
            
            <div className="certifications">
              <h5 className="cert-title">Certifications</h5>
              <div className="cert-list">
                {certifications.map((cert, index) => (
                  <span key={index} className="cert-badge">
                    {cert}
                  </span>
                ))}
              </div>
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
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0, 245, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                  >
                    <social.icon size={20} />
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
                  <Heart size={16} fill="#ff4757" color="#ff4757" />
                </motion.span>{' '}
                by our amazing team in Bangladesh.
              </p>
              <p className="legal-links">
                <a href="#privacy" onClick={(e) => { e.preventDefault(); handleFooterClick('#privacy', 'Privacy Policy'); }}>Privacy Policy</a>
                <span className="separator">•</span>
                <a href="#terms" onClick={(e) => { e.preventDefault(); handleFooterClick('#terms', 'Terms of Service'); }}>Terms of Service</a>
                <span className="separator">•</span>
                <a href="#sitemap" onClick={(e) => { e.preventDefault(); alert('🗺️ Sitemap coming soon!'); }}>Sitemap</a>
                <span className="separator">•</span>
                <a href="#accessibility" onClick={(e) => { e.preventDefault(); alert('We are committed to accessibility. Contact us for assistance.'); }}>Accessibility</a>
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
              <ArrowUp size={20} />
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
          grid-template-columns: 1.2fr 3fr 1fr;
          gap: 60px;
          padding: 80px 0 40px;
          position: relative;
          z-index: 2;
        }
        
        .footer-brand {
          max-width: 350px;
        }
        
        .brand-logo {
          margin-bottom: 25px;
        }
        
        .brand-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 8px;
        }
        
        .brand-tagline {
          color: #00f5ff;
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.8;
        }
        
        .brand-description {
          color: #b0b0b0;
          line-height: 1.7;
          margin-bottom: 30px;
          font-size: 0.95rem;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #d0d0d0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          padding: 8px 0;
        }
        
        .contact-item:hover {
          color: #00f5ff;
        }
        
        .contact-item svg {
          color: #00f5ff;
          flex-shrink: 0;
        }
        
        .business-hours {
          margin-top: 30px;
        }
        
        .hours-title {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 15px;
        }
        
        .hours-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 0;
          font-size: 0.85rem;
        }
        
        .day {
          color: #b0b0b0;
        }
        
        .time {
          color: #00f5ff;
          font-weight: 500;
        }
        
        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        
        .links-section {
          min-width: 0;
        }
        
        .links-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .links-title {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 25px;
          position: relative;
        }
        
        .links-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 30px;
          height: 2px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
        }
        
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #00f5ff;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .mobile-toggle:hover {
          background: rgba(0, 245, 255, 0.1);
        }
        
        .links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .footer-link {
          color: #b0b0b0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: block;
          padding: 2px 0;
        }
        
        .footer-link:hover {
          color: #00f5ff;
          padding-left: 5px;
        }
        
        .footer-newsletter {
          max-width: 300px;
        }
        
        .newsletter-title {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .newsletter-description {
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .newsletter-form {
          margin-bottom: 30px;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .newsletter-input {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .newsletter-input:focus {
          outline: none;
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
        }
        
        .newsletter-input::placeholder {
          color: #666;
        }
        
        .newsletter-btn {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .newsletter-btn:hover {
          box-shadow: 0 0 30px rgba(0, 245, 255, 0.4);
        }
        
        .certifications {
          margin: 25px 0;
        }
        
        .cert-title {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 15px;
        }
        
        .cert-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .cert-badge {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 12px;
          padding: 6px 10px;
          font-size: 0.8rem;
          color: #00f5ff;
          text-align: center;
        }
        
        .social-title {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 15px;
        }
        
        .social-icons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .social-link {
          width: 44px;
          height: 44px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 12px;
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
          padding: 30px 0;
        }
        
        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .copyright {
          color: #888;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .legal-links {
          margin-top: 10px;
          font-size: 0.85rem;
        }
        
        .legal-links a {
          color: #888;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .legal-links a:hover {
          color: #00f5ff;
        }
        
        .separator {
          margin: 0 12px;
          color: #555;
        }
        
        .heart {
          display: inline-flex;
          align-items: center;
        }
        
        .scroll-to-top {
          width: 50px;
          height: 50px;
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
        
        .desktop-always-visible {
          display: block;
        }
        
        .mobile-dropdown {
          display: none;
        }
        
        .links-section {
          position: relative;
        }
        
        .links-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          cursor: default;
          pointer-events: none;
        }
        
        .links-title {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0;
          position: relative;
        }
        
        .links-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
          border-radius: 1px;
        }
        
        .links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .links-list li {
          margin-bottom: 8px;
        }
        
        .footer-link {
          color: #b0b0b0;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
        }
        
        .footer-link:hover {
          color: #00f5ff;
          transform: translateX(5px);
        }
        
        .footer-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00f5ff;
          transition: width 0.3s ease;
        }
        
        .footer-link:hover::before {
          width: 100%;
        }
        
        .mobile-toggle {
          display: none;
        }
        
        /* MOBILE VIEW - DROPDOWN FUNCTIONALITY */
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 40px 0 20px;
            text-align: center;
          }
          
          .footer-brand {
            max-width: none;
          }
          
          .brand-name {
            font-size: 1.8rem;
            margin-bottom: 5px;
          }
          
          .brand-description {
            font-size: 0.9rem;
            margin-bottom: 20px;
          }
          
          .contact-info {
            align-items: center;
            margin-bottom: 20px;
          }
          
          .contact-item {
            font-size: 0.85rem;
            padding: 6px 0;
          }
          
          /* Hide business hours on mobile */
          .business-hours {
            display: none;
          }
          
          /* Hide desktop links and enable mobile dropdowns */
          .desktop-always-visible {
            display: none;
          }
          
          .mobile-dropdown {
            display: block;
          }
          
          /* Enable dropdown functionality for footer links */
          .footer-links {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .links-header {
            background: rgba(15, 15, 20, 0.8);
            padding: 16px 20px;
            border-radius: 12px;
            border: 1px solid rgba(0, 245, 255, 0.25);
            margin-bottom: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            pointer-events: auto;
          }
          
          .links-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.15), transparent);
            transition: left 0.6s ease;
          }
          
          .links-header:hover::before {
            left: 100%;
          }
          
          .links-header:hover {
            background: rgba(20, 25, 30, 0.95);
            border-color: rgba(0, 245, 255, 0.6);
            box-shadow: 0 6px 20px rgba(0, 245, 255, 0.25);
            transform: translateY(-3px) scale(1.02);
          }
          
          .links-header:active {
            transform: translateY(-1px) scale(1.01);
            box-shadow: 0 3px 12px rgba(0, 245, 255, 0.35);
            background: rgba(25, 30, 35, 0.95);
          }
          
          .links-title {
            font-size: 1.1rem;
            margin-bottom: 0;
          }
          
          .links-title::after {
            display: none;
          }
          
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 245, 255, 0.1);
            border: 1px solid rgba(0, 245, 255, 0.3);
            border-radius: 8px;
            padding: 6px;
            color: #00f5ff;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 32px;
            height: 32px;
          }
          
          .mobile-toggle:hover {
            background: rgba(0, 245, 255, 0.2);
            border-color: rgba(0, 245, 255, 0.5);
            transform: scale(1.1);
          }
          
          .links-list {
            overflow: hidden;
            background: rgba(12, 12, 15, 0.9);
            border-radius: 0 0 12px 12px;
            border: 1px solid rgba(0, 245, 255, 0.2);
            border-top: none;
            margin-top: 0;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          }
          
          .footer-link {
            font-size: 0.9rem;
            padding: 12px 18px;
            border-bottom: 1px solid rgba(0, 245, 255, 0.1);
            display: block;
            color: #d0d0d0;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .footer-link::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            height: 100%;
            background: linear-gradient(90deg, rgba(0, 245, 255, 0.1), rgba(0, 245, 255, 0.05));
            transition: width 0.3s ease;
            z-index: 0;
          }
          
          .footer-link:last-child {
            border-bottom: none;
            border-radius: 0 0 12px 12px;
          }
          
          .footer-link:hover {
            background: rgba(0, 245, 255, 0.08);
            color: #ffffff;
            padding-left: 25px;
            transform: translateX(5px);
          }
          
          .footer-link:hover::before {
            width: 100%;
          }
          
          .footer-link:active {
            background: rgba(0, 245, 255, 0.15);
            transform: translateX(2px);
          }
          
          /* Simplify newsletter section */
          .footer-newsletter {
            max-width: none;
          }
          
          .newsletter-title {
            font-size: 1.1rem;
            margin-bottom: 10px;
          }
          
          .newsletter-description {
            font-size: 0.85rem;
            margin-bottom: 15px;
          }
          
          .input-group {
            flex-direction: row;
            gap: 8px;
          }
          
          .newsletter-input {
            flex: 1;
            padding: 10px 12px;
            font-size: 0.85rem;
          }
          
          .newsletter-btn {
            padding: 10px 16px;
            font-size: 0.85rem;
            white-space: nowrap;
          }
          
          /* Hide certifications on mobile */
          .certifications {
            display: none;
          }
          
          .social-icons {
            justify-content: center;
            gap: 10px;
          }
          
          .social-link {
            width: 36px;
            height: 36px;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            gap: 15px;
          }
          
          .copyright {
            font-size: 0.8rem;
            text-align: center;
          }
          
          /* Hide legal links on mobile */
          .legal-links {
            display: none;
          }
          
          .scroll-to-top {
            width: 40px;
            height: 40px;
          }
        }
        
        @media (max-width: 480px) {
          .footer-content {
            padding: 30px 0 15px;
            gap: 20px;
          }
          
          .brand-name {
            font-size: 1.6rem;
          }
          
          .brand-description {
            font-size: 0.85rem;
          }
          
          .contact-item {
            font-size: 0.8rem;
          }
          
          .links-list {
            gap: 12px;
          }
          
          .footer-link {
            font-size: 0.8rem;
          }
          
          .newsletter-title {
            font-size: 1rem;
          }
          
          .newsletter-description {
            font-size: 0.8rem;
          }
          
          .input-group {
            flex-direction: column;
            gap: 8px;
          }
          
          .newsletter-input,
          .newsletter-btn {
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUp,
  Mail
} from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/quote' }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/sitegenit', 
      name: 'Facebook'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/sitegenit', 
      name: 'Twitter'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/sitegenit', 
      name: 'Instagram'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/sitegenit', 
      name: 'LinkedIn'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Newsletter Section */}
        <div className="newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest updates and insights.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              <Mail size={16} />
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer-top">
          <div className="brand">
            <div className="logo">
              <span className="logo-shape" />
              <span className="logo-shape s2" />
              <span className="logo-shape s3" />
            </div>
            <div className="brand-text">
              <h3 className="brand-name">SiteGenIT</h3>
              <p className="brand-desc">Crafting modern web solutions & communities.</p>
            </div>
          </div>

          <nav className="nav">
            {quickLinks.map((l, i) => (
              <a
                key={i}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
                className="nav-link"
              >
                {l.name}
              </a>
            ))}
          </nav>

          <div className="social">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                onClick={(e) => { e.preventDefault(); handleClick(social.href); }}
                className="social-btn"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                title={social.name}
              >
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="divider" />

        <div className="footer-bottom">
          <p className="copyright">© 2025 SiteGenIT. All rights reserved.</p>
          <div className="legal-links">
            <a href="/privacy-policy" className="legal-link">Privacy Policy</a>
            <a href="/terms-conditions" className="legal-link">Terms & Conditions</a>
            <a href="/resources" className="legal-link">Free Resources</a>
            <a href="/portfolio-download" className="legal-link">Portfolio Download</a>
            <Link to="/client-portal" className="legal-link">Client Portal</Link>
          </div>
          <button className="to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

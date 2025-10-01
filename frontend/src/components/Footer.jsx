import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
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
            {['Privacy','Terms','Legal','Site Map'].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase().replace(/ /g,'')}`}
                onClick={(e)=>{ e.preventDefault(); handleClick(`#${item.toLowerCase().replace(/ /g,'')}`); }}
              >{item}</a>
            ))}
          </div>
          <button className="to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          position: relative;
          background:#0a0a0a;
          padding: 40px 0 24px;
          font-size:14px;
          overflow:hidden;
        }
        /* Animated top gradient bar */
        .footer-container::before {
          content:'';
          position:absolute;top:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,#00f5ff,#0066ff,#9966ff,#00f5ff);
          background-size:200% 100%;
          animation:moveGradient 6s linear infinite;
        }
        @keyframes moveGradient {0%{background-position:0 0;}100%{background-position:200% 0;}}
        .footer-inner {max-width:1200px;margin:0 auto;padding:0 24px;position:relative;}
        /* Subtle grid overlay for creativity */
        .footer-inner::before {content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(255,255,255,0.03)0 1px,transparent 1px 120px),repeating-linear-gradient(180deg,rgba(255,255,255,0.02)0 1px,transparent 1px 80px);mask:linear-gradient(to bottom,rgba(0,0,0,0.4),transparent 70%);}        
        .footer-top {display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap;}
        .brand {display:flex;align-items:center;gap:16px;position:relative;}
        .logo {position:relative;width:42px;height:42px;}
        .logo-shape {position:absolute;width:16px;height:16px;border-radius:4px;background:linear-gradient(135deg,#00f5ff,#0066ff);box-shadow:0 0 10px rgba(0,245,255,0.4);}        
        .logo-shape.s2 {top:10px;left:18px;background:linear-gradient(135deg,#0066ff,#9966ff);}
        .logo-shape.s3 {bottom:0;left:4px;width:14px;height:14px;background:linear-gradient(135deg,#9966ff,#00f5ff);}        
        .brand-name {font-size:1.1rem;margin:0;font-weight:600;letter-spacing:.5px;background:linear-gradient(135deg,#00f5ff,#0066ff,#9966ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .brand-desc {margin:2px 0 0;color:#b0b0b0;font-size:12px;max-width:180px;line-height:1.3;}
        .nav {display:flex;flex-wrap:wrap;gap:20px;}
        .nav-link {color:#b0b0b0;text-decoration:none;position:relative;padding:4px 0;transition:.3s;}
        .nav-link::after {content:'';position:absolute;left:0;bottom:0;width:0;height:2px;background:linear-gradient(90deg,#00f5ff,#0066ff);transition:width .3s;}
        .nav-link:hover {color:#fff;}
        .nav-link:hover::after {width:100%;}
        .social {display:flex;gap:10px;}
        .social-btn {width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,245,255,0.2);display:flex;align-items:center;justify-content:center;color:#00f5ff;text-decoration:none;backdrop-filter:blur(6px);transition:.35s;}
        .social-btn:hover {background:rgba(0,245,255,0.12);border-color:rgba(0,245,255,0.5);box-shadow:0 0 12px rgba(0,245,255,0.4);}
        .divider {height:1px;margin:28px 0;background:linear-gradient(90deg,transparent,#1f2933,transparent);}
        .footer-bottom {display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}
        .copyright {color:#6d6d6d;margin:0;font-size:12px;}
        .legal-links {display:flex;flex-wrap:wrap;gap:18px;}
        .legal-links a {color:#6d6d6d;text-decoration:none;font-size:12px;position:relative;transition:.3s;}
        .legal-links a:hover {color:#fff;}
        .to-top {width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00f5ff,#0066ff);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.35s;box-shadow:0 4px 18px -4px rgba(0,245,255,0.4);}        
        .to-top:hover {transform:translateY(-3px);box-shadow:0 8px 22px -6px rgba(0,245,255,0.6);}        
        @media (max-width: 820px) {
          .footer-container {padding:34px 0 20px;}
          .brand-desc {display:none;}
          .nav {gap:14px;}
        }
        @media (max-width:560px) {
          .footer-top {flex-direction:column;align-items:flex-start;gap:24px;}
          .nav {gap:18px;}
          .footer-bottom {flex-direction:column;align-items:flex-start;gap:16px;}
          .legal-links {gap:14px;}
          .to-top {align-self:flex-start;}
        }
      `}</style>
    </footer>
  );
};

export default Footer;
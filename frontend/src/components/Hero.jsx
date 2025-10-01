import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Digital', 'Creative', 'Marketing', 'Branding', 'Innovation'];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  // Handle button clicks
  const handleStartProject = () => {
    // Navigate directly to the quote page using React Router
    navigate('/quote');
  };
  
  const handleViewWork = () => {
    const portfolio = document.querySelector('#portfolio');
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to approximate position if portfolio section not found
      window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
    }
  };

  // Create floating particles
  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <motion.div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${6 + Math.random() * 4}s`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: Math.random() * 2 }}
      />
    ));
  };

  return (
    <section className="hero-section">
      {/* Hidden H1 for SEO purposes */}
      <h1 style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        Digital Agency - Professional Web Development & Digital Marketing Services
      </h1>
      
      <div className="particles-bg">
        {createParticles()}
      </div>
      
      <div className="hero-gradient-overlay"></div>
      
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="hero-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            We Create{' '}
            <span className="gradient-text">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {words[currentWord]}
              </motion.span>
            </span>
            <br />
            Experiences
          </motion.h2>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Transform your ideas into extraordinary digital experiences with our cutting-edge solutions. 
            We're not just an agency - we're your creative partners in innovation.
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <button className="neon-button primary" onClick={handleStartProject}>
              Start Your Project
            </button>
            <button className="neon-button secondary" onClick={handleViewWork}>
              View Our Work
            </button>
          </motion.div>
          
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="stat">
              <span className="stat-number gradient-text">150+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat">
              <span className="stat-number gradient-text">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat">
              <span className="stat-number gradient-text">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="hero-3d-element"
          animate={{ 
            y: [0, -20, 0],
            rotateX: [0, 5, 0],
            rotateY: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="floating-cube">
            <div className="cube-face front">A</div>
            <div className="cube-face back">G</div>
            <div className="cube-face right">E</div>
            <div className="cube-face left">N</div>
            <div className="cube-face top">C</div>
            <div className="cube-face bottom">Y</div>
          </div>
        </motion.div>
        
        {/* Additional Floating Elements */}
        <motion.div
          className="hero-logo-cube"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="logo-cube-3d">
            <div className="logo-face front">A</div>
            <div className="logo-face back">G</div>
            <div className="logo-face right">E</div>
            <div className="logo-face left">N</div>
            <div className="logo-face top">C</div>
            <div className="logo-face bottom">Y</div>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%);
          overflow: hidden;
          padding-top: 80px;
        }
        
        .hero-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(153, 102, 255, 0.1) 100%);
          pointer-events: none;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 30px;
          color: #ffffff;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          color: #b0b0b0;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }
        
        .neon-button.secondary {
          background: transparent;
          border: 2px solid rgba(0, 245, 255, 0.5);
          color: #00f5ff;
        }
        
        .neon-button.secondary:hover {
          background: rgba(0, 245, 255, 0.1);
          box-shadow: 0 0 30px rgba(0, 245, 255, 0.3);
        }
        
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
        }
        
        .stat-label {
          color: #b0b0b0;
          font-size: 0.9rem;
          margin-top: 5px;
        }
        
        .hero-3d-element {
          position: absolute;
          top: 20%;
          right: 10%;
          z-index: 1;
        }
        
        .floating-cube {
          width: 120px;
          height: 120px;
          position: relative;
          transform-style: preserve-3d;
        }
        
        .cube-face {
          position: absolute;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(153, 102, 255, 0.2));
          border: 1px solid rgba(0, 245, 255, 0.3);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          color: #00f5ff;
          text-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
        }
        
        .cube-face.front { transform: rotateY(0deg) translateZ(60px); }
        .cube-face.back { transform: rotateY(180deg) translateZ(60px); }
        .cube-face.right { transform: rotateY(90deg) translateZ(60px); }
        .cube-face.left { transform: rotateY(-90deg) translateZ(60px); }
        .cube-face.top { transform: rotateX(90deg) translateZ(60px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(60px); }
        
        /* Additional Logo Cube */
        .hero-logo-cube {
          position: absolute;
          top: 60%;
          left: 15%;
          z-index: 1;
          perspective: 1000px;
        }
        
        .logo-cube-3d {
          width: 80px;
          height: 80px;
          position: relative;
          transform-style: preserve-3d;
        }
        
        .logo-face {
          position: absolute;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 900;
          color: #ffffff;
          text-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
        }
        
        .logo-face.front { transform: rotateY(0deg) translateZ(40px); }
        .logo-face.back { transform: rotateY(180deg) translateZ(40px); }
        .logo-face.right { transform: rotateY(90deg) translateZ(40px); }
        .logo-face.left { transform: rotateY(-90deg) translateZ(40px); }
        .logo-face.top { transform: rotateX(90deg) translateZ(40px); }
        .logo-face.bottom { transform: rotateX(-90deg) translateZ(40px); }
        
        @media (max-width: 768px) {
          .hero-section {
            min-height: 85vh;
            padding-top: 70px;
            padding-left: 0;
            padding-right: 0;
          }
          
          .hero-content {
            padding: 0 15px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
          
          .hero-title {
            font-size: 2.2rem;
            margin-bottom: 20px;
            line-height: 1.2;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          
          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 30px;
            line-height: 1.4;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 12px;
            margin-bottom: 30px;
            width: 100%;
          }
          
          .hero-buttons button {
            width: 100%;
            max-width: 280px;
            padding: 14px 20px;
            font-size: 0.95rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .hero-stats {
            gap: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .stat-number {
            font-size: 1.8rem;
          }
          
          .stat-label {
            font-size: 0.8rem;
          }
          
          .hero-3d-element,
          .hero-logo-cube {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section {
            min-height: 80vh;
            padding-top: 60px;
            padding-left: 0;
            padding-right: 0;
          }
          
          .hero-content {
            padding: 0 10px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }
          
          .hero-title {
            font-size: 1.8rem;
            margin-bottom: 15px;
            line-height: 1.1;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          
          .hero-subtitle {
            font-size: 0.9rem;
            margin-bottom: 25px;
            line-height: 1.3;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          
          .hero-buttons {
            margin-bottom: 25px;
            width: 100%;
          }
          
          .hero-buttons button {
            padding: 12px 18px;
            font-size: 0.9rem;
            max-width: 260px;
          }
          
          .hero-stats {
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .stat {
            min-width: 80px;
            flex: 1;
            max-width: 100px;
          }
          
          .stat-number {
            font-size: 1.5rem;
          }
          
          .stat-label {
            font-size: 0.75rem;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
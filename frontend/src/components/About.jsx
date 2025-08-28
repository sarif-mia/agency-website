import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="about-section section" id="about">
      <div className="container">
        <div className="about-content">
          <motion.div
            className="about-illustration"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="illustration-container">
              <motion.div
                className="illustration-element primary"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="element-inner"></div>
              </motion.div>
              
              <motion.div
                className="illustration-element secondary"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="element-inner"></div>
              </motion.div>
              
              <motion.div
                className="illustration-element tertiary"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="element-inner"></div>
              </motion.div>
              
              <div className="glow-effect"></div>
            </div>
          </motion.div>
          
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="section-title gradient-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              About Our Agency
            </motion.h1>
            
            <motion.p
              className="about-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            >
              We are a passionate team of creators, strategists, and innovators dedicated to 
              transforming your digital presence. With over 5 years of experience in the industry, 
              we've helped hundreds of businesses achieve their goals through cutting-edge design 
              and development solutions.
            </motion.p>
            
            <motion.div
              className="about-features"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="feature">
                <div className="feature-icon">
                  <span>🎨</span>
                </div>
                <div className="feature-content">
                  <h4>Creative Excellence</h4>
                  <p>Award-winning designs that captivate and convert</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <span>⚡</span>
                </div>
                <div className="feature-content">
                  <h4>Lightning Fast</h4>
                  <p>Optimized performance for the best user experience</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <span>🚀</span>
                </div>
                <div className="feature-content">
                  <h4>Future Ready</h4>
                  <p>Built with the latest technologies and trends</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="about-cta"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <Link to="/about-us" className="neon-button">
                Learn More About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <style jsx>{`
        .about-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
          position: relative;
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          min-height: 600px;
        }
        
        .illustration-container {
          position: relative;
          width: 400px;
          height: 400px;
          margin: 0 auto;
          perspective: 1000px;
        }
        
        .illustration-element {
          position: absolute;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        
        .illustration-element.primary {
          width: 200px;
          height: 200px;
          top: 50px;
          left: 50px;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(0, 102, 255, 0.3));
          border: 2px solid rgba(0, 245, 255, 0.5);
        }
        
        .illustration-element.secondary {
          width: 120px;
          height: 120px;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, rgba(153, 102, 255, 0.3), rgba(255, 102, 255, 0.3));
          border: 2px solid rgba(153, 102, 255, 0.5);
        }
        
        .illustration-element.tertiary {
          width: 80px;
          height: 80px;
          bottom: 40px;
          left: 20px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.3));
          border: 2px solid rgba(255, 215, 0, 0.5);
          border-radius: 50%;
        }
        
        .element-inner {
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: inherit;
          opacity: 0.6;
        }
        
        .glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        .about-text {
          padding-left: 40px;
        }
        
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .about-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #b0b0b0;
          margin-bottom: 40px;
        }
        
        .about-features {
          margin-bottom: 40px;
        }
        
        .feature {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          padding: 20px;
          background: rgba(20, 20, 20, 0.5);
          border-radius: 15px;
          border: 1px solid rgba(0, 245, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .feature:hover {
          border-color: rgba(0, 245, 255, 0.3);
          background: rgba(20, 20, 20, 0.8);
          transform: translateX(10px);
        }
        
        .feature-icon {
          font-size: 2rem;
          margin-right: 20px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(153, 102, 255, 0.2));
          border-radius: 15px;
          border: 1px solid rgba(0, 245, 255, 0.3);
        }
        
        .feature-content h4 {
          color: #ffffff;
          font-size: 1.2rem;
          margin-bottom: 5px;
          font-weight: 600;
        }
        
        .feature-content p {
          color: #b0b0b0;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .about-cta {
          margin-top: 30px;
        }
        
        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
          }
          
          .about-text {
            padding-left: 0;
          }
          
          .section-title {
            text-align: center;
            font-size: 1.8rem;
            margin-bottom: 20px;
          }
          
          .about-description {
            font-size: 0.95rem;
            margin-bottom: 20px;
            line-height: 1.6;
          }
          
          .about-features {
            margin-bottom: 20px;
          }
          
          .illustration-container {
            width: 250px;
            height: 250px;
          }
          
          .illustration-element.primary {
            width: 120px;
            height: 120px;
            top: 30px;
            left: 30px;
          }
          
          .illustration-element.secondary {
            width: 70px;
            height: 70px;
            top: 10px;
            right: 10px;
          }
          
          .illustration-element.tertiary {
            width: 50px;
            height: 50px;
            bottom: 20px;
            left: 10px;
          }
          
          .feature {
            flex-direction: column;
            text-align: center;
            margin-bottom: 15px;
            padding: 15px;
          }
          
          .feature-icon {
            margin-right: 0;
            margin-bottom: 10px;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }
          
          .feature-content h4 {
            font-size: 1.1rem;
            margin-bottom: 5px;
          }
          
          .feature-content p {
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 480px) {
          .about-content {
            gap: 20px;
          }
          
          .section-title {
            font-size: 1.6rem;
            margin-bottom: 15px;
          }
          
          .about-description {
            font-size: 0.9rem;
            margin-bottom: 20px;
          }
          
          .about-features {
            margin-bottom: 20px;
          }
          
          .illustration-container {
            width: 200px;
            height: 200px;
          }
          
          .illustration-element.primary {
            width: 100px;
            height: 100px;
            top: 25px;
            left: 25px;
          }
          
          .illustration-element.secondary {
            width: 60px;
            height: 60px;
            top: 8px;
            right: 8px;
          }
          
          .illustration-element.tertiary {
            width: 40px;
            height: 40px;
            bottom: 15px;
            left: 8px;
          }
          
          .feature {
            margin-bottom: 12px;
            padding: 12px;
          }
          
          .feature-icon {
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
            margin-bottom: 8px;
          }
          
          .feature-content h4 {
            font-size: 1rem;
          }
          
          .feature-content p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
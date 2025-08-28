import React from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Code2, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Process = () => {
  const navigate = useNavigate();
  
  // Handle get started button
  const handleGetStarted = () => {
    // Navigate directly to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: navigate to quote page using React Router
      navigate('/quote');
    }
  };
  const steps = [
    {
      id: 1,
      icon: Search,
      title: 'Discovery & Research',
      description: 'We dive deep into understanding your business goals, target audience, and market landscape to create a solid foundation.',
      details: ['Market Analysis', 'User Research', 'Competitor Study', 'Goal Definition']
    },
    {
      id: 2,
      icon: Lightbulb,
      title: 'Strategy & Planning',
      description: 'Based on our research, we develop a comprehensive strategy and detailed project roadmap for success.',
      details: ['Strategic Planning', 'Wireframing', 'Architecture Design', 'Timeline Creation']
    },
    {
      id: 3,
      icon: Code2,
      title: 'Design & Development',
      description: 'Our expert team brings your vision to life with cutting-edge design and robust development practices.',
      details: ['UI/UX Design', 'Frontend Development', 'Backend Development', 'Quality Assurance']
    },
    {
      id: 4,
      icon: Rocket,
      title: 'Launch & Optimize',
      description: 'We ensure a smooth launch and provide ongoing optimization to maximize your digital presence and performance.',
      details: ['Deployment', 'Performance Testing', 'Analytics Setup', 'Ongoing Support']
    }
  ];

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3 + 0.8,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="process-section section" id="process">
      <div className="container">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="section-title gradient-text">Our Process</h1>
          <p className="section-subtitle">
            We follow a proven methodology to ensure every project delivers exceptional results
          </p>
        </motion.div>

        <div className="process-timeline">
          <motion.svg
            className="timeline-line"
            viewBox="0 0 800 400"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#9966ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M 100 200 Q 250 100 400 200 Q 550 300 700 200"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              variants={lineVariants}
            />
          </motion.svg>

          <div className="process-steps">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`process-step step-${index + 1}`}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={stepVariants}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="step-indicator">
                  <div className="step-number">{step.id}</div>
                  <motion.div
                    className="step-icon"
                    whileHover={{ 
                      rotate: 360,
                      transition: { duration: 0.8 }
                    }}
                  >
                    <step.icon size={24} />
                    <div className="icon-glow"></div>
                  </motion.div>
                </div>

                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  
                  <ul className="step-details">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        className="detail-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3 + 1.2 + idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="detail-bullet">•</span>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="step-glow"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="process-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <h3 className="cta-title">Ready to Start Your Project?</h3>
          <p className="cta-description">
            Let's work together to bring your vision to life through our proven process
          </p>
          <button className="neon-button" onClick={handleGetStarted}>
            Get Started Today
          </button>
        </motion.div>
      </div>
      
      <style jsx>{`
        .process-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .process-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at center, rgba(0, 245, 255, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .process-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .process-timeline {
          position: relative;
          margin-bottom: 80px;
        }
        
        .timeline-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 400px;
          z-index: 1;
          pointer-events: none;
        }
        
        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 2;
        }
        
        .process-step {
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        
        .process-step:hover {
          border-color: rgba(0, 245, 255, 0.6);
          background: rgba(20, 20, 20, 0.9);
          box-shadow: 
            0 20px 40px rgba(0, 245, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .process-step:hover .step-glow {
          opacity: 1;
        }
        
        .step-indicator {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }
        
        .step-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
        }
        
        .step-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(153, 102, 255, 0.2));
          border: 2px solid rgba(0, 245, 255, 0.3);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00f5ff;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .process-step:hover .icon-glow {
          opacity: 1;
        }
        
        .step-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 15px;
          line-height: 1.3;
        }
        
        .step-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }
        
        .step-details {
          list-style: none;
        }
        
        .detail-item {
          color: #d0d0d0;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }
        
        .detail-bullet {
          color: #00f5ff;
          font-size: 1.2rem;
          margin-right: 10px;
          line-height: 1;
        }
        
        .step-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(0, 245, 255, 0.05) 0%, 
            rgba(153, 102, 255, 0.05) 50%, 
            rgba(0, 245, 255, 0.05) 100%);
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .process-cta {
          text-align: center;
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 20px;
          padding: 50px 40px;
          backdrop-filter: blur(10px);
        }
        
        .cta-title {
          font-size: 2rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .cta-description {
          color: #b0b0b0;
          font-size: 1.1rem;
          margin-bottom: 30px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .process-header {
            margin-bottom: 50px;
          }
          
          .section-title {
            font-size: 2rem;
            margin-bottom: 15px;
          }
          
          .section-subtitle {
            font-size: 0.95rem;
          }
          
          .process-timeline {
            margin-bottom: 50px;
          }
          
          .process-steps {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .timeline-line {
            display: none;
          }
          
          .process-step {
            padding: 20px 15px;
          }
          
          .step-indicator {
            gap: 10px;
            margin-bottom: 20px;
          }
          
          .step-number {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
          
          .step-icon {
            width: 45px;
            height: 45px;
          }
          
          .step-title {
            font-size: 1.2rem;
            margin-bottom: 12px;
          }
          
          .step-description {
            font-size: 0.9rem;
            margin-bottom: 15px;
            line-height: 1.5;
          }
          
          .detail-item {
            font-size: 0.85rem;
            margin-bottom: 6px;
          }
          
          .process-cta {
            padding: 30px 20px;
          }
          
          .cta-title {
            font-size: 1.6rem;
            margin-bottom: 12px;
          }
          
          .cta-description {
            font-size: 0.95rem;
            margin-bottom: 25px;
          }
        }
        
        @media (max-width: 480px) {
          .process-header {
            margin-bottom: 40px;
          }
          
          .section-title {
            font-size: 1.8rem;
            margin-bottom: 12px;
          }
          
          .section-subtitle {
            font-size: 0.9rem;
          }
          
          .process-timeline {
            margin-bottom: 40px;
          }
          
          .process-steps {
            gap: 15px;
          }
          
          .process-step {
            padding: 18px 12px;
          }
          
          .step-indicator {
            gap: 8px;
            margin-bottom: 15px;
          }
          
          .step-number {
            width: 30px;
            height: 30px;
            font-size: 0.9rem;
          }
          
          .step-icon {
            width: 40px;
            height: 40px;
          }
          
          .step-title {
            font-size: 1.1rem;
            margin-bottom: 10px;
          }
          
          .step-description {
            font-size: 0.85rem;
            margin-bottom: 12px;
          }
          
          .detail-item {
            font-size: 0.8rem;
            margin-bottom: 5px;
          }
          
          .process-cta {
            padding: 25px 15px;
          }
          
          .cta-title {
            font-size: 1.4rem;
            margin-bottom: 10px;
          }
          
          .cta-description {
            font-size: 0.9rem;
            margin-bottom: 20px;
            line-height: 1.5;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;
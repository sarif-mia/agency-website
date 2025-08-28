import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Award, Heart, Globe, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/seoConfig';

const AboutUsPage = () => {
  // Get SEO configuration for about page
  const aboutSEO = getPageSEO('about');
  
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Visionary leader with 10+ years in digital innovation. Passionate about transforming businesses through technology.',
      expertise: ['Strategic Planning', 'Digital Transformation', 'Team Leadership']
    },
    {
      id: 2,
      name: 'Sarah Chen',
      position: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning designer with expertise in brand identity and user experience design.',
      expertise: ['UI/UX Design', 'Brand Strategy', 'Creative Direction']
    },
    {
      id: 3,
      name: 'Shahin Imran',
      position: 'Lead Developer & Partner',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      bio: 'Senior full-stack developer and technical partner specializing in modern web technologies and scalable architectures. Expert in React, Node.js, and cloud deployment.',
      expertise: ['React/Next.js', 'Node.js/Django', 'Cloud Architecture', 'Mobile Development']
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      position: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Full-stack developer specializing in modern web technologies and scalable architectures.',
      expertise: ['React/Node.js', 'Cloud Architecture', 'DevOps']
    },
    {
      id: 5,
      name: 'Emma Thompson',
      position: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Digital marketing expert focused on data-driven strategies and growth optimization.',
      expertise: ['Digital Marketing', 'SEO/SEM', 'Analytics']
    }
  ];

  const achievements = [
    { icon: Award, number: '15+', label: 'Industry Awards', description: 'Recognition for excellence in design and development' },
    { icon: Users, number: '200+', label: 'Happy Clients', description: 'Businesses transformed with our solutions' },
    { icon: Globe, number: '25+', label: 'Countries Served', description: 'Global reach with local expertise' },
    { icon: Calendar, number: '5+', label: 'Years Experience', description: 'Proven track record in digital innovation' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation & Creativity',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that set our clients apart from the competition.'
    },
    {
      icon: Heart,
      title: 'Client-First Approach',
      description: 'Your success is our success. We prioritize understanding your needs and delivering solutions that exceed expectations.'
    },
    {
      icon: Award,
      title: 'Quality & Excellence',
      description: 'We maintain the highest standards in every project, ensuring quality that stands the test of time.'
    },
    {
      icon: Users,
      title: 'Transparent Communication',
      description: 'We believe in open, honest communication throughout every project phase, keeping you informed and involved.'
    }
  ];

  return (
    <div className="about-us-page">
      <SEO 
        title={aboutSEO.title}
        description={aboutSEO.description}
        keywords={aboutSEO.keywords}
        url={aboutSEO.url}
        structuredData={aboutSEO.structuredData}
      />
      <div className="container">
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

        {/* Hero Section */}
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">About SiteGenIT</h1>
          <p className="page-subtitle">
            Empowering businesses with innovative digital solutions since 2019
          </p>
        </motion.header>

        {/* Company Info */}
        <motion.section
          className="company-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="info-grid">
            <div className="info-card">
              <Calendar size={32} />
              <h3>Founded in 2019</h3>
              <p>Born from a passion to revolutionize digital experiences</p>
            </div>
            <div className="info-card">
              <MapPin size={32} />
              <h3>Headquartered in Dhaka</h3>
              <p>Based in Bangladesh, serving clients worldwide</p>
            </div>
            <div className="info-card">
              <Users size={32} />
              <h3>26+ Team Members</h3>
              <p>Creative professionals dedicated to your success</p>
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          className="mission-vision"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mission-vision-grid">
            <div className="mission-card">
              <Target size={48} />
              <h2>Our Mission</h2>
              <p>
                To empower businesses with innovative digital solutions that drive growth and create lasting impact. 
                We believe technology should be accessible, beautiful, and transformative.
              </p>
            </div>
            <div className="vision-card">
              <Globe size={48} />
              <h2>Our Vision</h2>
              <p>
                To be the leading digital agency that transforms how businesses connect with their audiences, 
                creating meaningful experiences that drive success in the digital age.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section
          className="core-values"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="value-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          className="achievements"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="section-title">Our Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className="achievement-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <div className="achievement-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="achievement-number">{achievement.number}</h3>
                  <h4 className="achievement-label">{achievement.label}</h4>
                  <p className="achievement-description">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="team-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="image-overlay"></div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-expertise">
                    {member.expertise.map((skill, idx) => (
                      <span key={idx} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="contact-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="contact-card">
            <h2>Let's Work Together</h2>
            <p>Ready to transform your digital presence? We'd love to hear about your project.</p>
            <div className="contact-buttons">
              <Link to="/quote" className="contact-btn primary">
                Get Started
              </Link>
              <a href="mailto:sitegenit@gmail.com" className="contact-btn secondary">
                <Mail size={20} />
                Email Us
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      <style jsx>{`
        .about-us-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
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
          margin-bottom: 40px;
        }

        .back-btn:hover {
          color: #ffffff;
          transform: translateX(-5px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .page-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        .page-subtitle {
          font-size: 1.4rem;
          color: #b0b0b0;
          line-height: 1.6;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 50px;
          color: #ffffff;
        }

        /* Company Info */
        .company-info {
          margin-bottom: 100px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .info-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-10px);
        }

        .info-card svg {
          color: #00f5ff;
          margin-bottom: 20px;
        }

        .info-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .info-card p {
          color: #b0b0b0;
          line-height: 1.6;
        }

        /* Mission & Vision */
        .mission-vision {
          margin-bottom: 100px;
        }

        .mission-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }

        .mission-card, .vision-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 50px;
          position: relative;
          overflow: hidden;
        }

        .mission-card::before, .vision-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .mission-card svg, .vision-card svg {
          color: #00f5ff;
          margin-bottom: 25px;
        }

        .mission-card h2, .vision-card h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .mission-card p, .vision-card p {
          color: #b0b0b0;
          line-height: 1.8;
          font-size: 1.1rem;
        }

        /* Core Values */
        .core-values {
          margin-bottom: 100px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .value-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 35px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .value-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-5px);
        }

        .value-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 50%;
          margin-bottom: 25px;
        }

        .value-icon svg {
          color: #00f5ff;
        }

        .value-card h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .value-card p {
          color: #b0b0b0;
          line-height: 1.6;
        }

        /* Achievements */
        .achievements {
          margin-bottom: 100px;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .achievement-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .achievement-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-5px);
        }

        .achievement-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .achievement-icon svg {
          color: #00f5ff;
        }

        .achievement-number {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .achievement-label {
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .achievement-description {
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* Team Section */
        .team-section {
          margin-bottom: 100px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .team-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .team-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-10px);
        }

        .member-image {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .team-card:hover .member-image img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8));
        }

        .member-info {
          padding: 30px;
        }

        .member-info h3 {
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 5px;
        }

        .member-position {
          color: #00f5ff;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .member-bio {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .member-expertise {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .expertise-tag {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        /* Contact Section */
        .contact-section {
          margin-bottom: 60px;
        }

        .contact-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .contact-card h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .contact-card p {
          font-size: 1.2rem;
          color: #b0b0b0;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .contact-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .contact-btn.primary {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
        }

        .contact-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .contact-btn.secondary {
          background: transparent;
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
        }

        .contact-btn.secondary:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
        }

        @media (max-width: 768px) {
          .about-us-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.5rem;
          }

          .mission-vision-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .mission-card, .vision-card {
            padding: 30px;
          }

          .contact-card {
            padding: 40px 20px;
          }

          .contact-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
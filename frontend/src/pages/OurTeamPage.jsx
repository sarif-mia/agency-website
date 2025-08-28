import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Award, MapPin, Mail, Linkedin, Github, Star } from 'lucide-react';

const OurTeamPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', 'Leadership', 'Design', 'Development', 'Marketing'];

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'CEO & Founder',
      department: 'Leadership',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Visionary leader with 12+ years in digital innovation. Founded SiteGenIT to bridge cutting-edge technology with practical business solutions.',
      skills: ['Strategic Planning', 'Digital Transformation', 'Team Leadership'],
      experience: '12+ years',
      email: 'alex@sitegenit.com',
      linkedin: 'https://linkedin.com/in/alexjohnson'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      position: 'Creative Director',
      department: 'Design',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=400&h=400&fit=crop&crop=face',
      bio: 'Award-winning designer with expertise in brand identity and user experience. Featured in top design publications worldwide.',
      skills: ['UI/UX Design', 'Brand Strategy', 'Creative Direction'],
      experience: '10+ years',
      email: 'sarah@sitegenit.com',
      linkedin: 'https://linkedin.com/in/sarahchen'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      position: 'Lead Developer',
      department: 'Development',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Full-stack developer specializing in modern web technologies and scalable architectures. Expert in cloud computing.',
      skills: ['React/Node.js', 'Cloud Architecture', 'DevOps'],
      experience: '9+ years',
      email: 'michael@sitegenit.com',
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      github: 'https://github.com/michaelrodriguez'
    },
    {
      id: 4,
      name: 'Emma Thompson',
      position: 'Marketing Director',
      department: 'Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Digital marketing expert focused on data-driven strategies and growth optimization. Specialist in SEO and analytics.',
      skills: ['Digital Marketing', 'SEO/SEM', 'Analytics'],
      experience: '8+ years',
      email: 'emma@sitegenit.com',
      linkedin: 'https://linkedin.com/in/emmathompson'
    },
    {
      id: 5,
      name: 'David Park',
      position: 'Senior Frontend Developer',
      department: 'Development',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      bio: 'Frontend specialist with deep expertise in React and modern JavaScript frameworks. Passionate about user experiences.',
      skills: ['React', 'Vue.js', 'TypeScript'],
      experience: '7+ years',
      email: 'david@sitegenit.com',
      linkedin: 'https://linkedin.com/in/davidpark',
      github: 'https://github.com/davidpark'
    },
    {
      id: 6,
      name: 'Lisa Wang',
      position: 'UX/UI Designer',
      department: 'Design',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      bio: 'User experience designer with psychology background. Specializes in user research and creating intuitive experiences.',
      skills: ['User Research', 'Wireframing', 'Prototyping'],
      experience: '6+ years',
      email: 'lisa@sitegenit.com',
      linkedin: 'https://linkedin.com/in/lisawang'
    }
  ];

  const stats = [
    { number: '25+', label: 'Team Members', icon: Users },
    { number: '15+', label: 'Awards Won', icon: Award },
    { number: '50+', label: 'Countries Served', icon: MapPin },
    { number: '5+', label: 'Years Experience', icon: Star }
  ];

  const filteredTeam = selectedDepartment === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="team-page">
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

        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="header-icon">
            <Users size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Our Amazing Team</h1>
          <p className="page-description">
            Meet the talented individuals behind SiteGenIT's success. Together, we create exceptional digital experiences.
          </p>
        </motion.header>

        {/* Team Stats */}
        <motion.section
          className="team-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="stat-icon">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Department Filter */}
        <motion.section
          className="department-filter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3>Filter by Department</h3>
          <div className="filter-buttons">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`filter-btn ${selectedDepartment === dept ? 'active' : ''}`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Team Grid */}
        <motion.section
          className="team-grid-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="team-grid">
            {filteredTeam.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="card-header">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                    <div className="image-overlay">
                      <div className="social-links">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin size={18} />
                        </a>
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer">
                            <Github size={18} />
                          </a>
                        )}
                        <a href={`mailto:${member.email}`}>
                          <Mail size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="member-badge">{member.department}</div>
                </div>

                <div className="card-content">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <div className="member-experience">{member.experience} experience</div>
                  <p className="member-bio">{member.bio}</p>
                  
                  <div className="skills-section">
                    <h4>Core Skills</h4>
                    <div className="skills-list">
                      {member.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Join Team CTA */}
        <motion.section
          className="join-team-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="cta-card">
            <h2>Want to Join Our Team?</h2>
            <p>We're always looking for talented individuals who share our passion for innovation.</p>
            <div className="cta-buttons">
              <Link to="/careers" className="cta-btn primary">
                View Open Positions
              </Link>
              <a href="mailto:careers@sitegenit.com" className="cta-btn secondary">
                <Mail size={20} />
                Send Resume
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      <style jsx>{`
        .team-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 1400px;
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
          font-size: 4rem;
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
          max-width: 600px;
          margin: 0 auto;
        }

        .team-stats {
          margin-bottom: 80px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-5px);
        }

        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .stat-icon svg {
          color: #00f5ff;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .stat-label {
          color: #b0b0b0;
          font-size: 1rem;
        }

        .department-filter {
          text-align: center;
          margin-bottom: 60px;
        }

        .department-filter h3 {
          font-size: 1.8rem;
          margin-bottom: 30px;
          color: #ffffff;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 25px;
          padding: 12px 24px;
          color: #00f5ff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .filter-btn:hover {
          background: rgba(0, 245, 255, 0.1);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          border-color: transparent;
        }

        .team-grid-section {
          margin-bottom: 100px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .team-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 25px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        .team-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 245, 255, 0.1);
        }

        .card-header {
          position: relative;
          padding: 30px 30px 0;
          text-align: center;
        }

        .member-image {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(0, 245, 255, 0.3);
        }

        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .member-image:hover .image-overlay {
          opacity: 1;
        }

        .social-links {
          display: flex;
          gap: 10px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          background: rgba(0, 245, 255, 0.2);
          border: 1px solid rgba(0, 245, 255, 0.5);
          border-radius: 50%;
          color: #00f5ff;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: #00f5ff;
          color: #000;
          transform: scale(1.1);
        }

        .member-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .card-content {
          padding: 0 30px 30px;
        }

        .member-name {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 5px;
          text-align: center;
        }

        .member-position {
          color: #00f5ff;
          font-size: 1.1rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 10px;
        }

        .member-experience {
          text-align: center;
          color: #b0b0b0;
          background: rgba(0, 0, 0, 0.3);
          padding: 4px 10px;
          border-radius: 10px;
          font-size: 0.9rem;
          margin: 0 auto 15px;
          display: inline-block;
        }

        .member-bio {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .skills-section h4 {
          color: #ffffff;
          font-size: 1rem;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .join-team-cta {
          margin-bottom: 60px;
        }

        .cta-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 25px;
          padding: 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .cta-card h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .cta-card p {
          font-size: 1.2rem;
          color: #b0b0b0;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
        }

        .cta-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .cta-btn.secondary {
          background: transparent;
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
        }

        .cta-btn.secondary:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
        }

        @media (max-width: 768px) {
          .team-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.5rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }

          .cta-card {
            padding: 40px 20px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default OurTeamPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileText, Eye, Star } from 'lucide-react';

const PortfolioDownloadPage = () => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const portfolioItems = [
    {
      id: 1,
      title: 'TechStart E-commerce Platform',
      client: 'TechStart Inc.',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      rating: 4.9,
      featured: true
    },
    {
      id: 2,
      title: 'HealthCare Mobile App',
      client: 'MediCare Solutions',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      rating: 4.8,
      featured: false
    },
    {
      id: 3,
      title: 'Financial Dashboard',
      client: 'FinTech Pro',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      rating: 4.7,
      featured: true
    }
  ];

  const handleDownload = () => {
    alert(`🎉 Portfolio Download Started!\n\nFormat: ${selectedFormat.toUpperCase()}\nContent: Complete portfolio with all projects\nFile Size: ~15MB\n\nThis is a demo. Your download would start automatically with:\n• Project case studies\n• Client testimonials\n• Technical specifications\n• Results & metrics`);
  };

  return (
    <div className="portfolio-download-page">
      <div className="container">
        <motion.div className="back-navigation" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" className="back-btn">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </motion.div>

        <motion.header className="page-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="header-icon">
            <FileText size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Download Portfolio</h1>
          <p className="page-description">
            Access our complete portfolio with detailed case studies and project documentation
          </p>
        </motion.header>

        <motion.section className="download-section" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="download-card">
            <div className="card-header">
              <FileText size={32} />
              <h3>Complete Portfolio</h3>
              <span className="file-size">~15MB</span>
            </div>
            <div className="card-content">
              <p>Download our comprehensive portfolio including all projects, case studies, and client testimonials.</p>
              <ul>
                <li>✓ {portfolioItems.length} detailed case studies</li>
                <li>✓ Client testimonials & results</li>
                <li>✓ Technical specifications</li>
                <li>✓ Design process documentation</li>
              </ul>
              <div className="format-selector">
                <label>Download Format:</label>
                <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
                  <option value="pdf">PDF Document</option>
                  <option value="interactive">Interactive Portfolio</option>
                  <option value="zip">Complete Package (ZIP)</option>
                </select>
              </div>
            </div>
            <div className="card-actions">
              <button className="download-btn primary" onClick={handleDownload}>
                <Download size={20} />
                Download Portfolio
              </button>
              <button className="download-btn secondary">
                <Eye size={20} />
                Preview Online
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section className="portfolio-preview" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h3>Featured Projects</h3>
          <div className="projects-grid">
            {portfolioItems.map((project) => (
              <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
                <div className="card-image">
                  <img src={project.image} alt={project.title} />
                  {project.featured && <div className="featured-badge">Featured</div>}
                </div>
                <div className="card-content">
                  <h4>{project.title}</h4>
                  <p>Client: {project.client}</p>
                  <div className="card-meta">
                    <span>{project.year}</span>
                    <div className="rating">
                      <Star size={14} />
                      {project.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <style jsx>{`
        .portfolio-download-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .container {
          max-width: 1000px;
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
        }

        .back-btn:hover {
          color: #ffffff;
          transform: translateX(-5px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
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
          font-size: 3rem;
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
        }

        .download-section {
          margin-bottom: 60px;
        }

        .download-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .download-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00f5ff, #9966ff);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .card-header h3 {
          font-size: 1.5rem;
          margin: 0;
        }

        .file-size {
          background: rgba(0, 245, 255, 0.1);
          color: #00f5ff;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          margin-left: auto;
        }

        .card-content p {
          color: #b0b0b0;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .card-content ul {
          list-style: none;
          padding: 0;
          color: #b0b0b0;
          margin-bottom: 25px;
        }

        .card-content li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .format-selector {
          margin-bottom: 25px;
        }

        .format-selector label {
          display: block;
          margin-bottom: 8px;
          color: #ffffff;
          font-weight: 500;
        }

        .format-selector select {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          padding: 10px 15px;
          color: #ffffff;
          width: 200px;
        }

        .card-actions {
          display: flex;
          gap: 15px;
        }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .download-btn.primary {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
        }

        .download-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .download-btn.secondary {
          background: transparent;
          color: #00f5ff;
          border: 1px solid rgba(0, 245, 255, 0.3);
        }

        .download-btn.secondary:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
        }

        .portfolio-preview h3 {
          text-align: center;
          margin-bottom: 30px;
          color: #ffffff;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .project-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 245, 255, 0.4);
        }

        .project-card.featured {
          border-color: rgba(0, 245, 255, 0.3);
        }

        .card-image {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #ffd700, #ff8c00);
          color: #000;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .project-card .card-content {
          padding: 20px;
        }

        .project-card h4 {
          margin-bottom: 8px;
          color: #ffffff;
        }

        .project-card p {
          color: #00f5ff;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #ffd700;
        }

        @media (max-width: 768px) {
          .portfolio-download-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .download-card {
            padding: 25px;
          }

          .card-actions {
            flex-direction: column;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioDownloadPage;
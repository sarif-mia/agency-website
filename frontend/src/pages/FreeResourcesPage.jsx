import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, FileText, Code, Palette, BookOpen, Star, Eye } from 'lucide-react';

const FreeResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Resources', icon: FileText },
    { key: 'templates', label: 'Templates', icon: Palette },
    { key: 'guides', label: 'Guides', icon: BookOpen },
    { key: 'code', label: 'Code Snippets', icon: Code },
    { key: 'design', label: 'Design Assets', icon: Palette }
  ];

  const resources = [
    {
      id: 1,
      title: 'Modern Landing Page Template',
      category: 'templates',
      description: 'A responsive, modern landing page template built with HTML, CSS, and JavaScript. Perfect for startups and agencies.',
      downloadLink: '#',
      fileSize: '2.5 MB',
      downloads: 1250,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive']
    },
    {
      id: 2,
      title: 'UI/UX Design Checklist',
      category: 'guides',
      description: 'Complete checklist for designing user-friendly interfaces. Covers everything from wireframing to final testing.',
      downloadLink: '#',
      fileSize: '1.2 MB',
      downloads: 890,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1586281010692-881cefc89f67?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['UI/UX', 'Design', 'Checklist', 'PDF']
    },
    {
      id: 3,
      title: 'React Component Library',
      category: 'code',
      description: 'Collection of reusable React components with TypeScript support. Includes buttons, forms, modals, and more.',
      downloadLink: '#',
      fileSize: '5.8 MB',
      downloads: 2100,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['React', 'TypeScript', 'Components', 'GitHub']
    },
    {
      id: 4,
      title: 'Brand Identity Kit',
      category: 'design',
      description: 'Complete brand identity package including logo templates, color palettes, typography guides, and business card designs.',
      downloadLink: '#',
      fileSize: '15.3 MB',
      downloads: 750,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['Branding', 'Logo', 'Colors', 'Illustrator']
    },
    {
      id: 5,
      title: 'SEO Optimization Guide',
      category: 'guides',
      description: 'Step-by-step guide to optimize your website for search engines. Includes technical SEO, content optimization, and tools.',
      downloadLink: '#',
      fileSize: '3.1 MB',
      downloads: 1450,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['SEO', 'Marketing', 'Website', 'Guide']
    },
    {
      id: 6,
      title: 'CSS Animation Library',
      category: 'code',
      description: 'Beautiful CSS animations and transitions ready to use in your projects. Includes hover effects, loading animations, and more.',
      downloadLink: '#',
      fileSize: '800 KB',
      downloads: 3200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['CSS', 'Animation', 'Effects', 'Web']
    },
    {
      id: 7,
      title: 'Dashboard UI Template',
      category: 'templates',
      description: 'Professional admin dashboard template with charts, tables, and responsive design. Built with modern frameworks.',
      downloadLink: '#',
      fileSize: '12.7 MB',
      downloads: 980,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['Dashboard', 'Admin', 'Charts', 'Bootstrap']
    },
    {
      id: 8,
      title: 'Icon Pack Collection',
      category: 'design',
      description: 'Set of 500+ vector icons in multiple formats (SVG, PNG, AI). Perfect for web and mobile app design.',
      downloadLink: '#',
      fileSize: '25.4 MB',
      downloads: 1890,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['Icons', 'SVG', 'Design', 'Vector']
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const handleDownload = (resource) => {
    // In a real application, this would trigger an actual download
    alert(`🎉 Thank you for downloading "${resource.title}"!\n\nThis is a demo version. In the full application, your download would start automatically.\n\nFile Size: ${resource.fileSize}\nFormat: Based on tags (${resource.tags.join(', ')})`);
  };

  return (
    <div className="free-resources-page">
      <div className="container">
        {/* Back Button */}
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

        {/* Header */}
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="header-icon">
            <Download size={60} />
            <div className="icon-glow"></div>
          </div>
          <h1 className="page-title">Free Resources</h1>
          <p className="page-description">
            Download free templates, guides, code snippets, and design assets to boost your projects
          </p>
        </motion.header>

        {/* Categories Filter */}
        <motion.section
          className="categories-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <category.icon size={24} />
                {category.label}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Resources Grid */}
        <motion.section
          className="resources-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="resources-grid">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="resource-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="card-image">
                  <img src={resource.image} alt={resource.title} />
                  <div className="card-overlay">
                    <button 
                      className="download-btn"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span className="downloads">
                      <Eye size={14} />
                      {resource.downloads} downloads
                    </span>
                    <div className="rating">
                      <Star size={14} />
                      {resource.rating}
                    </div>
                  </div>

                  <h3 className="card-title">{resource.title}</h3>
                  <p className="card-description">{resource.description}</p>

                  <div className="card-tags">
                    {resource.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <span className="file-size">{resource.fileSize}</span>
                    <button 
                      className="download-text-btn"
                      onClick={() => handleDownload(resource)}
                    >
                      Free Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <style jsx>{`
        .free-resources-page {
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

        .back-navigation {
          margin-bottom: 40px;
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

        .categories-section {
          margin-bottom: 50px;
        }

        .categories-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 25px;
          padding: 12px 24px;
          color: #b0b0b0;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .category-btn:hover,
        .category-btn.active {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.6);
          color: #00f5ff;
          transform: translateY(-2px);
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .resource-card {
          background: linear-gradient(145deg, #111111, #1a1a1a);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .resource-card:hover {
          border-color: rgba(0, 245, 255, 0.4);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.1);
        }

        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .resource-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .resource-card:hover .card-overlay {
          opacity: 1;
        }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 25px;
          padding: 12px 24px;
          color: #ffffff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .download-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 245, 255, 0.4);
        }

        .card-content {
          padding: 25px;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .downloads,
        .rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.9rem;
          color: #b0b0b0;
        }

        .rating {
          color: #ffd700;
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .card-description {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .tag {
          background: rgba(153, 102, 255, 0.1);
          border: 1px solid rgba(153, 102, 255, 0.3);
          color: #9966ff;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid rgba(0, 245, 255, 0.1);
        }

        .file-size {
          color: #666;
          font-size: 0.9rem;
        }

        .download-text-btn {
          background: none;
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          padding: 8px 16px;
          color: #00f5ff;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .download-text-btn:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.6);
        }

        @media (max-width: 768px) {
          .free-resources-page {
            padding: 80px 0 60px;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .resources-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .categories-grid {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .category-btn {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
};

export default FreeResourcesPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, HelpCircle, FileText, Users, Settings, Zap, Eye, ThumbsUp } from 'lucide-react';
import api from '../services/api';

const HelpCenterPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  const categories = [
    { key: '', label: 'All Categories', icon: FileText },
    { key: 'getting-started', label: 'Getting Started', icon: Zap },
    { key: 'account', label: 'Account & Billing', icon: Users },
    { key: 'services', label: 'Our Services', icon: Settings },
    { key: 'technical', label: 'Technical Support', icon: HelpCircle },
    { key: 'general', label: 'General Questions', icon: FileText },
  ];

  // Sample help articles as fallback
  const sampleArticles = [
    {
      id: 1,
      title: 'Getting Started with Our Services',
      slug: 'getting-started-guide',
      category: 'getting-started',
      excerpt: 'Learn how to get started with our digital services and make the most of your experience.',
      content: 'Full article content here...',
      is_featured: true,
      view_count: 1250,
      helpful_votes: 89,
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      title: 'How to Create a Project Request',
      slug: 'creating-project-request',
      category: 'getting-started',
      excerpt: 'Step-by-step guide on how to submit a project request and what information we need.',
      content: 'Full article content here...',
      is_featured: false,
      view_count: 890,
      helpful_votes: 67,
      created_at: '2024-01-10T10:00:00Z'
    },
    {
      id: 3,
      title: 'Understanding Our Pricing',
      slug: 'pricing-explanation',
      category: 'account',
      excerpt: 'Detailed breakdown of our pricing structure and what\'s included in each package.',
      content: 'Full article content here...',
      is_featured: true,
      view_count: 2100,
      helpful_votes: 145,
      created_at: '2024-01-05T10:00:00Z'
    },
    {
      id: 4,
      title: 'Web Development Services Overview',
      slug: 'web-development-services',
      category: 'services',
      excerpt: 'Explore our comprehensive web development services and technologies we use.',
      content: 'Full article content here...',
      is_featured: false,
      view_count: 750,
      helpful_votes: 52,
      created_at: '2023-12-28T10:00:00Z'
    },
    {
      id: 5,
      title: 'UI/UX Design Process',
      slug: 'ui-ux-design-process',
      category: 'services',
      excerpt: 'Learn about our design methodology and how we create user-centered experiences.',
      content: 'Full article content here...',
      is_featured: false,
      view_count: 680,
      helpful_votes: 43,
      created_at: '2023-12-25T10:00:00Z'
    },
    {
      id: 6,
      title: 'Troubleshooting Common Issues',
      slug: 'common-technical-issues',
      category: 'technical',
      excerpt: 'Solutions to frequently encountered technical problems and how to resolve them.',
      content: 'Full article content here...',
      is_featured: false,
      view_count: 950,
      helpful_votes: 78,
      created_at: '2023-12-20T10:00:00Z'
    },
    {
      id: 7,
      title: 'Account Security Best Practices',
      slug: 'account-security',
      category: 'account',
      excerpt: 'Important security tips to keep your account safe and protect your data.',
      content: 'Full article content here...',
      is_featured: false,
      view_count: 580,
      helpful_votes: 39,
      created_at: '2023-12-15T10:00:00Z'
    },
    {
      id: 8,
      title: 'Frequently Asked Questions',
      slug: 'faq-general',
      category: 'general',
      excerpt: 'Answers to the most commonly asked questions about our services and processes.',
      content: 'Full article content here...',
      is_featured: true,
      view_count: 3200,
      helpful_votes: 203,
      created_at: '2023-12-10T10:00:00Z'
    }
  ];

  useEffect(() => {
    fetchHelpArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [searchTerm, selectedCategory, articles]);

  const fetchHelpArticles = async () => {
    try {
      setLoading(true);
      const response = await api.help.getAll();
      if (response && response.length > 0) {
        setArticles(response.results || response);
      } else {
        // Use sample data if API returns empty
        setArticles(sampleArticles);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching help articles:', err);
      // Use sample data as fallback
      setArticles(sampleArticles);
      setError(null); // Don't show error, just use demo data
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  const getCategoryLabel = (categoryKey) => {
    const category = categories.find(cat => cat.key === categoryKey);
    return category ? category.label : categoryKey;
  };

  const getCategoryIcon = (categoryKey) => {
    const category = categories.find(cat => cat.key === categoryKey);
    const IconComponent = category ? category.icon : FileText;
    return <IconComponent size={16} />;
  };

  if (loading) {
    return (
      <div className="help-center-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading help articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="help-center-page">
        <div className="container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={fetchHelpArticles} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="help-center-page">
      {/* Hero Section */}
      <section className="help-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Help Center</h1>
            <p>Find answers to your questions and learn how to get the most out of our services</p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="help-search">
        <div className="container">
          <div className="search-box">
            <Search size={24} />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories and Articles */}
      <section className="help-content">
        <div className="container">
          <div className="help-layout">
            {/* Categories Sidebar */}
            <aside className="categories-sidebar">
              <h3>Categories</h3>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.key)}
                  >
                    <category.icon size={20} />
                    {category.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Articles Grid */}
            <main className="articles-main">
              {filteredArticles.length === 0 ? (
                <div className="no-results">
                  <HelpCircle size={48} />
                  <h3>No articles found</h3>
                  <p>Try adjusting your search or category filter</p>
                </div>
              ) : (
                <div className="articles-grid">
                  {filteredArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      className={`help-card ${article.is_featured ? 'featured' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="card-header">
                        <div className="category-badge">
                          {getCategoryIcon(article.category)}
                          {getCategoryLabel(article.category)}
                        </div>
                        {article.is_featured && (
                          <div className="featured-badge">Featured</div>
                        )}
                      </div>

                      <h2 className="card-title">
                        <Link to={`/help/${article.slug}`}>{article.title}</Link>
                      </h2>

                      <p className="card-excerpt">{article.excerpt}</p>

                      <div className="card-stats">
                        <span className="stat">
                          <Eye size={14} />
                          {article.view_count} views
                        </span>
                        <span className="stat">
                          <ThumbsUp size={14} />
                          {article.helpful_votes} helpful
                        </span>
                      </div>

                      <Link to={`/help/${article.slug}`} className="read-btn">
                        Read Article
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <style jsx>{`
        .help-center-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding-top: 80px;
        }

        .help-hero {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          padding: 80px 0 60px;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00f5ff, #9966ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }

        .hero-content p {
          font-size: 1.2rem;
          color: #b0b0b0;
          max-width: 600px;
          margin: 0 auto;
        }

        .help-search {
          padding: 40px 0;
          border-bottom: 1px solid rgba(0, 245, 255, 0.1);
        }

        .search-box {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 50px;
          padding: 20px 30px;
        }

        .search-box svg {
          color: #00f5ff;
          margin-right: 20px;
        }

        .search-box input {
          flex: 1;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 1.1rem;
          outline: none;
        }

        .search-box input::placeholder {
          color: #666;
        }

        .help-content {
          padding: 60px 0 80px;
        }

        .help-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
        }

        .categories-sidebar h3 {
          color: #ffffff;
          margin-bottom: 25px;
          font-size: 1.3rem;
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.2);
          color: #b0b0b0;
          padding: 15px 20px;
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .category-btn:hover {
          border-color: rgba(0, 245, 255, 0.4);
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.05);
        }

        .category-btn.active {
          border-color: rgba(0, 245, 255, 0.6);
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.1);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .help-card {
          background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 16px;
          padding: 25px;
          transition: all 0.3s ease;
        }

        .help-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 245, 255, 0.4);
          box-shadow: 0 15px 35px rgba(0, 245, 255, 0.1);
        }

        .help-card.featured {
          border-color: rgba(255, 215, 0, 0.4);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .category-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .featured-badge {
          background: linear-gradient(135deg, #ffd700, #ff8c00);
          color: #000;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .card-title {
          margin-bottom: 15px;
        }

        .card-title a {
          color: #ffffff;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 600;
          transition: color 0.3s ease;
          line-height: 1.4;
        }

        .card-title a:hover {
          color: #00f5ff;
        }

        .card-excerpt {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .card-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          color: #666;
          font-size: 0.85rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .read-btn {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .read-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 245, 255, 0.3);
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .no-results svg {
          margin-bottom: 20px;
          color: #00f5ff;
        }

        .loading-spinner, .error-message {
          text-align: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 245, 255, 0.3);
          border-top: 3px solid #00f5ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .retry-btn {
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .help-center-page {
            padding-top: 60px;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .help-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .categories-sidebar {
            order: 2;
          }

          .category-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
          }

          .articles-grid {
            grid-template-columns: 1fr;
          }

          .search-box {
            margin: 0 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HelpCenterPage;
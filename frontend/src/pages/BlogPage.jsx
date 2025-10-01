import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Search, Filter } from 'lucide-react';
import api from '../services/api';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await api.blog.getAll();
      setPosts(response.results || response);
      setFilteredPosts(response.results || response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={fetchBlogPosts} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Blog</h1>
            <p>Insights, tips, and trends from our expert team</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="blog-filters">
        <div className="container">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-grid">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="no-results">
              <h3>No articles found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className={`blog-card ${post.is_featured ? 'featured' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {post.featured_image_url && (
                    <div className="card-image">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        loading="lazy"
                      />
                      {post.is_featured && (
                        <div className="featured-badge">Featured</div>
                      )}
                    </div>
                  )}
                  
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="date">
                        <Calendar size={16} />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="read-time">
                        <Clock size={16} />
                        {post.read_time} min read
                      </span>
                    </div>
                    
                    <h2 className="card-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="card-excerpt">{post.excerpt}</p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="card-tags">
                        <Tag size={16} />
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    
                    <Link to={`/blog/${post.slug}`} className="read-more-btn">
                      Read Article
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .blog-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding-top: 80px;
        }

        .blog-hero {
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

        .blog-filters {
          padding: 40px 0;
          border-bottom: 1px solid rgba(0, 245, 255, 0.1);
        }

        .search-box {
          position: relative;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 50px;
          padding: 15px 25px;
        }

        .search-box svg {
          color: #00f5ff;
          margin-right: 15px;
        }

        .search-box input {
          flex: 1;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 1rem;
          outline: none;
        }

        .search-box input::placeholder {
          color: #666;
        }

        .blog-grid {
          padding: 60px 0 80px;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .blog-card {
          background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 245, 255, 0.5);
          box-shadow: 0 20px 40px rgba(0, 245, 255, 0.1);
        }

        .blog-card.featured {
          border-color: rgba(255, 215, 0, 0.5);
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

        .blog-card:hover .card-image img {
          transform: scale(1.05);
        }

        .featured-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #ffd700, #ff8c00);
          color: #000;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .card-content {
          padding: 25px;
        }

        .card-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
          font-size: 0.9rem;
          color: #b0b0b0;
        }

        .card-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .card-title {
          margin-bottom: 15px;
        }

        .card-title a {
          color: #ffffff;
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .card-title a:hover {
          color: #00f5ff;
        }

        .card-excerpt {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .card-tags {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: #00f5ff;
          font-size: 0.9rem;
        }

        .tag {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .read-more-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        }

        .loading-spinner, .error-message, .no-results {
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
          .blog-page {
            padding-top: 60px;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .posts-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .search-box {
            margin: 0 20px;
          }

          .card-meta {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
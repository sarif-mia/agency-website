import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import api from '../services/api';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await api.blog.getBySlug(slug);
      setPost(response);
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

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error-message">
            <h2>Article not found</h2>
            <p>{error}</p>
            <Link to="/blog" className="back-btn">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        {/* Back Button */}
        <motion.div
          className="back-navigation"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog" className="back-btn">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="article-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {post.featured_image_url && (
            <div className="featured-image">
              <img src={post.featured_image_url} alt={post.title} />
            </div>
          )}

          <div className="header-content">
            <div className="article-meta">
              <span className="date">
                <Calendar size={16} />
                {formatDate(post.published_at)}
              </span>
              <span className="read-time">
                <Clock size={16} />
                {post.read_time} min read
              </span>
              <button onClick={shareArticle} className="share-btn">
                <Share2 size={16} />
                Share
              </button>
            </div>

            <h1 className="article-title">{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="article-tags">
                <Tag size={16} />
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          className="article-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div 
            className="content-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>

        {/* Article Footer */}
        <motion.footer
          className="article-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="share-section">
            <h3>Share this article</h3>
            <button onClick={shareArticle} className="share-button">
              <Share2 size={20} />
              Share Article
            </button>
          </div>

          <div className="back-to-blog">
            <Link to="/blog" className="back-link">
              <ArrowLeft size={20} />
              Back to all articles
            </Link>
          </div>
        </motion.footer>
      </div>

      <style jsx>{`
        .blog-post-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 100px 0 80px;
        }

        .back-navigation {
          margin-bottom: 40px;
        }

        .back-btn, .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #00f5ff;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .back-btn:hover, .back-link:hover {
          color: #ffffff;
          transform: translateX(-5px);
        }

        .article-header {
          margin-bottom: 60px;
        }

        .featured-image {
          width: 100%;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .header-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .article-meta {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 30px;
          color: #b0b0b0;
          font-size: 0.9rem;
        }

        .article-meta span,
        .share-btn {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .share-btn {
          background: none;
          border: none;
          color: #00f5ff;
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .share-btn:hover {
          color: #ffffff;
        }

        .article-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff, #00f5ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 25px;
          line-height: 1.2;
        }

        .article-excerpt {
          font-size: 1.2rem;
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .article-tags {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          color: #00f5ff;
        }

        .tag {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 0.9rem;
        }

        .article-content {
          max-width: 800px;
          margin: 0 auto 60px;
        }

        .content-body {
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .content-body h2 {
          color: #00f5ff;
          font-size: 2rem;
          margin: 40px 0 20px;
        }

        .content-body h3 {
          color: #ffffff;
          font-size: 1.5rem;
          margin: 30px 0 15px;
        }

        .content-body p {
          margin-bottom: 20px;
          color: #e0e0e0;
        }

        .content-body ul, .content-body ol {
          margin: 20px 0;
          padding-left: 25px;
        }

        .content-body li {
          margin-bottom: 10px;
          color: #e0e0e0;
        }

        .content-body code {
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          color: #00f5ff;
        }

        .content-body blockquote {
          border-left: 4px solid #00f5ff;
          margin: 30px 0;
          padding: 20px 30px;
          background: rgba(0, 245, 255, 0.05);
          font-style: italic;
        }

        .article-footer {
          max-width: 800px;
          margin: 0 auto;
          border-top: 1px solid rgba(0, 245, 255, 0.2);
          padding-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .share-section h3 {
          color: #ffffff;
          margin-bottom: 15px;
        }

        .share-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .share-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
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

        @media (max-width: 768px) {
          .blog-post-page {
            padding: 80px 0 60px;
          }

          .featured-image {
            height: 250px;
            margin-bottom: 30px;
          }

          .article-title {
            font-size: 2rem;
          }

          .article-excerpt {
            font-size: 1rem;
          }

          .article-meta {
            flex-direction: column;
            gap: 15px;
          }

          .article-tags {
            flex-wrap: wrap;
          }

          .content-body {
            font-size: 1rem;
          }

          .content-body h2 {
            font-size: 1.5rem;
          }

          .article-footer {
            flex-direction: column;
            gap: 30px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPostPage;
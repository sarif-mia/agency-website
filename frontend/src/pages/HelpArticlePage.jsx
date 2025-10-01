import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, ThumbsUp, HelpCircle } from 'lucide-react';
import api from '../services/api';

const HelpArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHelpArticle();
  }, [slug]);

  const fetchHelpArticle = async () => {
    try {
      setLoading(true);
      const response = await api.help.getBySlug(slug);
      setArticle(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="help-article-page"><div className="container"><div className="loading-spinner"><div className="spinner"></div><p>Loading...</p></div></div></div>;
  if (error) return <div className="help-article-page"><div className="container"><div className="error-message"><h2>Article not found</h2><Link to="/help" className="back-btn"><ArrowLeft size={20} />Back to Help Center</Link></div></div></div>;
  if (!article) return null;

  return (
    <div className="help-article-page">
      <div className="container">
        <motion.div className="back-navigation" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/help" className="back-btn"><ArrowLeft size={20} />Back to Help Center</Link>
        </motion.div>

        <motion.header className="article-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="category-badge"><HelpCircle size={16} />{article.category}</div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
          <div className="article-stats">
            <span><Eye size={16} />{article.view_count} views</span>
            <span><ThumbsUp size={16} />{article.helpful_votes} helpful</span>
          </div>
        </motion.header>

        <motion.article className="article-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="content-body" dangerouslySetInnerHTML={{ __html: article.content }} />
        </motion.article>
      </div>

      <style jsx>{`
        .help-article-page { min-height: 100vh; background: #0a0a0a; color: #ffffff; padding: 100px 0 80px; }
        .back-btn { display: inline-flex; align-items: center; gap: 8px; color: #00f5ff; text-decoration: none; }
        .article-header { max-width: 800px; margin: 0 auto 60px; text-align: center; }
        .category-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 245, 255, 0.1); border: 1px solid rgba(0, 245, 255, 0.3); color: #00f5ff; padding: 8px 16px; border-radius: 25px; margin-bottom: 30px; }
        .article-title { font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, #00f5ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 25px; }
        .article-excerpt { font-size: 1.2rem; color: #b0b0b0; margin-bottom: 30px; }
        .article-stats { display: flex; justify-content: center; gap: 30px; color: #666; }
        .article-stats span { display: flex; align-items: center; gap: 6px; }
        .article-content { max-width: 800px; margin: 0 auto; }
        .content-body { line-height: 1.8; font-size: 1.1rem; }
        .content-body h2 { color: #00f5ff; font-size: 2rem; margin: 40px 0 20px; }
        .content-body p { margin-bottom: 20px; color: #e0e0e0; }
        .loading-spinner { text-align: center; padding: 60px 20px; }
        .spinner { width: 50px; height: 50px; border: 3px solid rgba(0, 245, 255, 0.3); border-top: 3px solid #00f5ff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default HelpArticlePage;
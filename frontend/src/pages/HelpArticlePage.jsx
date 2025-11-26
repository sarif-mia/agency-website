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

  // Sample help articles with full content
  const sampleArticles = {
    'getting-started-guide': {
      id: 1,
      title: 'Getting Started with Our Services',
      slug: 'getting-started-guide',
      category: 'getting-started',
      excerpt: 'Learn how to get started with our digital services and make the most of your experience.',
      content: `
        <h2>Welcome to Our Digital Services</h2>
        <p>Thank you for choosing our agency for your digital needs. This guide will help you get started and make the most of our services.</p>

        <h3>Step 1: Account Setup</h3>
        <p>After signing up, you'll receive a welcome email with your login credentials. Make sure to:</p>
        <ul>
          <li>Verify your email address</li>
          <li>Set up two-factor authentication</li>
          <li>Complete your company profile</li>
          <li>Add team members if needed</li>
        </ul>

        <h3>Step 2: Project Planning</h3>
        <p>Before starting any project, we recommend:</p>
        <ul>
          <li>Clearly defining your goals and objectives</li>
          <li>Gathering all necessary assets and content</li>
          <li>Setting realistic timelines</li>
          <li>Establishing communication preferences</li>
        </ul>

        <h3>Step 3: Initial Consultation</h3>
        <p>Schedule your kickoff meeting where we'll:</p>
        <ul>
          <li>Discuss your project requirements in detail</li>
          <li>Review timelines and deliverables</li>
          <li>Answer any questions you may have</li>
          <li>Set up project milestones</li>
        </ul>

        <h3>Communication Guidelines</h3>
        <p>To ensure smooth collaboration:</p>
        <ul>
          <li>Use our project management tools for updates</li>
          <li>Schedule regular check-in meetings</li>
          <li>Provide feedback promptly</li>
          <li>Keep all project-related files organized</li>
        </ul>

        <h2>Need Help?</h2>
        <p>If you have any questions during the getting started process, don't hesitate to contact our support team. We're here to help you succeed.</p>
      `,
      is_featured: true,
      view_count: 1250,
      helpful_votes: 89,
      created_at: '2024-01-15T10:00:00Z'
    },
    'creating-project-request': {
      id: 2,
      title: 'How to Create a Project Request',
      slug: 'creating-project-request',
      category: 'getting-started',
      excerpt: 'Step-by-step guide on how to submit a project request and what information we need.',
      content: `
        <h2>Creating Your Project Request</h2>
        <p>A well-structured project request helps us understand your needs and provide accurate estimates. Follow these steps to create an effective project request.</p>

        <h3>Project Information</h3>
        <p>Provide detailed information about your project:</p>
        <ul>
          <li><strong>Project Title:</strong> A clear, descriptive name</li>
          <li><strong>Project Type:</strong> Website, mobile app, branding, etc.</li>
          <li><strong>Industry:</strong> Your business sector</li>
          <li><strong>Target Audience:</strong> Who will use your product/service</li>
        </ul>

        <h3>Requirements & Specifications</h3>
        <p>Be specific about what you need:</p>
        <ul>
          <li>Key features and functionality</li>
          <li>Design preferences or existing brand guidelines</li>
          <li>Technical requirements or constraints</li>
          <li>Integration needs (third-party services, APIs, etc.)</li>
          <li>Content requirements</li>
        </ul>

        <h3>Timeline & Budget</h3>
        <p>Set realistic expectations:</p>
        <ul>
          <li>Preferred timeline for completion</li>
          <li>Budget range (if known)</li>
          <li>Key milestones or deadlines</li>
          <li>Launch date requirements</li>
        </ul>

        <h3>Reference Materials</h3>
        <p>Help us understand your vision:</p>
        <ul>
          <li>Competitor websites or apps</li>
          <li>Inspiration or mood boards</li>
          <li>Existing brand assets</li>
          <li>Previous work examples</li>
        </ul>

        <h3>Next Steps</h3>
        <p>After submitting your request:</p>
        <ol>
          <li>We'll review your requirements within 24 hours</li>
          <li>Schedule a discovery call to discuss details</li>
          <li>Receive a detailed proposal with timeline and pricing</li>
          <li>Begin project planning once approved</li>
        </ol>
      `,
      is_featured: false,
      view_count: 890,
      helpful_votes: 67,
      created_at: '2024-01-10T10:00:00Z'
    }
  };

  useEffect(() => {
    fetchHelpArticle();
  }, [slug]);

  const fetchHelpArticle = async () => {
    try {
      setLoading(true);
      const response = await api.help.getBySlug(slug);
      if (response) {
        setArticle(response);
      } else {
        // Use sample data if API returns empty
        const sampleArticle = sampleArticles[slug];
        if (sampleArticle) {
          setArticle(sampleArticle);
        } else {
          setError('Article not found');
        }
      }
    } catch (err) {
      console.error('Error fetching help article:', err);
      // Use sample data as fallback
      const sampleArticle = sampleArticles[slug];
      if (sampleArticle) {
        setArticle(sampleArticle);
      } else {
        setError('Article not found');
      }
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
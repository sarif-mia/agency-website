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

  // Sample blog posts with full content
  const samplePosts = {
    'future-web-development-2024': {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      slug: 'future-web-development-2024',
      excerpt: 'Explore the latest trends shaping the web development landscape, from AI integration to advanced frameworks and performance optimization techniques.',
      content: `
        <h2>The Evolution of Web Development</h2>
        <p>The web development landscape is constantly evolving, driven by technological advancements and changing user expectations. As we move through 2024, several key trends are emerging that will shape how we build and interact with web applications.</p>

        <h3>1. AI-Powered Development Tools</h3>
        <p>Artificial Intelligence is revolutionizing the development process. From code completion tools like GitHub Copilot to AI-assisted debugging and automated testing, developers are seeing significant productivity gains. These tools are becoming more sophisticated, understanding context and providing increasingly accurate suggestions.</p>

        <h3>2. Advanced Frontend Frameworks</h3>
        <p>React, Vue.js, and Angular continue to evolve with new features and performance improvements. The focus is shifting towards:</p>
        <ul>
          <li>Server-side rendering and static site generation</li>
          <li>Micro-frontends architecture</li>
          <li>Component-driven development</li>
          <li>TypeScript integration</li>
        </ul>

        <h3>3. Performance Optimization</h3>
        <p>Web performance remains crucial for user experience and SEO. Key areas of focus include:</p>
        <ul>
          <li>Core Web Vitals optimization</li>
          <li>Advanced caching strategies</li>
          <li>Image optimization and WebP adoption</li>
          <li>Code splitting and lazy loading</li>
        </ul>

        <h3>4. Progressive Web Apps (PWAs)</h3>
        <p>PWAs continue to gain traction, offering native app-like experiences in the browser. With improved service worker APIs and better browser support, PWAs are becoming a viable alternative to traditional mobile apps.</p>

        <h2>Looking Ahead</h2>
        <p>The future of web development is exciting, with emerging technologies like WebAssembly, Web Components, and AI integration paving the way for more powerful and intuitive web applications. Staying updated with these trends will be crucial for developers looking to remain competitive in the field.</p>
      `,
      featured_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['Web Development', 'Trends', 'Technology'],
      is_featured: true,
      is_published: true,
      read_time: 5,
      published_at: '2024-01-15T10:00:00Z',
      created_at: '2024-01-15T10:00:00Z'
    },
    'react-performance-best-practices': {
      id: 2,
      title: 'Mastering React Performance: Best Practices and Tips',
      slug: 'react-performance-best-practices',
      excerpt: 'Learn how to optimize your React applications for better performance, faster load times, and improved user experience.',
      content: `
        <h2>Understanding React Performance</h2>
        <p>React applications can sometimes suffer from performance issues as they grow in complexity. Understanding how React works under the hood and implementing best practices can significantly improve your app's performance.</p>

        <h3>1. Component Optimization</h3>
        <p>The key to React performance lies in minimizing unnecessary re-renders:</p>
        <ul>
          <li>Use <code>React.memo()</code> for functional components</li>
          <li>Implement <code>shouldComponentUpdate</code> in class components</li>
          <li>Use callback hooks properly with <code>useCallback</code></li>
          <li>Memoize expensive calculations with <code>useMemo</code></li>
        </ul>

        <h3>2. Code Splitting and Lazy Loading</h3>
        <p>Reduce your initial bundle size by splitting code:</p>
        <ul>
          <li>Use dynamic imports with <code>React.lazy()</code></li>
          <li>Implement route-based code splitting</li>
          <li>Lazy load images and heavy components</li>
          <li>Use webpack chunk splitting</li>
        </ul>

        <h3>3. State Management Optimization</h3>
        <p>Efficient state management is crucial:</p>
        <ul>
          <li>Avoid deep nesting in state objects</li>
          <li>Use context selectively and split contexts</li>
          <li>Consider using Redux or Zustand for complex state</li>
          <li>Implement proper state normalization</li>
        </ul>

        <h3>4. Virtual Scrolling for Large Lists</h3>
        <p>When dealing with large datasets, virtual scrolling can dramatically improve performance by only rendering visible items.</p>

        <h2>Performance Monitoring</h2>
        <p>Use tools like React DevTools Profiler, Lighthouse, and browser performance tools to identify and fix performance bottlenecks. Regular performance audits should be part of your development workflow.</p>
      `,
      featured_image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      tags: ['React', 'Performance', 'JavaScript'],
      is_featured: false,
      is_published: true,
      read_time: 7,
      published_at: '2024-01-10T10:00:00Z',
      created_at: '2024-01-10T10:00:00Z'
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await api.blog.getBySlug(slug);
      if (response) {
        setPost(response);
      } else {
        // Use sample data if API returns empty
        const samplePost = samplePosts[slug];
        if (samplePost) {
          setPost(samplePost);
        } else {
          setError('Article not found');
        }
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      // Use sample data as fallback
      const samplePost = samplePosts[slug];
      if (samplePost) {
        setPost(samplePost);
      } else {
        setError('Article not found');
      }
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
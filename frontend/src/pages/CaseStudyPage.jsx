import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building, Clock, ExternalLink, TrendingUp } from 'lucide-react';
import api from '../services/api';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCaseStudy();
  }, [slug]);

  const fetchCaseStudy = async () => {
    try {
      setLoading(true);
      const response = await api.caseStudies.getBySlug(slug);
      setCaseStudy(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="case-study-page"><div className="container"><div className="loading-spinner"><div className="spinner"></div><p>Loading case study...</p></div></div></div>;
  if (error) return <div className="case-study-page"><div className="container"><div className="error-message"><h2>Case study not found</h2><Link to="/case-studies" className="back-btn"><ArrowLeft size={20} />Back to Case Studies</Link></div></div></div>;
  if (!caseStudy) return null;

  return (
    <div className="case-study-page">
      <div className="container">
        <motion.div className="back-navigation" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/case-studies" className="back-btn"><ArrowLeft size={20} />Back to Case Studies</Link>
        </motion.div>

        <motion.header className="case-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          {caseStudy.featured_image_url && (
            <div className="featured-image">
              <img src={caseStudy.featured_image_url} alt={caseStudy.title} />
            </div>
          )}

          <div className="header-content">
            <div className="case-meta">
              <div className="industry-badge"><Building size={16} />{caseStudy.industry}</div>
              <div className="duration"><Clock size={16} />{caseStudy.project_duration}</div>
              {caseStudy.project_url && (
                <a href={caseStudy.project_url} target="_blank" rel="noopener noreferrer" className="external-link">
                  <ExternalLink size={16} />View Live Project
                </a>
              )}
            </div>

            <h1 className="case-title">{caseStudy.title}</h1>
            <p className="client-info">Client: <strong>{caseStudy.client_name}</strong></p>

            {caseStudy.technologies_used && caseStudy.technologies_used.length > 0 && (
              <div className="technologies">
                <h4>Technologies Used:</h4>
                <div className="tech-list">
                  {caseStudy.technologies_used.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.header>

        <motion.div className="case-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="content-grid">
            <section className="challenge-section">
              <h2><span className="section-number">01</span>The Challenge</h2>
              <div className="content-text" dangerouslySetInnerHTML={{ __html: caseStudy.challenge.replace(/\n/g, '<br>') }} />
            </section>

            <section className="solution-section">
              <h2><span className="section-number">02</span>Our Solution</h2>
              <div className="content-text" dangerouslySetInnerHTML={{ __html: caseStudy.solution.replace(/\n/g, '<br>') }} />
            </section>

            <section className="results-section">
              <h2><span className="section-number">03</span>Results & Impact</h2>
              <div className="content-text" dangerouslySetInnerHTML={{ __html: caseStudy.results.replace(/\n/g, '<br>') }} />
              
              {caseStudy.metrics && Object.keys(caseStudy.metrics).length > 0 && (
                <div className="metrics-grid">
                  {Object.entries(caseStudy.metrics).map(([key, value], index) => (
                    <div key={index} className="metric-card">
                      <div className="metric-value">{value}</div>
                      <div className="metric-label">{key.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </motion.div>

        <motion.footer className="case-footer" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="footer-content">
            <div className="cta-section">
              <h3>Ready to Transform Your Business?</h3>
              <p>Let's discuss how we can help you achieve similar results.</p>
              <Link to="/contact" className="contact-btn">
                <TrendingUp size={20} />
                Start Your Project
              </Link>
            </div>
            <Link to="/case-studies" className="back-link">
              <ArrowLeft size={20} />
              Back to all case studies
            </Link>
          </div>
        </motion.footer>
      </div>

      <style jsx>{`
        .case-study-page { min-height: 100vh; background: #0a0a0a; color: #ffffff; padding: 100px 0 80px; }
        .back-btn, .back-link { display: inline-flex; align-items: center; gap: 8px; color: #00f5ff; text-decoration: none; transition: all 0.3s ease; }
        .back-btn:hover, .back-link:hover { color: #ffffff; transform: translateX(-5px); }
        .case-header { margin-bottom: 60px; }
        .featured-image { width: 100%; height: 400px; border-radius: 20px; overflow: hidden; margin-bottom: 40px; }
        .featured-image img { width: 100%; height: 100%; object-fit: cover; }
        .header-content { max-width: 800px; margin: 0 auto; text-align: center; }
        .case-meta { display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; }
        .industry-badge, .duration { display: flex; align-items: center; gap: 6px; background: rgba(0, 245, 255, 0.1); border: 1px solid rgba(0, 245, 255, 0.3); color: #00f5ff; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; }
        .external-link { display: flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #00f5ff, #0066ff); color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s ease; }
        .external-link:hover { transform: scale(1.05); }
        .case-title { font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, #00f5ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; line-height: 1.2; }
        .client-info { font-size: 1.2rem; color: #b0b0b0; margin-bottom: 30px; }
        .technologies h4 { color: #ffffff; margin-bottom: 15px; }
        .tech-list { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .tech-tag { background: rgba(153, 102, 255, 0.1); border: 1px solid rgba(153, 102, 255, 0.3); color: #9966ff; padding: 6px 12px; border-radius: 15px; font-size: 0.9rem; }
        .case-content { max-width: 900px; margin: 0 auto 60px; }
        .content-grid { display: flex; flex-direction: column; gap: 60px; }
        .challenge-section, .solution-section, .results-section { background: rgba(20, 20, 20, 0.8); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 20px; padding: 40px; }
        .content-grid h2 { color: #00f5ff; font-size: 2rem; margin-bottom: 25px; display: flex; align-items: center; gap: 15px; }
        .section-number { background: linear-gradient(135deg, #00f5ff, #0066ff); color: #ffffff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .content-text { line-height: 1.8; font-size: 1.1rem; color: #e0e0e0; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px; }
        .metric-card { background: rgba(0, 245, 255, 0.1); border: 1px solid rgba(0, 245, 255, 0.3); padding: 25px; border-radius: 15px; text-align: center; }
        .metric-value { font-size: 2.5rem; font-weight: 800; color: #00f5ff; margin-bottom: 10px; }
        .metric-label { color: #b0b0b0; text-transform: capitalize; }
        .case-footer { border-top: 1px solid rgba(0, 245, 255, 0.2); padding-top: 40px; }
        .footer-content { display: flex; justify-content: space-between; align-items: center; }
        .cta-section { text-align: left; }
        .cta-section h3 { color: #ffffff; margin-bottom: 10px; }
        .cta-section p { color: #b0b0b0; margin-bottom: 20px; }
        .contact-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #00f5ff, #0066ff); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: 600; transition: all 0.3s ease; }
        .contact-btn:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3); }
        .loading-spinner { text-align: center; padding: 60px 20px; }
        .spinner { width: 50px; height: 50px; border: 3px solid rgba(0, 245, 255, 0.3); border-top: 3px solid #00f5ff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 768px) { .case-title { font-size: 2rem; } .case-meta { flex-direction: column; gap: 15px; } .footer-content { flex-direction: column; gap: 30px; text-align: center; } .content-grid { gap: 40px; } .content-grid section { padding: 30px; } }
      `}</style>
    </div>
  );
};

export default CaseStudyPage;
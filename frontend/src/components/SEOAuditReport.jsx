import React, { useEffect, useState } from 'react';

const SEOAuditReport = () => {
  const [auditData, setAuditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performAudit = () => {
      // Perform SEO audit
      const auditResults = {
        overallScore: 0,
        categories: {
          technical: { score: 0, issues: [], suggestions: [] },
          content: { score: 0, issues: [], suggestions: [] },
          mobile: { score: 0, issues: [], suggestions: [] },
          speed: { score: 0, issues: [], suggestions: [] }
        },
        issues: [],
        suggestions: []
      };

      // Technical SEO checks
      const technicalChecks = performTechnicalChecks();
      auditResults.categories.technical = technicalChecks;
      
      // Content SEO checks
      const contentChecks = performContentChecks();
      auditResults.categories.content = contentChecks;
      
      // Mobile SEO checks
      const mobileChecks = performMobileChecks();
      auditResults.categories.mobile = mobileChecks;
      
      // Speed checks
      const speedChecks = performSpeedChecks();
      auditResults.categories.speed = speedChecks;

      // Calculate overall score
      const totalScore = (
        technicalChecks.score + 
        contentChecks.score + 
        mobileChecks.score + 
        speedChecks.score
      ) / 4;
      
      auditResults.overallScore = Math.round(totalScore);
      
      // Collect all issues and suggestions
      auditResults.issues = [
        ...technicalChecks.issues,
        ...contentChecks.issues,
        ...mobileChecks.issues,
        ...speedChecks.issues
      ];
      
      auditResults.suggestions = [
        ...technicalChecks.suggestions,
        ...contentChecks.suggestions,
        ...mobileChecks.suggestions,
        ...speedChecks.suggestions
      ];

      setAuditData(auditResults);
      setIsLoading(false);
    };

    performAudit();
  }, []);

  const performTechnicalChecks = () => {
    const result = {
      score: 100,
      issues: [],
      suggestions: []
    };

    // Check for canonical URLs
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      result.issues.push('Missing canonical URL tag');
      result.score -= 10;
    }

    // Check for structured data
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
    if (structuredData.length === 0) {
      result.suggestions.push('Add structured data (JSON-LD) for better rich results');
      result.score -= 5;
    }

    // Check for robots meta tag
    const robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      result.suggestions.push('Add robots meta tag for better crawl control');
      result.score -= 5;
    }

    // Check for sitemap
    // This would typically be checked server-side, but we can suggest it
    result.suggestions.push('Ensure your sitemap.xml is properly configured and submitted to search engines');

    return result;
  };

  const performContentChecks = () => {
    const result = {
      score: 100,
      issues: [],
      suggestions: []
    };

    // Check meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      result.issues.push('Missing meta description');
      result.score -= 20;
    } else {
      const descLength = metaDescription.getAttribute('content').length;
      if (descLength < 120) {
        result.suggestions.push('Meta description is shorter than recommended (120-160 characters)');
        result.score -= 5;
      } else if (descLength > 160) {
        result.issues.push('Meta description is too long (over 160 characters)');
        result.score -= 10;
      }
    }

    // Check title tag
    const title = document.title;
    if (!title) {
      result.issues.push('Missing page title');
      result.score -= 20;
    } else {
      if (title.length < 30) {
        result.suggestions.push('Page title is shorter than recommended (30-60 characters)');
        result.score -= 5;
      } else if (title.length > 60) {
        result.issues.push('Page title is too long (over 60 characters)');
        result.score -= 10;
      }
    }

    // Check H1 tags
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length === 0) {
      result.issues.push('No H1 tag found');
      result.score -= 15;
    } else if (h1Tags.length > 1) {
      result.issues.push('Multiple H1 tags found (should be only one)');
      result.score -= 10;
    }

    // Check for alt attributes on images
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt') || img.getAttribute('alt').trim() === '');
    if (imagesWithoutAlt.length > 0) {
      result.issues.push(`${imagesWithoutAlt.length} images missing alt attributes`);
      result.score -= (imagesWithoutAlt.length * 2);
    }

    // Check for internal links
    const internalLinks = document.querySelectorAll('a[href^="/"]');
    if (internalLinks.length < 5) {
      result.suggestions.push('Consider adding more internal links for better site structure');
      result.score -= 5;
    }

    return result;
  };

  const performMobileChecks = () => {
    const result = {
      score: 100,
      issues: [],
      suggestions: []
    };

    // Check viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      result.issues.push('Missing viewport meta tag');
      result.score -= 20;
    }

    // Check for mobile-friendly design indicators
    // This is a simplified check - in reality, this would require more complex analysis
    result.suggestions.push('Ensure your site is fully responsive and mobile-friendly');

    return result;
  };

  const performSpeedChecks = () => {
    const result = {
      score: 100,
      issues: [],
      suggestions: []
    };

    // Check for performance optimization indicators
    result.suggestions.push('Implement lazy loading for images');
    result.suggestions.push('Optimize image sizes and formats');
    result.suggestions.push('Minimize CSS and JavaScript files');
    result.suggestions.push('Use a Content Delivery Network (CDN)');

    return result;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Performing SEO Audit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">SEO Audit Report</h2>
        
        {/* Overall Score */}
        <div className="flex items-center justify-center mb-8">
          <div className={`rounded-full w-32 h-32 flex items-center justify-center ${getScoreBgColor(auditData.overallScore)}`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(auditData.overallScore)}`}>
                {auditData.overallScore}%
              </div>
              <div className="text-sm text-gray-600">SEO Score</div>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(auditData.categories).map(([category, data]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
                {data.score}%
              </div>
              <div className="text-sm text-gray-600 capitalize">{category}</div>
            </div>
          ))}
        </div>

        {/* Issues */}
        {auditData.issues.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Issues to Fix</h3>
            <ul className="space-y-2">
              {auditData.issues.map((issue, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {auditData.suggestions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-yellow-600">Suggestions for Improvement</h3>
            <ul className="space-y-2">
              {auditData.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Recommendations</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>Submit your sitemap to Google Search Console</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>Regularly update your content with fresh, relevant information</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>Build high-quality backlinks from authoritative websites</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>Monitor your site's performance using Google Analytics and Search Console</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>Optimize images with descriptive filenames and alt text</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SEOAuditReport;
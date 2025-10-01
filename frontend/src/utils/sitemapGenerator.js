// Dynamic Sitemap Generator for React Router
import { siteConfig } from './seoConfig';

// Route configuration for sitemap generation
const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString()
  },
  {
    path: '/about-us',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: new Date().toISOString()
  },
  {
    path: '/our-team',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    path: '/careers',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    path: '/all-projects',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString()
  },
  {
    path: '/blog',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    path: '/case-studies',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    path: '/help',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString()
  },
  {
    path: '/resources',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString()
  },
  {
    path: '/quote',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: new Date().toISOString()
  },
  {
    path: '/portfolio-download',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: new Date().toISOString()
  },
  {
    path: '/partnership',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: new Date().toISOString()
  },
  {
    path: '/privacy-policy',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString()
  },
  {
    path: '/terms-conditions',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString()
  }
];

// Sitemap generator for SEO optimization

// Import page data
import { pagesSEOData } from './seoConfig';

// Priority mapping for different page types
const priorityMap = {
  home: 1.0,
  services: 0.9,
  portfolio: 0.9,
  contact: 0.9,
  about: 0.8,
  team: 0.8,
  careers: 0.8,
  blog: 0.8,
  caseStudies: 0.8,
  help: 0.7,
  resources: 0.7,
  default: 0.5
};

// Change frequency mapping
const changeFrequencyMap = {
  home: 'weekly',
  services: 'monthly',
  portfolio: 'weekly',
  contact: 'monthly',
  about: 'monthly',
  team: 'monthly',
  careers: 'monthly',
  blog: 'weekly',
  caseStudies: 'weekly',
  help: 'monthly',
  resources: 'monthly',
  default: 'monthly'
};

// Generate sitemap XML
export const generateSitemapXML = (additionalPages = []) => {
  const currentDate = new Date().toISOString();
  
  // Start with the XML declaration and opening tag
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;
  
  // Add all pages from pagesSEOData
  Object.entries(pagesSEOData).forEach(([key, page]) => {
    const priority = priorityMap[key] || priorityMap.default;
    const changefreq = changeFrequencyMap[key] || changeFrequencyMap.default;
    
    xml += `  <url>\n`;
    xml += `    <loc>https://digitalagency.com${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
    
    // Add image if available
    if (page.image) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>https://digitalagency.com${page.image}</image:loc>\n`;
      xml += `      <image:title>${page.title}</image:title>\n`;
      xml += `    </image:image>\n`;
    }
    
    xml += `  </url>\n\n`;
  });
  
  // Add additional pages (like blog posts, case studies, etc.)
  additionalPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>https://digitalagency.com${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastModified || currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changeFrequency || 'monthly'}</changefreq>\n`;
    xml += `    <priority>${(page.priority || 0.5).toFixed(1)}</priority>\n`;
    
    // Add images if available
    if (page.images && page.images.length > 0) {
      page.images.forEach(image => {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${image.url}</image:loc>\n`;
        if (image.title) xml += `      <image:title>${image.title}</image:title>\n`;
        if (image.caption) xml += `      <image:caption>${image.caption}</image:caption>\n`;
        xml += `    </image:image>\n`;
      });
    }
    
    xml += `  </url>\n\n`;
  });
  
  // Close the urlset tag
  xml += `</urlset>`;
  
  return xml;
};

// Generate robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Allow important pages
Allow: /about-us
Allow: /our-team
Allow: /careers
Allow: /blog
Allow: /case-studies
Allow: /help
Allow: /resources
Allow: /quote
Allow: /all-projects

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /client-portal/login
Disallow: /*.json$
Disallow: /*.xml$

# Block duplicate content
Disallow: /*?*
Disallow: /*#*

# Allow CSS and JS files
Allow: /*.css
Allow: /*.js

# Crawl delay (optional - be respectful)
Crawl-delay: 1

# Sitemap location
Sitemap: https://digitalagency.com/sitemap.xml

# Additional user agents
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Mobile sitemap
Sitemap: https://digitalagency.com/sitemap-mobile.xml

# News sitemap
Sitemap: https://digitalagency.com/sitemap-news.xml`;
};

// Export the page data for use in dynamic sitemap generation
export { pagesSEOData, priorityMap, changeFrequencyMap };

// Function to fetch and add dynamic routes (blog posts, case studies, etc.)
export const fetchDynamicRoutes = async () => {
  const dynamicRoutes = [];
  
  try {
    // Fetch blog posts from backend
    const API_URL = import.meta.env.VITE_API_URL || (
      import.meta.env.PROD
        ? 'https://agency-backend.onrender.com/api'
        : 'http://localhost:8000/api'
    );
    const blogResponse = await fetch(`${API_URL}/blog/?format=json`);
    if (blogResponse.ok) {
      const blogPosts = await blogResponse.json();
      blogPosts.results?.forEach(post => {
        if (post.is_published) {
          dynamicRoutes.push({
            path: `/blog/${post.slug}`,
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: post.updated_at || post.published_at,
            images: post.featured_image_url ? [{
              url: post.featured_image_url,
              title: post.title,
              caption: post.excerpt
            }] : []
          });
        }
      });
    }

    // Fetch case studies from backend
    const caseStudiesResponse = await fetch(`${API_URL}/case-studies/?format=json`);
    if (caseStudiesResponse.ok) {
      const caseStudies = await caseStudiesResponse.json();
      caseStudies.results?.forEach(study => {
        if (study.is_published) {
          dynamicRoutes.push({
            path: `/case-studies/${study.slug}`,
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: study.updated_at || study.created_at,
            images: study.featured_image_url ? [{
              url: study.featured_image_url,
              title: study.title,
              caption: study.challenge
            }] : []
          });
        }
      });
    }

    // Fetch help articles from backend
    const helpResponse = await fetch('http://localhost:8000/api/help/?format=json');
    if (helpResponse.ok) {
      const helpArticles = await helpResponse.json();
      helpArticles.results?.forEach(article => {
        if (article.is_published) {
          dynamicRoutes.push({
            path: `/help/${article.slug}`,
            changefreq: 'monthly',
            priority: '0.6',
            lastmod: article.updated_at || article.created_at
          });
        }
      });
    }

    // Fetch services from backend
    // Fetch services from backend
const servicesResponse = await fetch(`${API_URL}/services/?format=json`);
    if (servicesResponse.ok) {
      const services = await servicesResponse.json();
      services.results?.forEach(service => {
        dynamicRoutes.push({
          path: `/services/${service.slug}`,
          changefreq: 'monthly',
          priority: '0.8',
          lastmod: service.updated_at || service.created_at
        });
      });
    }

    // Fetch projects from backend
    const projectsResponse = await fetch('http://localhost:8000/api/projects/?format=json');
    if (projectsResponse.ok) {
      const projects = await projectsResponse.json();
      projects.results?.forEach(project => {
        dynamicRoutes.push({
          path: `/projects/${project.slug}`,
          changefreq: 'monthly',
          priority: '0.8',
          lastmod: project.updated_at || project.created_at,
          images: project.image_url ? [{
            url: project.image_url,
            title: project.title,
            caption: project.description
          }] : []
        });
      });
    }

  } catch (error) {
    console.warn('Error fetching dynamic routes for sitemap:', error);
  }

  return dynamicRoutes;
};

// Generate and download sitemap (for admin use)
export const downloadSitemap = async () => {
  const dynamicRoutes = await fetchDynamicRoutes();
  const sitemapContent = generateSitemapXML(dynamicRoutes);
  
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// SEO health check
export const seoHealthCheck = () => {
  const issues = [];
  const suggestions = [];

  // Check meta description length
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const content = metaDescription.getAttribute('content');
    if (!content) {
      issues.push('Missing meta description');
    } else if (content.length < 120) {
      suggestions.push('Meta description is shorter than recommended (120-160 characters)');
    } else if (content.length > 160) {
      issues.push('Meta description is too long (over 160 characters)');
    }
  } else {
    issues.push('Meta description tag not found');
  }

  // Check title length
  const title = document.title;
  if (!title) {
    issues.push('Missing page title');
  } else if (title.length < 30) {
    suggestions.push('Page title is shorter than recommended (30-60 characters)');
  } else if (title.length > 60) {
    issues.push('Page title is too long (over 60 characters)');
  }

  // Check for h1 tags
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    issues.push('No H1 tag found');
  } else if (h1Tags.length > 1) {
    issues.push('Multiple H1 tags found (should be only one)');
  }

  // Check for alt attributes on images
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
  if (imagesWithoutAlt.length > 0) {
    issues.push(`${imagesWithoutAlt.length} images missing alt attributes`);
  }

  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    suggestions.push('Consider adding a canonical URL');
  }

  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    suggestions.push('Consider adding structured data (JSON-LD) for better rich results');
  }

  // Check for internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]');
  if (internalLinks.length < 5) {
    suggestions.push('Consider adding more internal links for better site structure');
  }

  // Check for external links
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  if (externalLinks.length === 0) {
    suggestions.push('Consider adding some external links for better authority');
  }

  return { issues, suggestions };
};
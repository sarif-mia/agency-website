import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title = "SiteGenIT - Professional Web Development & Digital Marketing Services",
  description = "Leading site gen it specializing in web development, mobile apps, UI/UX design, and digital marketing. Transform your business with our expert solutions.",
  keywords = "site gen it, web development, mobile apps, UI/UX design, digital marketing, React development, Node.js, professional websites",
  image = "/assets/og-image.jpg",
  url = "",
  type = "website",
  siteName = "SiteGenIT",
  author = "SiteGenIT Team",
  robots = "index, follow",
  canonical = null,
  structuredData = null,
  twitterHandle = "@sitegenit",
  fbAppId = "",
  lang = "en",
  breadcrumbs = null,
  hreflang = null,
  alternateUrls = null
}) => {
  // Construct full URL
  const fullUrl = `${window.location.origin}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
  
  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": window.location.origin,
    "logo": `${window.location.origin}/assets/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.facebook.com/sitegenit",
      "https://www.twitter.com/sitegenit",
      "https://www.linkedin.com/company/sitegenit",
      "https://www.instagram.com/sitegenit"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94107",
      "addressCountry": "US"
    }
  };

  const schemaData = structuredData || defaultStructuredData;
  
  // Add breadcrumbs to structured data if provided
  const structuredDataWithBreadcrumbs = breadcrumbs ? {
    ...schemaData,
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${window.location.origin}${crumb.url}`
      }))
    }
  } : schemaData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      {!canonical && <link rel="canonical" href={fullUrl} />}
      
      {/* Hreflang tags for international SEO */}
      {hreflang && hreflang.map((lang) => (
        <link key={lang.hreflang} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      
      {/* Alternate URLs */}
      {alternateUrls && alternateUrls.map((alt) => (
        <link key={alt.type} rel="alternate" type={alt.type} href={alt.href} title={alt.title} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Image dimensions for better social sharing */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Article specific Open Graph tags */}
      {type === "article" && (
        <>
          <meta property="article:published_time" content={structuredData?.datePublished || new Date().toISOString()} />
          <meta property="article:modified_time" content={structuredData?.dateModified || new Date().toISOString()} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Technology" />
        </>
      )}
      
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Twitter Card enhancements */}
      <meta name="twitter:domain" content="sitegenit.com" />
      <meta name="twitter:url" content={fullUrl} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#00f5ff" />
      <meta name="msapplication-TileColor" content="#00f5ff" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      
      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredDataWithBreadcrumbs)}
      </script>
      
      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Language and Region */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="San Francisco" />
      <meta name="geo.position" content="37.774929;-122.419416" />
      <meta name="ICBM" content="37.774929, -122.419416" />
      
      {/* Mobile specific meta tags */}
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Helmet>
  );
};

export default SEO;
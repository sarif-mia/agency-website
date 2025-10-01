// SEO Configuration and Data for all pages

export const siteConfig = {
  siteName: "Digital Agency",
  siteUrl: "https://digitalagency.com",
  defaultTitle: "Digital Agency - Professional Web Development & Digital Marketing Services",
  defaultDescription: "Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. Transform your business with our expert solutions.",
  defaultKeywords: "digital agency, web development, mobile apps, UI/UX design, digital marketing, React development, Node.js, professional websites",
  defaultImage: "/assets/og-image.jpg",
  twitterHandle: "@digitalagency",
  fbAppId: "",
  author: "Digital Agency Team",
  organization: {
    name: "Digital Agency",
    logo: "/assets/logo.png",
    address: {
      street: "123 Business Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "US"
    },
    phone: "+1-555-123-4567",
    email: "info@digitalagency.com",
    socialMedia: {
      facebook: "https://www.facebook.com/digitalagency",
      twitter: "https://www.twitter.com/digitalagency",
      linkedin: "https://www.linkedin.com/company/digitalagency",
      instagram: "https://www.instagram.com/digitalagency"
    }
  }
};

export const pagesSEOData = {
  home: {
    title: "Digital Agency - Web Development & Marketing Services",
    description: "Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing. Transform your business with our expert solutions.",
    keywords: "digital agency, web development, mobile apps, UI/UX design, digital marketing, React development, Node.js, professional websites, web design agency, digital solutions",
    url: "/",
    breadcrumbs: [
      { name: "Home", url: "/" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Digital Agency",
      "url": "https://digitalagency.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://digitalagency.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "sameAs": Object.values(siteConfig.organization.socialMedia),
      "description": "Leading digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing."
    }
  },
  
  about: {
    title: "About Us - Expert Digital Agency Team | Digital Agency",
    description: "Meet our expert team of developers, designers, and digital marketers. Learn about our mission to deliver exceptional digital solutions for businesses worldwide.",
    keywords: "about digital agency, expert team, web development team, digital marketing experts, company story, agency history",
    url: "/about-us",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about-us" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Digital Agency",
      "description": "Meet our expert team of developers, designers, and digital marketers. Learn about our mission to deliver exceptional digital solutions for businesses worldwide.",
      "url": "https://digitalagency.com/about-us",
      "mainEntity": {
        "@type": "Organization",
        "name": siteConfig.organization.name,
        "description": "Expert digital agency providing web development and digital marketing services",
        "foundingDate": "2020",
        "employee": [],
        "address": siteConfig.organization.address
      }
    }
  },
  
  services: {
    title: "Our Services - Web Development & Digital Marketing | Digital Agency",
    description: "Comprehensive digital services including web development, mobile app development, UI/UX design, and digital marketing solutions for your business growth.",
    keywords: "web development services, mobile app development, UI/UX design, digital marketing services, React development, SEO services, content marketing",
    url: "/services",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Digital Marketing and Web Development",
      "provider": {
        "@type": "Organization",
        "name": siteConfig.organization.name,
        "url": "https://digitalagency.com",
        "address": siteConfig.organization.address
      },
      "areaServed": "Worldwide",
      "description": "Comprehensive digital services including web development, mobile app development, UI/UX design, and digital marketing solutions for your business growth."
    }
  },
  
  portfolio: {
    title: "Our Portfolio - Best Web Development Projects | Digital Agency",
    description: "Explore our portfolio of successful web development and digital marketing projects. See how we've helped businesses achieve their digital goals.",
    keywords: "web development portfolio, digital agency projects, React projects, mobile app portfolio, UI/UX design examples, successful projects",
    url: "/all-projects",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Portfolio", url: "/all-projects" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Digital Agency Portfolio",
      "description": "Collection of our best web development and digital marketing projects",
      "url": "https://digitalagency.com/all-projects"
    }
  },
  
  team: {
    title: "Our Team - Meet the Digital Experts | Digital Agency",
    description: "Meet our talented team of web developers, designers, and digital marketing experts dedicated to delivering exceptional results for your business.",
    keywords: "digital agency team, web developers, UI/UX designers, digital marketing experts, creative team, technology professionals",
    url: "/our-team",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Our Team", url: "/our-team" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteConfig.organization.name,
      "employee": [],
      "description": "Meet our talented team of web developers, designers, and digital marketing experts dedicated to delivering exceptional results for your business."
    }
  },
  
  careers: {
    title: "Careers - Join Our Digital Agency Team | Digital Agency",
    description: "Join our growing team of digital experts. Explore career opportunities in web development, design, and digital marketing at Digital Agency.",
    keywords: "digital agency careers, web developer jobs, UI/UX designer jobs, digital marketing careers, tech jobs, remote work opportunities",
    url: "/careers",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Careers", url: "/careers" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "hiringOrganization": {
        "@type": "Organization",
        "name": siteConfig.organization.name,
        "sameAs": Object.values(siteConfig.organization.socialMedia)
      },
      "description": "Join our growing team of digital experts. Explore career opportunities in web development, design, and digital marketing at Digital Agency.",
      "employmentType": "FULL_TIME",
      "jobLocationType": "TELECOMMUTE"
    }
  },
  
  blog: {
    title: "Blog - Digital Marketing & Web Development Insights | Digital Agency",
    description: "Stay updated with the latest trends in web development, digital marketing, and technology. Expert insights and tips from our digital agency team.",
    keywords: "digital marketing blog, web development blog, technology insights, React tutorials, SEO tips, content marketing, digital strategy",
    url: "/blog",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Digital Agency Blog",
      "description": "Expert insights on web development and digital marketing",
      "url": "https://digitalagency.com/blog",
      "blogPost": []
    }
  },
  
  caseStudies: {
    title: "Case Studies - Success Stories | Digital Agency",
    description: "Discover how we've helped businesses succeed with our digital solutions. Read detailed case studies of our web development and marketing projects.",
    keywords: "digital agency case studies, web development success stories, digital marketing results, business transformation, ROI examples",
    url: "/case-studies",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Case Studies", url: "/case-studies" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Digital Agency Case Studies",
      "description": "Success stories and detailed case studies of our digital projects",
      "url": "https://digitalagency.com/case-studies"
    }
  },
  
  contact: {
    title: "Contact Us - Get Your Free Consultation | Digital Agency",
    description: "Ready to transform your digital presence? Contact our expert team for a free consultation on your web development or digital marketing project.",
    keywords: "contact digital agency, free consultation, web development quote, digital marketing consultation, project inquiry, business inquiry",
    url: "/quote",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Contact", url: "/quote" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Digital Agency",
      "description": "Ready to transform your digital presence? Contact our expert team for a free consultation on your web development or digital marketing project.",
      "url": "https://digitalagency.com/quote",
      "mainEntity": {
        "@type": "Organization",
        "name": siteConfig.organization.name,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": siteConfig.organization.phone,
          "contactType": "customer service",
          "email": siteConfig.organization.email,
          "availableLanguage": ["English"]
        },
        "address": siteConfig.organization.address
      }
    }
  },
  
  help: {
    title: "Help Center - Digital Agency Support | Digital Agency",
    description: "Find answers to common questions about our web development and digital marketing services. Access our comprehensive help center.",
    keywords: "digital agency help, web development support, digital marketing FAQ, technical support, customer service",
    url: "/help",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Help Center", url: "/help" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "Digital Agency Help Center",
      "description": "Find answers to common questions about our web development and digital marketing services. Access our comprehensive help center.",
      "url": "https://digitalagency.com/help",
      "mainEntity": []
    }
  },
  
  resources: {
    title: "Free Resources - Digital Marketing Tools & Templates | Digital Agency",
    description: "Access free digital marketing resources, web development tools, and templates to boost your online presence. Expert resources from Digital Agency.",
    keywords: "free digital marketing resources, web development tools, marketing templates, SEO tools, content templates, business resources",
    url: "/resources",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Resources", url: "/resources" }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Free Digital Resources",
      "description": "Collection of free digital marketing and web development resources",
      "url": "https://digitalagency.com/resources"
    }
  },
  
  privacy: {
    title: "Privacy Policy | Digital Agency",
    description: "Learn how Digital Agency protects your privacy and handles your personal information. Our comprehensive privacy policy and data protection practices.",
    keywords: "privacy policy, data protection, GDPR compliance, digital agency privacy, personal information handling",
    url: "/privacy-policy",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Privacy Policy", url: "/privacy-policy" }
    ],
    robots: "index, nofollow",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "Learn how Digital Agency protects your privacy and handles your personal information. Our comprehensive privacy policy and data protection practices.",
      "url": "https://digitalagency.com/privacy-policy"
    }
  },
  
  terms: {
    title: "Terms & Conditions | Digital Agency",
    description: "Read our terms and conditions for using Digital Agency services. Understand our service agreements and legal policies.",
    keywords: "terms and conditions, service agreement, legal terms, digital agency terms, user agreement",
    url: "/terms-conditions",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Terms & Conditions", url: "/terms-conditions" }
    ],
    robots: "index, nofollow",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms & Conditions",
      "description": "Read our terms and conditions for using Digital Agency services. Understand our service agreements and legal policies.",
      "url": "https://digitalagency.com/terms-conditions"
    }
  }
};

// Function to get SEO data for a specific page
export const getPageSEO = (pageKey, customData = {}) => {
  const baseSEO = pagesSEOData[pageKey] || pagesSEOData.home;
  return {
    ...baseSEO,
    ...customData,
    title: customData.title || baseSEO.title,
    description: customData.description || baseSEO.description,
    keywords: customData.keywords || baseSEO.keywords,
    url: customData.url || baseSEO.url,
    breadcrumbs: customData.breadcrumbs || baseSEO.breadcrumbs
  };
};

// Schema.org structured data templates
export const generateArticleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.excerpt,
  "image": article.featured_image_url || article.featured_image,
  "datePublished": article.published_at,
  "dateModified": article.updated_at || article.published_at,
  "author": {
    "@type": "Person",
    "name": siteConfig.author
  },
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.organization.name,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.siteUrl}${siteConfig.organization.logo}`
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/blog/${article.slug}`
  },
  "articleSection": "Technology",
  "keywords": article.tags ? article.tags.join(", ") : ""
});

export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": siteConfig.organization.name
  },
  "serviceType": service.category || "Digital Services",
  "offers": {
    "@type": "Offer",
    "description": service.short_description
  }
});

export const generateProjectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description,
  "image": project.image_url || project.image,
  "creator": {
    "@type": "Organization",
    "name": siteConfig.organization.name
  },
  "dateCreated": project.created_at,
  "url": project.project_url,
  "keywords": project.tags ? project.tags.join(", ") : ""
});

export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": `${siteConfig.siteUrl}${crumb.url}`
  }))
});

// Local business schema for better local SEO
export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": siteConfig.organization.name,
  "image": `${siteConfig.siteUrl}${siteConfig.organization.logo}`,
  "telephone": siteConfig.organization.phone,
  "email": siteConfig.organization.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.organization.address.street,
    "addressLocality": siteConfig.organization.address.city,
    "addressRegion": siteConfig.organization.address.state,
    "postalCode": siteConfig.organization.address.postalCode,
    "addressCountry": siteConfig.organization.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "37.774929",
    "longitude": "-122.419416"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": Object.values(siteConfig.organization.socialMedia)
});
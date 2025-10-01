import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/seoConfig';

const ServicesPage = () => {
  const servicesSEO = getPageSEO('services');
  
  return (
    <>
      <SEO 
        title={servicesSEO.title}
        description={servicesSEO.description}
        keywords={servicesSEO.keywords}
        url={servicesSEO.url}
        structuredData={servicesSEO.structuredData}
        breadcrumbs={servicesSEO.breadcrumbs}
      />
      <Services />
    </>
  );
};

export default ServicesPage;
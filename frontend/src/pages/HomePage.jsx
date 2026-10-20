import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import SEO from '../components/SEO';
import { getPageSEO } from '../utils/seoConfig';
import api from '../services/api';

// Home component for the main landing page
const HomePage = () => {
  const [homeData, setHomeData] = useState({
    services: [],
    projects: [],
    testimonials: [],
    loading: true
  });

  const homeSEO = getPageSEO('home');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [servicesResponse, projectsResponse, testimonialsResponse] = await Promise.all([
          api.services.getAll(),
          api.projects.getAll(),
          api.testimonials.getAll()
        ]);

        setHomeData({
          services: servicesResponse.results || servicesResponse,
          projects: projectsResponse.results || projectsResponse,
          testimonials: testimonialsResponse.results || testimonialsResponse,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching home data:', error);
        // Set empty arrays as fallback
        setHomeData({
          services: [],
          projects: [],
          testimonials: [],
          loading: false
        });
      }
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <SEO
        title={homeSEO.title}
        description={homeSEO.description}
        keywords={homeSEO.keywords}
        url={homeSEO.url}
        structuredData={homeSEO.structuredData}
        breadcrumbs={homeSEO.breadcrumbs}
      />
      <Hero />
      <About />
      <Services services={homeData.services} loading={homeData.loading} />
      <Portfolio projects={homeData.projects} loading={homeData.loading} />
      <Process />
      <Testimonials testimonials={homeData.testimonials} loading={homeData.loading} />
      <CallToAction />
    </>
  );
};


export default HomePage;

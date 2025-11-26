import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import components
import Header3D from './components/Header3D';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import SEO from './components/SEO';
import Breadcrumbs from './components/Breadcrumbs';
import SEOAuditReport from './components/SEOAuditReport';
import ScrollToTop from './components/ScrollToTop';

// Import page components
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import HelpCenterPage from './pages/HelpCenterPage';
import HelpArticlePage from './pages/HelpArticlePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyPage from './pages/CaseStudyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import FreeResourcesPage from './pages/FreeResourcesPage';
import GetQuotePage from './pages/GetQuotePage';
import PortfolioDownloadPage from './pages/PortfolioDownloadPage';
import ClientPortalPage from './pages/ClientPortalPage';
import PartnershipPage from './pages/PartnershipPage';
import AboutUsPage from './pages/AboutUsPage';
import AllProjectsPage from './pages/AllProjectsPage';
import OurTeamPage from './pages/OurTeamPage';
import CareersPage from './pages/CareersPage';
import ServicesPage from './pages/ServicesPage';

// Import styles
import './App.css';
import './styles/mobile-fixes.css';

// Import SEO configuration
import { getPageSEO } from './utils/seoConfig';

// Import API
import api from './services/api';

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

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header3D />

        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage />} />

          {/* Blog routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Help Center routes */}
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/help/:slug" element={<HelpArticlePage />} />

          {/* Case Studies routes */}
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />

          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />

          {/* Quick Links pages */}
          <Route path="/resources" element={<FreeResourcesPage />} />
          <Route path="/quote" element={<GetQuotePage />} />
          <Route path="/portfolio-download" element={<PortfolioDownloadPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
          <Route path="/partnership" element={<PartnershipPage />} />

          {/* Additional pages */}
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/all-projects" element={<AllProjectsPage />} />
          <Route path="/our-team" element={<OurTeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Services page */}
          <Route path="/services" element={<ServicesPage />} />

          {/* SEO Audit Report */}
          <Route path="/seo-audit" element={<SEOAuditReport />} />
        </Routes>

        <Footer />
        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;

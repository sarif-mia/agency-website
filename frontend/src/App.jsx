import { Component, Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header3D";
import Footer from "./components/Footer";
import QuickLinks from "./components/AIChatbot";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
const page = (name) =>
  lazy(() =>
    import("./pages/StudioPages").then((module) => ({ default: module[name] })),
  );
const Services = page("ServicesPage"),
  Projects = page("ProjectsPage"),
  About = page("AboutPage"),
  Team = page("TeamPage"),
  ContentList = page("ContentListPage"),
  Detail = page("DetailPage"),
  Careers = page("CareersPage"),
  Resources = page("ResourcesPage"),
  Legal = page("LegalPage"),
  NotFound = page("NotFoundPage");
const Portal = lazy(() => import("./pages/ClientPortalPage"));
const Dashboard = lazy(() => import("./pages/ClientDashboardPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
class ErrorBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="shell not-found">
        <h1>Something needs a fresh start.</h1>
        <p>Please reload the page to try again.</p>
        <button
          className="button button-dark"
          onClick={() => window.location.reload()}
        >
          Reload page ↗
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="App" id="top">
            <a className="skip-link" href="#main-content">
              Skip to content
            </a>
            <Header />
            <main id="main-content" tabIndex={-1}>
              <Suspense
                fallback={
                  <div className="page-loading" role="status">
                    <span className="spinner" />
                    Loading…
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about-us" element={<About />} />
                  <Route path="/our-team" element={<Team />} />
                  <Route path="/all-projects" element={<Projects />} />
                  <Route
                    path="/portfolio"
                    element={<Navigate to="/all-projects" replace />}
                  />
                  <Route
                    path="/work/:slug"
                    element={<Detail kind="projects" />}
                  />
                  <Route path="/blog" element={<ContentList kind="blog" />} />
                  <Route path="/blog/:slug" element={<Detail kind="blog" />} />
                  <Route
                    path="/case-studies"
                    element={<ContentList kind="case-studies" />}
                  />
                  <Route
                    path="/case-studies/:slug"
                    element={<Detail kind="case-studies" />}
                  />
                  <Route path="/help" element={<ContentList kind="help" />} />
                  <Route path="/help/:slug" element={<Detail kind="help" />} />
                  <Route path="/quote" element={<Contact />} />
                  <Route
                    path="/contact"
                    element={<Navigate to="/quote" replace />}
                  />
                  <Route
                    path="/meeting"
                    element={<Contact key="meeting" meeting />}
                  />
                  <Route
                    path="/partnership"
                    element={<Contact key="partnership" partnership />}
                  />
                  <Route path="/client-portal" element={<Portal />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route
                    path="/portfolio-download"
                    element={<Navigate to="/all-projects" replace />}
                  />
                  <Route path="/privacy-policy" element={<Legal />} />
                  <Route path="/terms-conditions" element={<Legal terms />} />
                  <Route
                    path="/seo-audit"
                    element={<Navigate to="/help" replace />}
                  />
                  <Route
                    path="/testimonials"
                    element={<Navigate to="/about-us" replace />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <QuickLinks />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

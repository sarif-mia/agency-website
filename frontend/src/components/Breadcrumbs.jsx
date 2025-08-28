import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ customBreadcrumbs = null, className = "" }) => {
  const location = useLocation();
  
  // Generate breadcrumbs from current path if not provided
  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) return customBreadcrumbs;
    
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ name: 'Home', url: '/' }];
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      
      // Convert slug to readable name
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
      breadcrumbs.push({
        name: name,
        url: currentPath
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={`breadcrumbs ${className}`}
      aria-label="Breadcrumb navigation"
      role="navigation"
    >
      <div className="container mx-auto px-4">
        <ol className="breadcrumbs-list">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="breadcrumb-item">
              {index === 0 && (
                <Home className="breadcrumb-home-icon" size={16} />
              )}
              
              {index < breadcrumbs.length - 1 ? (
                <>
                  <Link 
                    to={crumb.url} 
                    className="breadcrumb-link"
                    aria-label={`Navigate to ${crumb.name}`}
                  >
                    {crumb.name}
                  </Link>
                  <ChevronRight className="breadcrumb-separator" size={14} />
                </>
              ) : (
                <span 
                  className="breadcrumb-current"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
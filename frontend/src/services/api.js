import { useState } from 'react';

// API Configuration and Service Functions
// Updated with proper production backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD 
    ? 'https://sitegenit-backend.onrender.com/api'  // Updated backend URL
    : 'http://localhost:8000/api'
);

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.warn(`API call failed for ${endpoint}:`, error.message);
    // Return empty data structure instead of throwing error
    // This allows the frontend to work without backend
    return {
      results: [],
      data: [],
      message: 'Backend not available - using demo mode',
      success: false
    };
  }
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiCall(`/projects/?${searchParams}`);
  },

  // Get featured projects
  getFeatured: async () => {
    return apiCall('/projects/featured/');
  },

  // Get project by slug
  getBySlug: async (slug) => {
    return apiCall(`/projects/${slug}/`);
  },

  // Get project categories
  getCategories: async () => {
    return apiCall('/projects/categories/');
  },
};

// Testimonials API
export const testimonialsAPI = {
  // Get all testimonials
  getAll: async () => {
    return apiCall('/testimonials/');
  },

  // Get featured testimonials
  getFeatured: async () => {
    return apiCall('/testimonials/featured/');
  },
};

// Services API
export const servicesAPI = {
  // Get all services
  getAll: async () => {
    return apiCall('/services/');
  },

  // Get service by slug
  getBySlug: async (slug) => {
    return apiCall(`/services/${slug}/`);
  },
};

// Blog API
export const blogAPI = {
  // Get all blog posts
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiCall(`/blog/?${searchParams}`);
  },

  // Get blog post by slug
  getBySlug: async (slug) => {
    return apiCall(`/blog/${slug}/`);
  },
};

// Help Center API
export const helpAPI = {
  // Get all help articles
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiCall(`/help/?${searchParams}`);
  },

  // Get help article by slug
  getBySlug: async (slug) => {
    return apiCall(`/help/${slug}/`);
  },

  // Get help articles by category
  getByCategory: async (category) => {
    return apiCall(`/help/category/${category}/`);
  },
};

// Case Studies API
export const caseStudiesAPI = {
  // Get all case studies
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiCall(`/case-studies/?${searchParams}`);
  },

  // Get case study by slug
  getBySlug: async (slug) => {
    return apiCall(`/case-studies/${slug}/`);
  },

  // Get featured case studies
  getFeatured: async () => {
    return apiCall('/case-studies/featured/');
  },

  // Get case studies by industry
  getByIndustry: async (industry) => {
    return apiCall(`/case-studies/industry/${industry}/`);
  },
};

// Contact API
export const contactAPI = {
  // Send contact message
  sendMessage: async (messageData) => {
    return apiCall('/contact/', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  // Send quick contact
  sendQuickContact: async (contactData) => {
    return apiCall('/contact/quick/', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// Newsletter API
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (email, name = '') => {
    return apiCall('/newsletter/subscribe/', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  },
};

// Stats API
export const statsAPI = {
  // Get website statistics
  getStats: async () => {
    return apiCall('/stats/');
  },
};

// Search API
export const searchAPI = {
  // Global search
  search: async (query) => {
    const searchParams = new URLSearchParams({ q: query });
    return apiCall(`/search/?${searchParams}`);
  },
};

// Health check API
export const healthAPI = {
  // Check API health
  check: async () => {
    return apiCall('/health/');
  },
};

// Authentication API
export const authAPI = {
  // User registration
  register: async (userData) => {
    return apiCall('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // User login
  login: async (credentials) => {
    return apiCall('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Meeting API
export const meetingAPI = {
  // Schedule a meeting
  scheduleRequest: async (meetingData) => {
    return apiCall('/meetings/request/', {
      method: 'POST',
      body: JSON.stringify(meetingData),
    });
  },

  // Get meeting requests (admin)
  getRequests: async () => {
    return apiCall('/meetings/');
  },
};

// Hook for using API data with loading and error states
export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { callAPI, loading, error, setError };
};

// Default export with all APIs
const api = {
  projects: projectsAPI,
  testimonials: testimonialsAPI,
  services: servicesAPI,
  blog: blogAPI,
  help: helpAPI,
  caseStudies: caseStudiesAPI,
  contact: contactAPI,
  newsletter: newsletterAPI,
  stats: statsAPI,
  search: searchAPI,
  health: healthAPI,
  auth: authAPI,
  meeting: meetingAPI,
};

export default api;
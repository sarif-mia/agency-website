// Performance and SEO optimization utilities

// Lazy load images for better performance
export class LazyImageLoader {
  constructor() {
    this.imageObserver = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });
    }
  }

  observe(img) {
    if (this.imageObserver) {
      this.imageObserver.observe(img);
    } else {
      // Fallback for browsers without IntersectionObserver
      img.src = img.dataset.src;
      img.classList.add('loaded');
    }
  }

  observeAll() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => this.observe(img));
  }
}

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/assets/hero-background.jpg', as: 'image' },
    { href: '/assets/logo.png', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'style') {
      link.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
      };
    }
    document.head.appendChild(link);
  });
};

// Optimize Core Web Vitals
export class CoreWebVitalsOptimizer {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Measure Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log('LCP:', lastEntry.startTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Handle browsers that don't support this metric
      }

      // Measure First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = entry.processingStart - entry.startTime;
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Handle browsers that don't support this metric
      }

      // Measure Cumulative Layout Shift (CLS)
      let clsValue = 0;
      let clsEntries = [];
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsEntries.push(entry);
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
        console.log('CLS:', clsValue);
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Handle browsers that don't support this metric
      }
    }
  }

  getMetrics() {
    return this.metrics;
  }
}

// Optimize images
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading=\"lazy\" for images below the fold
    if (!img.hasAttribute('loading')) {
      const imgRect = img.getBoundingClientRect();
      if (imgRect.top > window.innerHeight) {
        img.setAttribute('loading', 'lazy');
      }
    }

    // Add proper alt attributes if missing
    if (!img.alt && img.src) {
      const filename = img.src.split('/').pop().split('.')[0];
      img.alt = filename.replace(/[-_]/g, ' ');
    }

    // Optimize image dimensions
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      const containerWidth = img.parentElement.clientWidth;
      if (img.naturalWidth > containerWidth * 2) {
        console.warn(`Image ${img.src} might be too large for its container`);
      }
    }
  });
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Minimize main thread blocking
export const optimizeMainThread = () => {
  // Use requestIdleCallback for non-critical tasks
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Initialize non-critical analytics
      initializeAnalytics();
    });

    requestIdleCallback(() => {
      // Initialize non-critical third-party widgets
      initializeWidgets();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      initializeAnalytics();
      initializeWidgets();
    }, 3000);
  }
};

const initializeAnalytics = () => {
  // Initialize Google Analytics or other analytics
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID');
  }
};

const initializeWidgets = () => {
  // Initialize chatbots, social widgets, etc.
  console.log('Non-critical widgets initialized');
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
    { rel: 'dns-prefetch', href: '//cdn.jsdelivr.net' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) {
      link.crossOrigin = hint.crossorigin;
    }
    document.head.appendChild(link);
  });
};

// Initialize all optimizations
export const initializePerformanceOptimizations = () => {
  // Initialize lazy image loader
  const lazyLoader = new LazyImageLoader();
  lazyLoader.observeAll();

  // Initialize Core Web Vitals monitoring
  new CoreWebVitalsOptimizer();

  // Preload critical resources
  preloadCriticalResources();

  // Add resource hints
  addResourceHints();

  // Optimize images
  optimizeImages();

  // Optimize main thread
  optimizeMainThread();

  // Register service worker
  registerServiceWorker();

  // Re-run optimizations on route changes
  window.addEventListener('popstate', () => {
    setTimeout(() => {
      optimizeImages();
      lazyLoader.observeAll();
    }, 100);
  });
};
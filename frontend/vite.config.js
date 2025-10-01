import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set base path for deployment
  base: '/',
  
  plugins: [react()],
  
  // SEO and Performance Optimizations
  build: {
    // Code splitting for better loading performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion', 'aos'],
          icons: ['lucide-react']
        }
      }
    },
    
    // Optimize chunk size for better SEO
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps for production debugging
    sourcemap: false,
    
    // Minify for better performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    host: true,
    
    // Proxy API calls to backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  
  // CSS preprocessing
  css: {
    devSourcemap: true
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'aos',
      'lucide-react',
      'react-helmet-async'
    ]
  }
})
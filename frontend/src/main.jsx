import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializePerformanceOptimizations } from './utils/performanceOptimizer'

// Initialize performance optimizations
initializePerformanceOptimizations();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

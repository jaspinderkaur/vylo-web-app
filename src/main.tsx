import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Programmatic Plausible Analytics injection
function injectPlausible(domain: string) {
  const s = document.createElement('script');
  s.setAttribute('defer', '');
  s.setAttribute('data-domain', domain);
  s.src = 'https://plausible.io/js/script.js';
  
  s.onload = () => {
    console.log('Plausible script loaded successfully');
  };
  
  s.onerror = (error) => {
    console.error('Failed to load Plausible script:', error);
  };
  
  document.head.appendChild(s);
  console.log('Plausible script element added to head');
}

// Conditionally load Plausible Analytics
const shouldLoadAnalytics = 
  (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS === '1') ||
  (import.meta.env.VITE_ENABLE_ANALYTICS === '1' && /\.?vylohub\.com$/.test(window.location.hostname)) ||
  (import.meta.env.VITE_ENABLE_ANALYTICS === '1' && window.location.hostname.includes('vylohub'));

if (shouldLoadAnalytics) {
  console.log('Loading Plausible Analytics...');
  const domain = 'app.vylohub.com';
  injectPlausible(domain);
} else {
  console.log('Analytics not loaded - conditions not met');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
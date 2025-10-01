import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Programmatic Plausible Analytics injection
function injectPlausible(domain: string) {
  const s = document.createElement('script');
  s.setAttribute('defer', '');
  s.setAttribute('data-domain', domain);
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
}

// Conditionally load Plausible Analytics
console.log('Analytics Debug:', {
  isProd: import.meta.env.PROD,
  analyticsEnabled: import.meta.env.VITE_ENABLE_ANALYTICS,
  hostname: window.location.hostname,
  hostnameMatch: /\.?vylohub\.com$/.test(window.location.hostname),
  allEnvVars: import.meta.env
});

// More permissive conditions for testing
const shouldLoadAnalytics = 
  (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS === '1') ||
  (import.meta.env.VITE_ENABLE_ANALYTICS === '1' && /\.?vylohub\.com$/.test(window.location.hostname)) ||
  (import.meta.env.VITE_ENABLE_ANALYTICS === '1' && window.location.hostname.includes('vylohub'));

if (shouldLoadAnalytics) {
  console.log('Loading Plausible Analytics...');
  injectPlausible('vylohub.com');
} else {
  console.log('Analytics not loaded - conditions not met');
  console.log('Debug info:', {
    isProd: import.meta.env.PROD,
    analyticsEnabled: import.meta.env.VITE_ENABLE_ANALYTICS,
    hostname: window.location.hostname,
    shouldLoad: shouldLoadAnalytics
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

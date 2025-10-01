import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { logToProduction } from './utils/productionLogger'

// Programmatic Plausible Analytics injection
function injectPlausible(domain: string) {
  const s = document.createElement('script');
  s.setAttribute('defer', '');
  s.setAttribute('data-domain', domain);
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
}

// Conditionally load Plausible Analytics
const debugInfo = {
  isProd: import.meta.env.PROD,
  analyticsEnabled: import.meta.env.VITE_ENABLE_ANALYTICS,
  hostname: window.location.hostname,
  hostnameMatch: /\.?vylohub\.com$/.test(window.location.hostname),
  allEnvVars: import.meta.env
};

console.log('Analytics Debug:', debugInfo);
logToProduction('Analytics Debug', debugInfo);

// More permissive conditions for testing
const shouldLoadAnalytics = 
  (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS === '1') ||
  (import.meta.env.VITE_ENABLE_ANALYTICS === '1' && /\.?vylohub\.com$/.test(window.location.hostname)) ||
  (import.meta.env.VITE_ENABLE_ANALYTICS === '1' && window.location.hostname.includes('vylohub'));

if (shouldLoadAnalytics) {
  console.log('Loading Plausible Analytics...');
  logToProduction('Loading Plausible Analytics...');
  // Use production domain for testing
  const domain = 'vylohub.com';
  injectPlausible(domain);
} else {
  console.log('Analytics not loaded - conditions not met');
  logToProduction('Analytics not loaded - conditions not met');
  const debugInfo = {
    isProd: import.meta.env.PROD,
    analyticsEnabled: import.meta.env.VITE_ENABLE_ANALYTICS,
    hostname: window.location.hostname,
    shouldLoad: shouldLoadAnalytics
  };
  console.log('Debug info:', debugInfo);
  logToProduction('Debug info', debugInfo);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Load Plausible Analytics
const script = document.createElement('script');
script.defer = true;
script.dataset.domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'localhost';
script.src = 'https://plausible.io/js/script.js';
document.head.appendChild(script);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

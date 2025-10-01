// Force analytics loading for debugging
export const forceLoadAnalytics = () => {
  console.log('Force loading analytics for debugging...');
  
  // Remove existing script if any
  const existingScript = document.querySelector('script[src*="plausible.io"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create new script
  const script = document.createElement('script');
  script.setAttribute('defer', '');
  script.setAttribute('data-domain', 'vylohub.com');
  script.src = 'https://plausible.io/js/script.js';
  script.onload = () => {
    console.log('Plausible script loaded successfully');
    // Test if plausible is available
    setTimeout(() => {
      if (typeof window.plausible === 'function') {
        console.log('Plausible function is available');
        window.plausible('test_force_load', { props: { debug: true } });
      } else {
        console.log('Plausible function not available yet');
      }
    }, 1000);
  };
  script.onerror = () => {
    console.error('Failed to load Plausible script');
  };
  
  document.head.appendChild(script);
};

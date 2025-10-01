// Comprehensive Plausible debugging
export const debugPlausible = () => {
  console.log('=== PLAUSIBLE DEBUG INFO ===');
  
  // Check if plausible is loaded
  const plausibleExists = typeof window.plausible === 'function';
  console.log('Plausible function exists:', plausibleExists);
  
  // Check current domain
  console.log('Current domain:', window.location.hostname);
  console.log('Current origin:', window.location.origin);
  
  // Check for existing script
  const existingScript = document.querySelector('script[src*="plausible.io"]');
  console.log('Existing Plausible script:', existingScript);
  if (existingScript) {
    console.log('Script data-domain:', existingScript.getAttribute('data-domain'));
  }
  
  // Test event sending
  if (plausibleExists) {
    console.log('Testing event sending...');
    try {
      window.plausible?.('debug_test', { 
        props: { 
          timestamp: new Date().toISOString(),
          domain: window.location.hostname,
          userAgent: navigator.userAgent
        } 
      });
      console.log('✅ Event sent successfully');
    } catch (error) {
      console.error('❌ Event sending failed:', error);
    }
  } else {
    console.log('❌ Plausible function not available');
  }
  
  // Check network requests
  console.log('=== NETWORK DEBUG ===');
  console.log('Check Network tab for requests to plausible.io/event');
  console.log('Look for requests with your domain in the payload');
  
  return {
    plausibleExists,
    domain: window.location.hostname,
    scriptExists: !!existingScript
  };
};

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, any> }) => void;
  }
}

export function track(event: string, props?: Record<string, any>) {
  const isProdHost = typeof window !== 'undefined' && /\.?vylohub\.com$/.test(window.location.hostname);
  const plausibleExists = typeof window.plausible === 'function';
  
  console.log('Track Debug:', {
    event,
    props,
    isProdHost,
    plausibleExists,
    hostname: window.location.hostname
  });
  
  if (!isProdHost || !plausibleExists) {
    console.log('Track skipped - conditions not met');
    return;
  }
  
  console.log('Sending event to Plausible:', event, props);
  window.plausible?.(event, props ? { props } : undefined);
}

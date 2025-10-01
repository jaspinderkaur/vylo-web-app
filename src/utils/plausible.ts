declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, any> }) => void
  }
}

export function track(event: string, props?: Record<string, any>) {
  const isProdHost = typeof window !== 'undefined' && /\.?vylohub\.com$/.test(window.location.hostname);
  
  if (!isProdHost || typeof window.plausible !== 'function') return;
  
  window.plausible(event, props ? { props } : undefined);
}
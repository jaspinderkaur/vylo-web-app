import { useEffect } from 'react';

interface UsePlausiblePageviewsProps {
  pathname: string;
}

/**
 * Hook to track pageviews in Plausible Analytics for SPA navigation
 * Works with or without React Router
 */
export const usePlausiblePageviews = ({ pathname }: UsePlausiblePageviewsProps) => {
  useEffect(() => {
    // Guard against missing window or plausible
    if (typeof window === 'undefined' || typeof window.plausible !== 'function') {
      return;
    }

    // Track pageview with current pathname
    try {
      window.plausible('pageview');
    } catch (error) {
      console.warn('Plausible pageview tracking failed:', error);
    }
  }, [pathname]);
};

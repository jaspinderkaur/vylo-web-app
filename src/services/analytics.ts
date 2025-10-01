// Analytics service for Plausible integration

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    try {
      window.plausible(event, { props: properties });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }
};

export const trackHabitCompleted = (habitId: string, mood: string) => {
  trackEvent('Habit Completed', {
    habit_id: habitId,
    mood: mood,
    timestamp: new Date().toISOString()
  });
};

export const trackMoodSelected = (mood: string) => {
  trackEvent('Mood Selected', {
    mood: mood,
    timestamp: new Date().toISOString()
  });
};

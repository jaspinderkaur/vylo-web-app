// Analytics service for Plausible integration
import { track } from '../utils/plausible';

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  try {
    track(event, properties);
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
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

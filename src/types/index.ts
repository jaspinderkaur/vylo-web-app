export type Mood = 'tired' | 'focused' | 'stressed';

export interface Habit {
  id: string;
  title: string;
  duration: string;
  instructions: string;
  dopamine_hook: string;
  mood: Mood;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

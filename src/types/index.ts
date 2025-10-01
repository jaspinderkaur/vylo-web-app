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

// Custom Habits Types
export type Frequency = 'daily' | 'weekly' | { timesPerWeek: number };
export type HabitCategory = 'Energy' | 'Focus' | 'Self-care' | 'Body' | 'Mind' | 'Other';

export interface CustomHabit {
  id: string;
  name: string;
  category?: HabitCategory;
  frequency?: Frequency;
  created_at: number; // epoch ms
  completions: Record<string, boolean>; // keyed by YYYY-MM-DD
}

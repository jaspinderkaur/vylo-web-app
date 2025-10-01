import { useState, useEffect } from 'react';
import { getHabitsByMood } from '../services/firebase';
import type { Habit, Mood } from '../types';

export const useFirestore = (mood: Mood | null) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mood) {
      setHabits([]);
      return;
    }

    const fetchHabits = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedHabits = await getHabitsByMood(mood);
        setHabits(fetchedHabits);
      } catch (err) {
        setError('Failed to fetch habits');
        console.error('Error fetching habits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [mood]);

  return { habits, loading, error };
};

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import type { Habit, Mood } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Mock data for when Firestore is empty or fails
const mockHabits: Record<Mood, Habit[]> = {
  tired: [
    {
      id: 'mock-tired-1',
      title: 'Gentle Stretch',
      duration: '2 minutes',
      instructions: 'Stand up and reach for the sky, then gently roll your shoulders back.',
      dopamine_hook: 'Feel your body thanking you for the movement',
      mood: 'tired'
    },
    {
      id: 'mock-tired-2',
      title: 'Deep Breathing',
      duration: '1 minute',
      instructions: 'Take 4 slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.',
      dopamine_hook: 'Notice how your mind feels clearer with each breath',
      mood: 'tired'
    },
    {
      id: 'mock-tired-3',
      title: 'Hydration Break',
      duration: '30 seconds',
      instructions: 'Drink a full glass of water and take a moment to appreciate the refreshment.',
      dopamine_hook: 'Feel the energy flowing back into your body',
      mood: 'tired'
    }
  ],
  focused: [
    {
      id: 'mock-focused-1',
      title: 'Power Pose',
      duration: '1 minute',
      instructions: 'Stand tall with hands on hips, chest out. Hold this confident pose.',
      dopamine_hook: 'Feel your confidence and energy building',
      mood: 'focused'
    },
    {
      id: 'mock-focused-2',
      title: 'Goal Visualization',
      duration: '2 minutes',
      instructions: 'Close your eyes and vividly imagine achieving your main goal today.',
      dopamine_hook: 'Feel the excitement of success already happening',
      mood: 'focused'
    },
    {
      id: 'mock-focused-3',
      title: 'Quick Planning',
      duration: '3 minutes',
      instructions: 'Write down your top 3 priorities for the next hour.',
      dopamine_hook: 'Feel the clarity and direction this gives you',
      mood: 'focused'
    }
  ],
  stressed: [
    {
      id: 'mock-stressed-1',
      title: 'Box Breathing',
      duration: '2 minutes',
      instructions: 'Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.',
      dopamine_hook: 'Feel the stress melting away with each cycle',
      mood: 'stressed'
    },
    {
      id: 'mock-stressed-2',
      title: 'Gratitude Moment',
      duration: '1 minute',
      instructions: 'Think of 3 things you\'re grateful for right now, no matter how small.',
      dopamine_hook: 'Feel the warmth of appreciation filling your heart',
      mood: 'stressed'
    },
    {
      id: 'mock-stressed-3',
      title: 'Gentle Self-Talk',
      duration: '1 minute',
      instructions: 'Place your hand on your heart and say \'I\'m doing my best, and that\'s enough.\'',
      dopamine_hook: 'Feel the self-compassion washing over you',
      mood: 'stressed'
    }
  ]
};

export const getHabitsByMood = async (mood: Mood): Promise<Habit[]> => {
  try {
    const habitsRef = collection(db, 'habits');
    const q = query(habitsRef, where('mood', '==', mood));
    const querySnapshot = await getDocs(q);
    
    const habits: Habit[] = [];
    querySnapshot.forEach((doc) => {
      habits.push({ id: doc.id, ...doc.data() } as Habit);
    });
    
    // If no habits found in Firestore, return mock data
    if (habits.length === 0) {
      console.log('No habits found in Firestore, using mock data');
      return mockHabits[mood];
    }
    
    // Return 3 random habits
    return habits.sort(() => 0.5 - Math.random()).slice(0, 3);
  } catch (error) {
    console.error('Error fetching habits:', error);
    console.log('Falling back to mock data');
    return mockHabits[mood];
  }
};

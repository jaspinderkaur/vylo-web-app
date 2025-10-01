import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc,
  deleteDoc,
  getFirestore,
  serverTimestamp,
  query
} from 'firebase/firestore';
import { db } from '../services/firebase';
import type { CustomHabit } from '../types';

// --- Helper Functions ---

// Generates a YYYY-MM-DD string for today
export const todayStr = (): string => {
  return new Date().toISOString().slice(0, 10);
};

// Generates a unique anonymous user ID for Firestore/localStorage
const getAnonUid = (): string => {
  let uid = localStorage.getItem('anon_uid');
  if (!uid) {
    uid = `anon-${Math.random().toString(36).substring(2, 15)}`; // Simple unique ID
    localStorage.setItem('anon_uid', uid);
  }
  return uid;
};

// Checks if Firestore is configured and available
const isFirestoreConfigured = (): boolean => {
  try {
    // Check if db object is initialized and has a projectId
    return !!db && !!getFirestore().app.options.projectId;
  } catch (e) {
    return false;
  }
};

// Check if migration has already been performed
const isMigrationCompleted = (): boolean => {
  return localStorage.getItem('vylo_habits_migrated') === 'true';
};

// Mark migration as completed
const markMigrationCompleted = (): void => {
  localStorage.setItem('vylo_habits_migrated', 'true');
};

// --- Firestore Implementation ---
const firestoreHabitsStore = {
  async listHabits(): Promise<CustomHabit[]> {
    try {
      const uid = getAnonUid();
      const habitsRef = collection(db, 'users', uid, 'custom_habits');
      const q = query(habitsRef);
      const querySnapshot = await getDocs(q);
      const habits: CustomHabit[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        habits.push({
          id: doc.id,
          name: data.name,
          category: data.category,
          frequency: data.frequency,
          created_at: data.created_at?.toMillis() || Date.now(), // Convert Firestore Timestamp to epoch ms
          completions: data.completions || {},
        } as CustomHabit);
      });
      return habits;
    } catch (error) {
      console.error('Firestore listHabits error:', error);
      throw error; // Re-throw to trigger fallback
    }
  },

  async addHabit(habitData: Omit<CustomHabit, 'id' | 'created_at' | 'completions'>): Promise<CustomHabit> {
    try {
      const uid = getAnonUid();
      const habitsRef = collection(db, 'users', uid, 'custom_habits');
      const newHabit = {
        ...habitData,
        created_at: serverTimestamp(), // Use Firestore server timestamp
        completions: {},
      };
      const docRef = await addDoc(habitsRef, newHabit);
      return {
        ...newHabit,
        id: docRef.id,
        created_at: Date.now(), // Return client-side timestamp for immediate use
      } as CustomHabit;
    } catch (error) {
      console.error('Firestore addHabit error:', error);
      throw error;
    }
  },

  async setCompletedToday(id: string, completed: boolean, dateString: string = todayStr()): Promise<void> {
    try {
      const uid = getAnonUid();
      const habitRef = doc(db, 'users', uid, 'custom_habits', id);
      // Use FieldValue.set to update a nested map
      await updateDoc(habitRef, {
        [`completions.${dateString}`]: completed,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Firestore setCompletedToday error:', error);
      throw error;
    }
  },

  async getAccumulatedWins(): Promise<number> {
    try {
      const habits = await this.listHabits();
      let totalWins = 0;
      habits.forEach(habit => {
        for (const date in habit.completions) {
          if (habit.completions[date]) {
            totalWins++;
          }
        }
      });
      return totalWins;
    } catch (error) {
      console.error('Firestore getAccumulatedWins error:', error);
      throw error;
    }
  },

  async deleteHabit(id: string): Promise<void> {
    try {
      const uid = getAnonUid();
      const habitRef = doc(db, 'users', uid, 'custom_habits', id);
      await deleteDoc(habitRef);
    } catch (error) {
      console.error('Firestore deleteHabit error:', error);
      throw error;
    }
  },
};

// --- LocalStorage Implementation ---
const LOCAL_STORAGE_KEY = 'vylo_custom_habits';

const localStorageHabitsStore = {
  _getHabits(): CustomHabit[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  _saveHabits(habits: CustomHabit[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits));
  },

  async listHabits(): Promise<CustomHabit[]> {
    return this._getHabits();
  },

  async addHabit(habitData: Omit<CustomHabit, 'id' | 'created_at' | 'completions'>): Promise<CustomHabit> {
    const habits = this._getHabits();
    const newHabit: CustomHabit = {
      ...habitData,
      id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      created_at: Date.now(),
      completions: {},
    };
    habits.push(newHabit);
    this._saveHabits(habits);
    return newHabit;
  },

  async setCompletedToday(id: string, completed: boolean, dateString: string = todayStr()): Promise<void> {
    const habits = this._getHabits();
    const habitIndex = habits.findIndex(h => h.id === id);
    if (habitIndex > -1) {
      habits[habitIndex].completions = {
        ...habits[habitIndex].completions,
        [dateString]: completed,
      };
      this._saveHabits(habits);
    }
  },

  async getAccumulatedWins(): Promise<number> {
    const habits = this._getHabits();
    let totalWins = 0;
    habits.forEach(habit => {
      for (const date in habit.completions) {
        if (habit.completions[date]) {
          totalWins++;
        }
      }
    });
    return totalWins;
  },

  async deleteHabit(id: string): Promise<void> {
    const habits = this._getHabits();
    const filteredHabits = habits.filter(habit => habit.id !== id);
    this._saveHabits(filteredHabits);
  },
};

// --- Migration Function ---
const migrateLocalToFirestore = async (): Promise<void> => {
  if (!isFirestoreConfigured() || isMigrationCompleted()) {
    return; // Skip if Firestore not available or already migrated
  }

  try {
    console.log('Starting migration from localStorage to Firestore...');
    
    // Get all local habits
    const localHabits = localStorageHabitsStore._getHabits();
    
    if (localHabits.length === 0) {
      console.log('No local habits to migrate');
      markMigrationCompleted();
      return;
    }

    // Migrate each habit to Firestore
    const uid = getAnonUid();
    const habitsRef = collection(db, 'users', uid, 'custom_habits');
    
    for (const habit of localHabits) {
      try {
        const { id, ...habitData } = habit; // Remove local ID
        await addDoc(habitsRef, {
          ...habitData,
          created_at: serverTimestamp(),
          migrated_from_local: true,
          migrated_at: serverTimestamp(),
        });
        console.log(`Migrated habit: ${habit.name}`);
      } catch (error) {
        console.error(`Failed to migrate habit ${habit.name}:`, error);
      }
    }

    // Mark migration as completed
    markMigrationCompleted();
    console.log(`Successfully migrated ${localHabits.length} habits to Firestore`);
    
    // Optionally clear local storage after successful migration
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

// --- Unified API with Fallback and Migration ---
export const habitsStore = {
  // Initialize and run migration if needed
  async initialize(): Promise<void> {
    if (isFirestoreConfigured() && !isMigrationCompleted()) {
      try {
        await migrateLocalToFirestore();
      } catch (error) {
        console.warn('Migration failed, continuing with current storage:', error);
      }
    }
  },

  async listHabits(): Promise<CustomHabit[]> {
    if (isFirestoreConfigured()) {
      try {
        return await firestoreHabitsStore.listHabits();
      } catch (e) {
        console.warn('Firestore failed, falling back to localStorage for listHabits:', e);
        return localStorageHabitsStore.listHabits();
      }
    }
    return localStorageHabitsStore.listHabits();
  },

  async addHabit(habitData: Omit<CustomHabit, 'id' | 'created_at' | 'completions'>): Promise<CustomHabit> {
    if (isFirestoreConfigured()) {
      try {
        return await firestoreHabitsStore.addHabit(habitData);
      } catch (e) {
        console.warn('Firestore failed, falling back to localStorage for addHabit:', e);
        return localStorageHabitsStore.addHabit(habitData);
      }
    }
    return localStorageHabitsStore.addHabit(habitData);
  },

  async setCompletedToday(id: string, completed: boolean, dateString: string = todayStr()): Promise<void> {
    if (isFirestoreConfigured()) {
      try {
        await firestoreHabitsStore.setCompletedToday(id, completed, dateString);
        return;
      } catch (e) {
        console.warn('Firestore failed, falling back to localStorage for setCompletedToday:', e);
        await localStorageHabitsStore.setCompletedToday(id, completed, dateString);
        return;
      }
    }
    await localStorageHabitsStore.setCompletedToday(id, completed, dateString);
  },

  async getAccumulatedWins(): Promise<number> {
    if (isFirestoreConfigured()) {
      try {
        return await firestoreHabitsStore.getAccumulatedWins();
      } catch (e) {
        console.warn('Firestore failed, falling back to localStorage for getAccumulatedWins:', e);
        return localStorageHabitsStore.getAccumulatedWins();
      }
    }
    return localStorageHabitsStore.getAccumulatedWins();
  },

  async deleteHabit(id: string): Promise<void> {
    if (isFirestoreConfigured()) {
      try {
        await firestoreHabitsStore.deleteHabit(id);
        return;
      } catch (e) {
        console.warn('Firestore failed, falling back to localStorage for deleteHabit:', e);
        await localStorageHabitsStore.deleteHabit(id);
        return;
      }
    }
    await localStorageHabitsStore.deleteHabit(id);
  },

  // Utility methods
  isFirestoreAvailable(): boolean {
    return isFirestoreConfigured();
  },

  isMigrationCompleted(): boolean {
    return isMigrationCompleted();
  },

  // Force migration (useful for testing or manual triggers)
  async forceMigration(): Promise<void> {
    localStorage.removeItem('vylo_habits_migrated'); // Reset migration flag
    await migrateLocalToFirestore();
  },
};

export default habitsStore;
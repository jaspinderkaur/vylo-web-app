import { useState, useEffect, useMemo } from 'react';
import { AddHabitModal } from './AddHabitModal';
import { DeleteHabitModal } from './DeleteHabitModal';
import { HabitTile } from './HabitTile';
import { WeekBars } from './WeekBars';
import { EmptyStateIcon } from './EmptyStateIcon';
import { WinsBanner } from './WinsBanner';
import habitsStore from '../storage/habitsStore';
import type { CustomHabit } from '../types';

export const MyHabitsSection = () => {
  const [habits, setHabits] = useState<CustomHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWeekView, setShowWeekView] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<CustomHabit | null>(null);

  // Load habits on mount
  useEffect(() => {
    const initializeAndLoad = async () => {
      try {
        // Initialize storage and run migration if needed
        await habitsStore.initialize();
        // Then load the data
        await loadHabits();
      } catch (error) {
        console.error('Failed to initialize habits store:', error);
        // Still try to load habits even if initialization fails
        await loadHabits();
      }
    };
    
    initializeAndLoad();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      const habitsData = await habitsStore.listHabits();
      setHabits(habitsData);
    } catch (error) {
      console.error('Failed to load habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async (habitData: Omit<CustomHabit, 'id' | 'created_at' | 'completions'>) => {
    try {
      const newHabit = await habitsStore.addHabit(habitData);
      setHabits(prev => [...prev, newHabit]);
    } catch (error) {
      console.error('Failed to add habit:', error);
    }
  };

  const handleToggleHabit = async (habitId: string, completed: boolean) => {
    try {
      await habitsStore.setCompletedToday(habitId, completed);
      
      // Update local state
      setHabits(prev => prev.map(habit => {
        if (habit.id === habitId) {
          const today = new Date().toISOString().split('T')[0];
          return {
            ...habit,
            completions: {
              ...habit.completions,
              [today]: completed
            }
          };
        }
        return habit;
      }));
    } catch (error) {
      console.error('Failed to toggle habit:', error);
    }
  };

  const handleDeleteHabit = (habit: CustomHabit) => {
    setHabitToDelete(habit);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (habitId: string) => {
    try {
      await habitsStore.deleteHabit(habitId);
      
      // Update local state
      setHabits(prev => prev.filter(habit => habit.id !== habitId));
    } catch (error) {
      console.error('Failed to delete habit:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setHabitToDelete(null);
  };

  // Calculate total wins from habits
  const totalWins = useMemo(() => {
    return habits.reduce((total, habit) => {
      const completions = habit.completions || {};
      const wins = Object.values(completions).filter(Boolean).length;
      return total + wins;
    }, 0);
  }, [habits]);

  if (loading) {
    return (
      <div className="personal-habits-section">
        <div className="habits-header">
          <h2>Personal Habits</h2>
          <button 
            className="add-habit-btn"
            onClick={() => setIsModalOpen(true)}
            aria-label="Add new habit"
          >
            + Add Habit
          </button>
        </div>
        <div className="habits-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="personal-habits-section">
      {/* Wins Banner with integrated buttons - Only show when there are habits */}
      {habits.length > 0 && (
        <div className="wins-banner-container">
          <WinsBanner 
            wins={totalWins}
            showWeekView={showWeekView}
            onToggleWeekView={() => setShowWeekView(!showWeekView)}
            onAddHabit={() => setIsModalOpen(true)}
            hasHabits={habits.length > 0}
          />
        </div>
      )}

      {/* Personal Habits Header - Now below score card */}
      <div className="habits-header">
        <h2>Personal Habits</h2>
      </div>

      {showWeekView && habits.length > 0 && (
        <div className="week-view-section">
          <WeekBars habits={habits} />
        </div>
      )}

      {habits.length === 0 ? (
        <div className="habits-empty">
          <EmptyStateIcon onClick={() => setIsModalOpen(true)} />
          <p>No habits yet. Click the button above to add your first habit!</p>
        </div>
      ) : (
            <div className="habits-grid habits-grid-centered">
              {habits.map(habit => (
                <HabitTile
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggleHabit}
                  onDelete={handleDeleteHabit}
                />
              ))}
            </div>
      )}

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddHabit}
      />

      <DeleteHabitModal
        isOpen={deleteModalOpen}
        habit={habitToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

import { useState } from 'react';
import { track } from '../utils/plausible';
import type { CustomHabit } from '../types';
import { todayStr } from '../storage/habitsStore';

interface HabitTileProps {
  habit: CustomHabit;
  onToggle: (habitId: string, completed: boolean) => void;
}

export const HabitTile = ({ habit, onToggle }: HabitTileProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const today = todayStr();
  const isCompletedToday = habit.completions[today] || false;

  const handleToggle = () => {
    if (isAnimating) return;
    
    const wasCompleted = isCompletedToday;
    const willBeCompleted = !wasCompleted;
    
    setIsAnimating(true);
    onToggle(habit.id, willBeCompleted);
    
    // Show success message for completions
    if (willBeCompleted) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
      
      // Track analytics event for habit completion
      track('anchor_habit_completed', { name: habit.name });
    }
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className={`habit-tile ${isCompletedToday ? 'completed' : ''} ${isAnimating ? 'animating' : ''}`}>
      <div className="habit-tile-content">
        <div className="habit-info">
          <h3 className="habit-name">{habit.name}</h3>
          {habit.category && (
            <span className="habit-category">{habit.category}</span>
          )}
        </div>
        
        <button
          className={`habit-toggle ${isCompletedToday ? 'completed' : ''}`}
          onClick={handleToggle}
          aria-pressed={isCompletedToday}
          aria-label={`Mark ${habit.name} as ${isCompletedToday ? 'not completed' : 'completed'} today`}
        >
          {isCompletedToday ? '✓' : '○'}
        </button>
      </div>
      
      {isAnimating && (
        <div className="habit-glow" />
      )}
      
      {showSuccessMessage && (
        <div 
          className="habit-success-message"
          aria-live="polite"
          role="status"
        >
          Nice! You banked a win.
        </div>
      )}
    </div>
  );
};

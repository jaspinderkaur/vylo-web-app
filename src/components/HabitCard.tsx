import { useState } from 'react';
import { trackHabitCompleted } from '../services/analytics';
import { DopamineAnimation } from './DopamineAnimation';
import type { Habit, Mood } from '../types';

interface HabitCardProps {
  habit: Habit;
  mood: Mood;
}

export const HabitCard = ({ habit, mood }: HabitCardProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleComplete = () => {
    if (isCompleted) return;
    
    setIsCompleted(true);
    setShowAnimation(true);
    trackHabitCompleted(habit.id, mood);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <div className={`habit-card ${isCompleted ? 'completed' : ''}`}>
      <DopamineAnimation 
        trigger={showAnimation} 
        onComplete={handleAnimationComplete} 
      />
      
      <div className="habit-header">
        <h3 className="habit-title">{habit.title}</h3>
        <span className="habit-duration">{habit.duration}</span>
      </div>
      
      <div className="habit-content">
        <p className="habit-instructions">{habit.instructions}</p>
        <div className="habit-dopamine-hook">
          <span className="dopamine-label">💫 Dopamine Hook:</span>
          <span className="dopamine-text">{habit.dopamine_hook}</span>
        </div>
      </div>
      
      <button
        className={`habit-complete-btn ${isCompleted ? 'completed' : ''}`}
        onClick={handleComplete}
        disabled={isCompleted}
        aria-label={`Mark ${habit.title} as completed`}
      >
        {isCompleted ? '✨ Done!' : 'I did it!'}
      </button>
    </div>
  );
};

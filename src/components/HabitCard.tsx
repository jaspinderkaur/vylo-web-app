import { useState } from 'react';
import { track } from '../utils/plausible';
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
    track('habit_completed', { mood, habit_title: habit.title });
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
        <div className="habit-instructions">
          {habit.instructions.split(';').map((instruction, index) => (
            <div key={index} className="instruction-step">
              {instruction.trim()}
            </div>
          ))}
        </div>
        <div className="habit-dopamine-hook">
          <span className="dopamine-text">⚡ Boost you'll get: {habit.dopamine_hook}</span>
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

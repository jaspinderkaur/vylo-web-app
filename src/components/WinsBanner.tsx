import { useState, useEffect } from 'react';
import habitsStore from '../storage/habitsStore';

interface WinsBannerProps {
  showWeekView?: boolean;
  onToggleWeekView?: () => void;
  onAddHabit?: () => void;
  hasHabits?: boolean;
}

export const WinsBanner = ({ 
  showWeekView = false, 
  onToggleWeekView, 
  onAddHabit, 
  hasHabits = false 
}: WinsBannerProps) => {
  const [wins, setWins] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWins = async () => {
      try {
        await habitsStore.initialize();
        const totalWins = await habitsStore.getAccumulatedWins();
        setWins(totalWins);
      } catch (error) {
        console.error('Failed to load wins:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWins();
  }, []);

  if (loading) {
    return (
      <div className="wins-banner" role="region" aria-labelledby="wins-heading">
        <div className="wins-display">
          <div className="wins-counter">
            <div className="loading-spinner"></div>
            <span>Loading wins...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wins-banner" role="region" aria-labelledby="wins-heading">
      <div className="wins-display">
        <div className="wins-number-large">{wins}</div>
        <div className="wins-counter">
          {wins === 0 ? 'Ready to start winning?' : 'You\'ve banked wins!'}
        </div>
        <div className="wins-subtext">
          {wins === 0 ? 'Every small step counts! 🌱' : 'Building momentum, one habit at a time! 🚀'}
        </div>
        
        {hasHabits && (
          <div className="wins-card-actions">
            <button 
              className="week-view-btn"
              onClick={onToggleWeekView}
              aria-label={showWeekView ? "Hide week view" : "Show week view"}
            >
              {showWeekView ? "Hide week" : "See week"}
            </button>
            <button 
              className="add-habit-btn"
              onClick={onAddHabit}
              aria-label="Add new habit"
            >
              + Add Habit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

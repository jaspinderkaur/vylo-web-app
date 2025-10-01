interface WinsBannerProps {
  wins: number;
  showWeekView?: boolean;
  onToggleWeekView?: () => void;
  onAddHabit?: () => void;
  hasHabits?: boolean;
}

export const WinsBanner = ({ 
  wins,
  showWeekView = false, 
  onToggleWeekView, 
  onAddHabit, 
  hasHabits = false 
}: WinsBannerProps) => {

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

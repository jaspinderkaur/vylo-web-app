import React, { useMemo } from 'react';
import type { CustomHabit } from '../types';

interface WeekBarsProps {
  habits: CustomHabit[];
}

export const WeekBars = ({ habits }: WeekBarsProps) => {
  const weekData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = [];

    // Get the last 7 days (including today)
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = days[date.getDay()];
      
      // Count completions for this day across all habits
      let completions = 0;
      habits.forEach(habit => {
        if (habit.completions[dateStr]) {
          completions++;
        }
      });
      
      weekData.push({
        day: dayName,
        date: dateStr,
        completions,
        maxCompletions: habits.length, // Maximum possible completions (all habits)
        isToday: i === 0
      });
    }

    return weekData;
  }, [habits]);

  const maxCompletions = Math.max(...weekData.map(d => d.completions), 1);

  return (
    <div className="week-bars">
      <div className="week-bars-header">
        <span className="week-bars-title">This week</span>
        <span className="week-bars-subtitle">Daily completions</span>
      </div>
      <div className="week-bars-grid">
        {weekData.map((day) => {
          const height = day.maxCompletions > 0 ? (day.completions / day.maxCompletions) * 100 : 0;
          const intensity = day.completions > 0 ? Math.min(day.completions / maxCompletions, 1) : 0;
          
          return (
            <div key={day.date} className="week-bar-container">
              <div 
                className={`week-bar ${day.isToday ? 'today' : ''} ${day.completions > 0 ? 'has-completions' : ''}`}
                style={{
                  height: `${Math.max(height, 8)}%`, // Minimum 8% height for visibility
                  '--completion-intensity': intensity.toString()
                } as React.CSSProperties}
                title={`${day.day}: ${day.completions} of ${day.maxCompletions} habits completed`}
              />
              <span className="week-bar-label">{day.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

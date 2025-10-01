import { useState } from 'react';
import { useFirestore } from './hooks/useFirestore';
import { MoodSelector } from './components/MoodSelector';
import { HabitCard } from './components/HabitCard';
import type { Mood } from './types';
import './App.css';

function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const { habits, loading, error } = useFirestore(selectedMood);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleReset = () => {
    setSelectedMood(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Vylo</h1>
        <p className="app-subtitle">Micro-habits for your mood</p>
      </header>

      <main className="app-main">
        {!selectedMood ? (
          <MoodSelector 
            onMoodSelect={handleMoodSelect} 
            selectedMood={selectedMood} 
          />
        ) : (
          <div className="habits-section">
            <div className="habits-header">
              <h2>Your {selectedMood} micro-habits</h2>
              <button 
                className="reset-button" 
                onClick={handleReset}
                aria-label="Choose a different mood"
              >
                Change mood
              </button>
            </div>

            {loading && (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Finding your perfect habits...</p>
              </div>
            )}

            {error && (
              <div className="error">
                <p>Oops! Something went wrong. Please try again.</p>
                <button onClick={handleReset} className="retry-button">
                  Try again
                </button>
              </div>
            )}

            {habits.length > 0 && (
              <div className="habits-grid">
                {habits.map((habit) => (
                  <HabitCard 
                    key={habit.id} 
                    habit={habit} 
                    mood={selectedMood} 
                  />
                ))}
              </div>
            )}

            {!loading && !error && habits.length === 0 && (
              <div className="no-habits">
                <p>No habits found for this mood. Try a different mood!</p>
                <button onClick={handleReset} className="retry-button">
                  Choose different mood
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Build better habits, one mood at a time ✨</p>
      </footer>
    </div>
  );
}

export default App;

import { trackMoodSelected } from '../services/analytics';
import type { Mood } from '../types';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood: Mood | null;
}

const moods: { value: Mood; label: string; emoji: string; description: string }[] = [
  { value: 'tired', label: 'Tired', emoji: '😴', description: 'Need gentle energy' },
  { value: 'focused', label: 'Focused', emoji: '🎯', description: 'Ready to achieve' },
  { value: 'stressed', label: 'Stressed', emoji: '😰', description: 'Need calming habits' }
];

export const MoodSelector = ({ onMoodSelect, selectedMood }: MoodSelectorProps) => {
  const handleMoodClick = (mood: Mood) => {
    trackMoodSelected(mood);
    onMoodSelect(mood);
  };

  return (
    <div className="mood-selector">
      <h2 className="mood-title">How are you feeling right now?</h2>
      <div className="mood-buttons">
        {moods.map((mood) => (
          <button
            key={mood.value}
            className={`mood-button ${selectedMood === mood.value ? 'selected' : ''}`}
            onClick={() => handleMoodClick(mood.value)}
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
            <span className="mood-description">{mood.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

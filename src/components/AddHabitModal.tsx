import { useState } from 'react';
import { Modal } from './ui/Modal';
import { track } from '../utils/plausible';
import type { HabitCategory, Frequency } from '../types';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: { name: string; category?: HabitCategory; frequency?: Frequency }) => void;
}

export const AddHabitModal = ({ isOpen, onClose, onSave }: AddHabitModalProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory | ''>('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [customTimes, setCustomTimes] = useState(3);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const categories: HabitCategory[] = ['Energy', 'Focus', 'Self-care', 'Body', 'Mind', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { name?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Habit name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare habit data
    const habitData = {
      name: name.trim(),
      category: category || undefined,
      frequency: frequency === 'custom' 
        ? { timesPerWeek: customTimes } as const
        : frequency === 'daily' 
          ? 'daily' as const
          : 'weekly' as const
    };

    onSave(habitData);
    
    // Track analytics event
    track('anchor_habit_added', { name: habitData.name });
    
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setCategory('');
    setFrequency('daily');
    setCustomTimes(3);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Habit">
      <form onSubmit={handleSubmit} className="add-habit-form">
        <div className="form-group">
          <label htmlFor="habit-name" className="form-label">
            Habit Name *
          </label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="e.g., Drink 8 glasses of water"
            autoFocus
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="habit-category" className="form-label">
            Category
          </label>
          <select
            id="habit-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as HabitCategory | '')}
            className="form-select"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Frequency</label>
          <div className="frequency-options">
            <label className="radio-option">
              <input
                type="radio"
                name="frequency"
                value="daily"
                checked={frequency === 'daily'}
                onChange={(e) => setFrequency(e.target.value as 'daily')}
              />
              <span>Daily</span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="frequency"
                value="weekly"
                checked={frequency === 'weekly'}
                onChange={(e) => setFrequency(e.target.value as 'weekly')}
              />
              <span>Weekly</span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="frequency"
                value="custom"
                checked={frequency === 'custom'}
                onChange={(e) => setFrequency(e.target.value as 'custom')}
              />
              <span>Custom</span>
            </label>
          </div>
          
          {frequency === 'custom' && (
            <div className="custom-frequency">
              <label htmlFor="custom-times" className="form-label">
                Times per week
              </label>
              <input
                id="custom-times"
                type="number"
                min="1"
                max="7"
                value={customTimes}
                onChange={(e) => setCustomTimes(parseInt(e.target.value) || 1)}
                className="form-input"
              />
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button type="button" onClick={handleClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Habit
          </button>
        </div>
      </form>
    </Modal>
  );
};

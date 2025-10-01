import { useEffect } from 'react';
import type { CustomHabit } from '../types';

interface DeleteHabitModalProps {
  isOpen: boolean;
  habit: CustomHabit | null;
  onClose: () => void;
  onConfirm: (habitId: string) => void;
}

export const DeleteHabitModal = ({ isOpen, habit, onClose, onConfirm }: DeleteHabitModalProps) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !habit) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(habit.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h3>Delete Habit</h3>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to delete <strong>"{habit.name}"</strong>?</p>
          <p className="delete-warning">This action cannot be undone.</p>
        </div>
        
        <div className="modal-actions">
          <button 
            className="modal-btn modal-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="modal-btn modal-btn-danger"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

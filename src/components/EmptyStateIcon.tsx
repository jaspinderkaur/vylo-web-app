
interface EmptyStateIconProps {
  onClick: () => void;
}

export const EmptyStateIcon = ({ onClick }: EmptyStateIconProps) => {
  return (
    <div className="empty-state-icon">
      <button 
        className="icon-container"
        onClick={onClick}
        aria-label="Add your first habit"
      >
        <div className="habit-icon">
          <div className="habit-circle">
            <div className="habit-plus">+</div>
          </div>
        </div>
        <div className="sparkle sparkle-1">✨</div>
        <div className="sparkle sparkle-2">✨</div>
        <div className="sparkle sparkle-3">✨</div>
      </button>
    </div>
  );
};

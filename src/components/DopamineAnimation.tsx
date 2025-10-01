import { useEffect, useState } from 'react';
import { triggerConfetti } from '../utils/confetti';

interface DopamineAnimationProps {
  trigger: boolean;
  onComplete: () => void;
}

export const DopamineAnimation = ({ trigger, onComplete }: DopamineAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger && !isAnimating) {
      setIsAnimating(true);
      triggerConfetti();
      
      // Reset animation after 3 seconds
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [trigger, isAnimating, onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="dopamine-overlay">
      <div className="dopamine-burst">
        <div className="burst-particle"></div>
        <div className="burst-particle"></div>
        <div className="burst-particle"></div>
        <div className="burst-particle"></div>
        <div className="burst-particle"></div>
      </div>
    </div>
  );
};

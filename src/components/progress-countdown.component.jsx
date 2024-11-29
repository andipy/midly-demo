import { useState, useEffect } from 'react';

const ProgressCountdown = ({ points, max }) => {
  const [currentPercent, setCurrentPercent] = useState(100); // Start from 100%
  
  // Calculate the target percentage based on points
  const targetPercent = (points / max) * 100; // Points out of Max

  useEffect(() => {
    if (currentPercent > targetPercent) {
      // Calculate how much to decrease per interval based on the time and the target
      const decrementValue = (currentPercent - targetPercent) / 100; // Adjust the rate here (dividing by 100 for smoothness)
      
      const timer = setInterval(() => {
        setCurrentPercent((prev) => {
          if (prev <= targetPercent) {
            clearInterval(timer); // Stop the countdown once we reach the target percent
            return targetPercent;
          }
          return prev - decrementValue; // Gradually decrease the progress bar
        });
      }, 50); // Adjust the interval speed (in ms)
      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [currentPercent, targetPercent]);

  return (
    <div className="d-flex-row w-100">
      <div className="w-100 h-20px bg-white border-radius-08 overflow-all-hidden">
        <div
          className="h-100 bg-acid-lime"
          style={{ width: `${currentPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressCountdown
import { useState, useEffect } from 'react'

const ProgressBar = ({ points, max }) => {
  const [currentPercent, setCurrentPercent] = useState(0)
  const targetPercent = Math.min((points / max) * 100, 100)

  useEffect(() => {
    if (currentPercent < targetPercent) {
      const timer = setInterval(() => {
        setCurrentPercent((prev) => Math.min(prev + 1, targetPercent))
      }, 5)
      return () => clearInterval(timer)
    }
  }, [currentPercent, targetPercent])

  return (
    <div className="d-flex-row w-100">
      <div className="w-100 h-20px bg-white border-radius-08 overflow-all-hidden">
        <div
          className="h-100 bg-acid-lime"
          style={{ width: `${currentPercent}%` }}
        ></div>
      </div>
      {/* <span className="white">
                {points}
        </span> */}
    </div>
  );
};

export default ProgressBar
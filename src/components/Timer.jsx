import { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Load timer state from sessionStorage on component mount
  useEffect(() => {
    const savedTime = sessionStorage.getItem('timerSeconds');
    if (savedTime) {
      setSeconds(parseInt(savedTime, 10));
    }
  }, []);

  // Save timer state to sessionStorage whenever seconds change
  useEffect(() => {
    sessionStorage.setItem('timerSeconds', seconds.toString());
  }, [seconds]);

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
    sessionStorage.removeItem('timerSeconds');
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Format seconds to display as MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h2>Timer</h2>
      <div className="timer-display">{formatTime(seconds)}</div>
      <div className="timer-controls">
        <button 
          className={`timer-btn ${isRunning ? 'active' : ''}`} 
          onClick={startTimer}
        >
          Start
        </button>
        <button 
          className="timer-btn" 
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button 
          className="timer-btn" 
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

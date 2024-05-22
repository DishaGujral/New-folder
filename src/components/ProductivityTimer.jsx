import React, { useState, useEffect, useRef } from 'react';

const ProductivityTimer = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  const workDuration = 15; // Adjust work session duration in seconds
  const shortBreakDuration = 5; // Adjust short break duration in seconds
  const longBreakDuration = 10; // Adjust long break duration in seconds

  const timerInterval = useRef(null);

  useEffect(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    if (isWorking) {
      timerInterval.current = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval.current);
  }, [isWorking]);

  useEffect(() => {
    if (currentTime >= workDuration) {
      setIsWorking(false);
      if (sessionCount % 2 === 1) {
        setCurrentTime(0);
      } else {
        setCurrentTime(shortBreakDuration);
      }
    } else if (currentTime >= workDuration + shortBreakDuration && sessionCount % 2 === 1) {
      setCurrentTime(longBreakDuration);
      setSessionCount(sessionCount + 1);
    }
  }, [currentTime, workDuration, shortBreakDuration, longBreakDuration, sessionCount]);

  const handleStart = () => {
    setIsWorking(true);
    setCurrentTime(0);
  };

  const handlePause = () => {
    setIsWorking(false);
  };

  const handleReset = () => {
    setIsWorking(false);
    setCurrentTime(0);
    setSessionCount(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const displayMessage = () => {
    if (isWorking) {
      return 'Focus!';
    } else if (currentTime > 0) {
      return currentTime === shortBreakDuration ? 'Short Break' : 'Long Break';
    } else {
      return 'Ready?';
    }
  };

  return (
    <div className="productivity-timer">
      <h2>Productivity Timer</h2>
      <div className="timer-display">{formatTime(currentTime)}</div>
      <div className="timer-message">{displayMessage()}</div>
      <div className="controls">
        {isWorking ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
      <p>Sessions Completed: {sessionCount}</p>
    </div>
  );
};

export default ProductivityTimer;

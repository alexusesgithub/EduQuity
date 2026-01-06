import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const FocusTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [cycles, setCycles] = useState(0);
  const [timerLabel, setTimerLabel] = useState('Focus Time');
  const [customMinutes, setCustomMinutes] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } 
        else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } 
        else {
          // Timer completed
          playNotificationSound();
          
          if (mode === 'focus') {
            // Switch to break mode
            setMode('break');
            setTimerLabel('Break Time');
            setMinutes(cycles % 4 === 3 ? 15 : 5); // Long break after 4 focus sessions
            setCycles(cycles + 1);
          } else {
            // Switch back to focus mode
            setMode('focus');
            setTimerLabel('Focus Time');
            setMinutes(customMinutes);
          }
          setSeconds(0);
        }
      }, 1000);
    } 
    else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, mode, cycles, customMinutes]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setTimerLabel('Focus Time');
    setMinutes(customMinutes);
    setSeconds(0);
    setCycles(0);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 120) {
      setCustomMinutes(value);
      if (!isActive && mode === 'focus') {
        setMinutes(value);
      }
    }
  };

  // Play notification sound with inline base64 audio data
  const playNotificationSound = () => {
    try {
      // Short bell sound encoded as base64
      const soundData = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
      const audio = new Audio(soundData);
      audio.play();
    } catch (e) {
      console.log('Audio play failed:', e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Focus Timer | Education Equity System</title>
      </Head>
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Focus Timer</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="text-xl font-medium mb-4">{timerLabel}</div>
            
            <div className="text-6xl font-bold mb-8">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            
            <div className="flex space-x-4 mb-8">
              <button 
                onClick={toggleTimer}
                className={`px-6 py-2 rounded-md font-medium ${
                  isActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isActive ? 'Pause' : 'Start'}
              </button>
              
              <button 
                onClick={resetTimer}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
              >
                Reset
              </button>
            </div>
            
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Focus duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={customMinutes}
                onChange={handleCustomTimeChange}
                disabled={isActive}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">How to Use the Focus Timer</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Work focused for 25 minutes (or your chosen duration)</li>
            <li>Take a 5-minute break after each session</li>
            <li>After 4 focus sessions, take a longer 15-minute break</li>
            <li>Use the timer to stay productive and prevent burnout</li>
          </ul>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer; 
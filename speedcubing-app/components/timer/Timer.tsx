'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Timer() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
          setIsRunning(false);
        } else {
          setIsReady(true);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isRunning) {
        e.preventDefault();
        setIsReady(false);
        setTime(0);
        setIsRunning(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRunning]);

  const formatTime = (ms: number): string => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((ms % 1000) / 10);

    const secStr = seconds < 10 && minutes > 0 ? `0${seconds}` : seconds;
    const cStr = centiseconds < 10 ? `0${centiseconds}` : centiseconds;

    return minutes > 0 ? `${minutes}:${secStr}.${cStr}` : `${secStr}.${cStr}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] select-none text-center bg-zinc-900 rounded-2xl p-10 border border-zinc-800">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 font-mono">
        Mantené presionado espacio y soltá para arrancar
      </p>
      
      <div className={`text-7xl md:text-8xl font-black font-mono tracking-tight transition-colors duration-100 mb-8 ${
        isReady ? 'text-green-500' : isRunning ? 'text-zinc-100' : 'text-zinc-400'
      }`}>
        {formatTime(time)}
      </div>

      <button 
        onClick={() => setIsRunning(!isRunning)}
        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold font-mono rounded-lg border border-zinc-700 transition"
      >
        {isRunning ? 'Frenar Test' : 'Iniciar Test'}
      </button>
    </div>
  );
}
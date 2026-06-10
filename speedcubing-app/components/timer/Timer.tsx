"use client";

import React, { useState, useEffect, useRef } from 'react';
import Scramble from '../scramble/Scramble';
import StatsList, { Solve } from '../stats/StatsList'; // <-- Importamos el nuevo componente

const MOVES = ['U', 'D', 'R', 'L', 'F', 'B'];
const MODIFIERS = ['', "'", '2'];

const generateScramble = (): string => {
  const scramble: string[] = [];
  let lastMove = '';
  while (scramble.length < 20) {
    const randomMove = MOVES[Math.floor(Math.random() * MOVES.length)];
    if (randomMove !== lastMove) {
      const randomModifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
      scramble.push(`${randomMove}${randomModifier}`);
      lastMove = randomMove;
    }
  }
  return scramble.join(' ');
};

export default function Timer() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentScramble, setCurrentScramble] = useState<string>('');
  const [solves, setSolves] = useState<Solve[]>([]);
  
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Cargar tiempos guardados de localStorage al iniciar la app
  useEffect(() => {
    setCurrentScramble(generateScramble());
    const savedSolves = localStorage.getItem('speedcubing_solves');
    if (savedSolves) {
      setSolves(JSON.parse(savedSolves));
    }
  }, []);

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

  const formatTime = (ms: number): string => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((ms % 1000) / 10);
    const secStr = seconds < 10 && minutes > 0 ? `0${seconds}` : seconds;
    const cStr = centiseconds < 10 ? `0${centiseconds}` : centiseconds;
    return minutes > 0 ? `${minutes}:${secStr}.${cStr}` : `${secStr}.${cStr}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (isRunning) {
        setIsRunning(false);
        
        // ¡GOLAZO! Guardamos el tiempo final al detener el reloj
        const finalTime = Date.now() - startTimeRef.current;
        const newSolve: Solve = {
          id: Math.random().toString(36).substr(2, 9),
          timeFormatted: formatTime(finalTime),
          ms: finalTime,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const updatedSolves = [newSolve, ...solves];
        setSolves(updatedSolves);
        localStorage.setItem('speedcubing_solves', JSON.stringify(updatedSolves));

        setCurrentScramble(generateScramble());
      } else if (!isReady) {
        setIsReady(true);
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!isRunning && isReady) {
        setIsReady(false);
        setTime(0);
        setIsRunning(true);
      }
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('¿Seguro querés borrar todos tus tiempos registrados?')) {
      setSolves([]);
      localStorage.removeItem('speedcubing_solves');
    }
  };

  let textColorClass = "text-zinc-400";
  if (isReady) textColorClass = "text-green-500";
  if (isRunning) textColorClass = "text-zinc-100";

  return (
    <div className="flex flex-col items-center w-full gap-6">
      <Scramble scramble={currentScramble} isVisible={!isRunning} />

      <div 
        tabIndex={0}
        autoFocus
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className="flex flex-col items-center justify-center min-h-[220px] w-full select-none text-center bg-zinc-900/50 rounded-2xl p-10 border border-zinc-800 outline-none focus:border-zinc-700 transition-all"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-8 font-mono pointer-events-none">
          {isRunning ? "Tocá espacio para frenar" : "Mantené espacio y soltá para arrancar"}
        </p>
        
        <div className={`text-7xl md:text-8xl font-black font-mono tracking-tight transition-colors duration-100 pointer-events-none ${textColorClass}`}>
          {formatTime(time)}
        </div>
      </div>

      {/* Renderizamos la lista de estadísticas abajo del timer */}
      <StatsList solves={solves} onClear={handleClearHistory} />
    </div>
  );
}
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Scramble from '../scramble/Scramble';
import StatsList, { Solve, Session } from '../stats/StatsList';
import ProgressChart from '../stats/ProgressChart';
import { CubeTheme } from '../../data/themes';

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

const DEFAULT_SESSIONS: Session[] = [
  { id: 'session-3x3', name: 'Sesión General 3x3', solves: [] },
  { id: 'session-oll', name: 'Práctica OLL', solves: [] },
  { id: 'session-pll', name: 'Práctica PLL', solves: [] }
];

interface TimerProps {
  theme: CubeTheme;
  onRunningChange?: (isRunning: boolean) => void;
}

export default function Timer({ theme, onRunningChange }: TimerProps) {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentScramble, setCurrentScramble] = useState<string>('');
  
  // Estados para Gestor de Sesiones
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [isCreatingSession, setIsCreatingSession] = useState<boolean>(false);
  const [newSessionName, setNewSessionName] = useState<string>('');
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    onRunningChange?.(isRunning);
  }, [isRunning, onRunningChange]);

  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Cargar y migrar datos de localStorage al iniciar
  useEffect(() => {
    setCurrentScramble(generateScramble());
    
    const savedSessions = localStorage.getItem('speedcubing_sessions');
    const oldSolves = localStorage.getItem('speedcubing_solves');
    const savedActiveSessionId = localStorage.getItem('speedcubing_active_session');

    let loadedSessions: Session[] = [];
    let loadedActiveId = '';

    if (savedSessions) {
      loadedSessions = JSON.parse(savedSessions);
      loadedActiveId = savedActiveSessionId || loadedSessions[0]?.id || 'session-3x3';
    } else {
      // Si no hay sesiones pero existen solves del sistema antiguo, los migramos
      if (oldSolves) {
        const parsedOldSolves = JSON.parse(oldSolves);
        loadedSessions = [
          { id: 'session-3x3', name: 'Sesión General 3x3', solves: parsedOldSolves },
          { id: 'session-oll', name: 'Práctica OLL', solves: [] },
          { id: 'session-pll', name: 'Práctica PLL', solves: [] }
        ];
        localStorage.removeItem('speedcubing_solves');
      } else {
        loadedSessions = DEFAULT_SESSIONS;
      }
      loadedActiveId = 'session-3x3';
      localStorage.setItem('speedcubing_sessions', JSON.stringify(loadedSessions));
      localStorage.setItem('speedcubing_active_session', loadedActiveId);
    }

    setSessions(loadedSessions);
    setActiveSessionId(loadedActiveId);
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

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || DEFAULT_SESSIONS[0];
  const activeSolves = activeSession ? activeSession.solves : [];

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
        
        const finalTime = Date.now() - startTimeRef.current;
        const newSolve: Solve = {
          id: Math.random().toString(36).substr(2, 9),
          timeFormatted: formatTime(finalTime),
          ms: finalTime,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const updatedSessions = sessions.map(session => {
          if (session.id === activeSessionId) {
            return {
              ...session,
              solves: [newSolve, ...session.solves]
            };
          }
          return session;
        });

        setSessions(updatedSessions);
        localStorage.setItem('speedcubing_sessions', JSON.stringify(updatedSessions));
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
    if (window.confirm(`¿Seguro querés borrar todos los tiempos registrados en la sesión "${activeSession.name}"?`)) {
      const updatedSessions = sessions.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, solves: [] };
        }
        return s;
      });
      setSessions(updatedSessions);
      localStorage.setItem('speedcubing_sessions', JSON.stringify(updatedSessions));
    }
  };

  const handleSwitchSession = (id: string) => {
    setActiveSessionId(id);
    localStorage.setItem('speedcubing_active_session', id);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionName.trim()) return;
    
    const newSession: Session = {
      id: 'session-' + Math.random().toString(36).substr(2, 9),
      name: newSessionName.trim(),
      solves: []
    };
    
    const updated = [...sessions, newSession];
    setSessions(updated);
    localStorage.setItem('speedcubing_sessions', JSON.stringify(updated));
    setActiveSessionId(newSession.id);
    localStorage.setItem('speedcubing_active_session', newSession.id);
    setNewSessionName('');
    setIsCreatingSession(false);
  };

  const handleDeleteSession = (id: string, name: string) => {
    if (sessions.length <= 1) {
      alert('Tenés que mantener al menos una sesión activa.');
      return;
    }
    if (window.confirm(`¿Seguro querés borrar la sesión "${name}" y todos sus tiempos asociados?`)) {
      const updated = sessions.filter(s => s.id !== id);
      setSessions(updated);
      localStorage.setItem('speedcubing_sessions', JSON.stringify(updated));
      if (activeSessionId === id) {
        const nextActive = updated[0].id;
        setActiveSessionId(nextActive);
        localStorage.setItem('speedcubing_active_session', nextActive);
      }
    }
  };

  const handleDeleteSolve = (solveId: string) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === activeSessionId) {
        return {
          ...session,
          solves: session.solves.filter(s => s.id !== solveId)
        };
      }
      return session;
    });

    setSessions(updatedSessions);
    localStorage.setItem('speedcubing_sessions', JSON.stringify(updatedSessions));
  };

  let textColorClass = "opacity-50";
  if (isReady) textColorClass = "text-emerald-400 opacity-100";
  if (isRunning) textColorClass = "opacity-100 scale-105 transform transition-transform";

  return (
    <div className="flex flex-col md:flex-row w-full gap-8 select-none relative">
      
      {/* Botones de Toggle para Mobile */}
      {!isRunning && (
        <div className="md:hidden fixed top-6 right-6 z-40 flex gap-2 font-mono">
          <button
            onClick={() => {
              setIsLeftSidebarOpen(!isLeftSidebarOpen);
              setIsRightSidebarOpen(false);
            }}
            className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl border cursor-pointer ${theme.card}`}
          >
            {isLeftSidebarOpen ? 'Sesiones ✕' : 'Sesiones ☰'}
          </button>
          <button
            onClick={() => {
              setIsRightSidebarOpen(!isRightSidebarOpen);
              setIsLeftSidebarOpen(false);
            }}
            className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl border cursor-pointer ${theme.card}`}
          >
            {isRightSidebarOpen ? 'Historial ✕' : 'Historial 📊'}
          </button>
        </div>
      )}

      {/* 1. Barra Lateral Izquierda de Sesiones */}
      <aside 
        className={`fixed top-16 left-0 bottom-0 w-72 md:w-80 border-r p-6 flex flex-col gap-6 font-mono z-30 transition-transform duration-300 backdrop-blur-md ${
          theme.color === 'blanco' ? 'bg-white/95 border-zinc-200 text-zinc-800' : 'bg-zinc-950/85 border-current/10 text-inherit'
        } ${isRunning ? '-translate-x-full' : (isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0')}`}
      >
        <div className="flex flex-col h-full justify-between pt-2 md:pt-2">
          <div className="space-y-6">
            <div className="border-b border-current/10 pb-4">
              <h3 className="text-xs uppercase tracking-[0.2em] opacity-50 font-bold">Sesiones</h3>
            </div>

            {/* Lista de Sesiones */}
            <div className="flex flex-col gap-2 max-h-[55vh] overflow-y-auto custom-scrollbar pr-1">
              {sessions.map(s => {
                const isActive = s.id === activeSessionId;
                return (
                  <div
                    key={s.id}
                    className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                      isActive
                        ? `${theme.card} border-current/30 font-bold bg-current/5`
                        : 'border-transparent hover:bg-black/5 hover:border-current/10 opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => {
                      handleSwitchSession(s.id);
                      setIsLeftSidebarOpen(false);
                    }}
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="truncate">{s.name}</span>
                      <span className="text-[9px] opacity-50 font-normal">
                        {s.solves.length} {s.solves.length === 1 ? 'solve' : 'solves'}
                      </span>
                    </div>
                    {sessions.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(s.id, s.name);
                        }}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer text-[10px]"
                        title="Eliminar sesión"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formulario/Botón de Nueva Sesión */}
          <div className="border-t border-current/10 pt-4 mt-auto">
            {isCreatingSession ? (
              <form onSubmit={handleCreateSession} className="flex flex-col gap-2">
                <input
                  type="text"
                  autoFocus
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="Nueva sesión..."
                  className="bg-black/10 border border-current/15 text-xs px-3 py-2 rounded-xl text-inherit outline-none focus:border-current/45 font-bold w-full"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className={`flex-1 text-xs font-bold px-3 py-2 rounded-xl border transition-colors cursor-pointer ${theme.accent}`}
                  >
                    Crear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingSession(false)}
                    className="bg-black/10 hover:bg-black/20 text-inherit opacity-65 hover:opacity-100 text-xs font-bold px-3 py-2 rounded-xl border border-current/15 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsCreatingSession(true)}
                className={`w-full text-xs font-bold py-2.5 rounded-xl border transition-colors cursor-pointer text-center ${theme.accent}`}
              >
                + Nueva Sesión
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* 2. Área Principal (Centro de la pantalla) */}
      <div className={`flex-1 flex flex-col items-center gap-6 min-w-0 transition-all duration-300 ${!isRunning ? 'md:pl-80 md:pr-80' : ''}`}>
        
        {/* Mezclador (Scramble) */}
        <Scramble scramble={currentScramble} isVisible={!isRunning} />

        {/* Área del Cronómetro */}
        <div 
          tabIndex={0}
          autoFocus
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className={`flex flex-col items-center justify-center w-full text-center outline-none transition-all duration-300 cursor-pointer ${
            isRunning 
              ? 'border-transparent bg-transparent min-h-[50vh] p-0 shadow-none' 
              : `min-h-[220px] rounded-2xl p-10 border ${theme.card} focus:border-current/40`
          }`}
        >
          {!isRunning && (
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-8 font-mono pointer-events-none">
              Mantené espacio y soltá para arrancar
            </p>
          )}
          
          <div className={`font-black font-mono tracking-tight transition-all duration-300 pointer-events-none ${textColorClass} ${
            isRunning ? 'text-8xl md:text-9xl' : 'text-7xl md:text-8xl'
          }`}>
            {formatTime(time)}
          </div>
        </div>

        {/* Gráfico de Progreso */}
        {!isRunning && activeSolves.length > 0 && (
          <ProgressChart solves={activeSolves} theme={theme} />
        )}
      </div>

      {/* 3. Barra Lateral Derecha de Historial */}
      <aside 
        className={`fixed top-16 right-0 bottom-0 w-72 md:w-80 border-l p-6 flex flex-col gap-6 font-mono z-30 transition-transform duration-300 backdrop-blur-md ${
          theme.color === 'blanco' ? 'bg-white/95 border-zinc-200 text-zinc-800' : 'bg-zinc-950/85 border-current/10 text-inherit'
        } ${isRunning ? 'translate-x-full' : (isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0')}`}
      >
        <div className="flex flex-col h-full justify-between pt-2 md:pt-2">
          <StatsList 
            solves={activeSolves} 
            onClear={handleClearHistory} 
            onDeleteSolve={handleDeleteSolve} 
            theme={theme} 
          />
        </div>
      </aside>
    </div>
  );
}
"use client";

import React from 'react';
import { CubeTheme } from '../../data/themes';

export interface Solve {
  id: string;
  timeFormatted: string;
  ms: number;
  date: string;
}

export interface Session {
  id: string;
  name: string;
  solves: Solve[];
}

interface StatsListProps {
  solves: Solve[];
  onClear: () => void;
  onDeleteSolve: (id: string) => void;
  theme: CubeTheme;
}

export default function StatsList({ solves, onClear, onDeleteSolve, theme }: StatsListProps) {
  // Calculamos el promedio rápido si hay tiempos
  const getAverage = () => {
    if (solves.length === 0) return "-";
    const total = solves.reduce((acc, solve) => acc + solve.ms, 0);
    const avgMs = total / solves.length;
    
    // Formateador rápido para el promedio
    const totalSeconds = avgMs / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((avgMs % 1000) / 10);
    const cStr = centiseconds < 10 ? `0${centiseconds}` : centiseconds;
    return `${seconds}.${cStr}s`;
  };

  return (
    <div className="w-full flex flex-col h-full font-mono">
      <div className="flex justify-between items-center mb-4 border-b border-current/10 pb-4">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] opacity-50 font-bold mb-1">Historial</h3>
          <p className="text-[10px] opacity-75">
            Solves: <span className="font-bold">{solves.length}</span> | Avg: <span className="text-emerald-400 font-bold">{getAverage()}</span>
          </p>
        </div>
        {solves.length > 0 && (
          <div className="flex gap-2">
            <button 
              onClick={() => onDeleteSolve(solves[0].id)}
              className="text-[10px] opacity-70 hover:opacity-100 transition-all bg-black/10 hover:bg-black/20 px-2 py-1.5 rounded-lg border border-current/15 cursor-pointer font-bold"
              title="Eliminar la resolución más reciente"
            >
              Borrar Último
            </button>
            <button 
              onClick={onClear}
              className="text-[10px] text-red-500/70 hover:text-red-500 transition-colors bg-red-500/10 hover:bg-red-500/20 px-2 py-1.5 rounded-lg border border-red-500/20 cursor-pointer font-bold"
            >
              Limpiar Todo
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar no-scrollbar max-h-[60vh] md:max-h-[70vh]">
        {solves.length === 0 ? (
          <p className="text-xs opacity-40 text-center py-4 italic">No hay tiempos registrados todavía.</p>
        ) : (
          solves.map((solve, index) => (
            <div key={solve.id} className="flex justify-between items-center bg-black/5 border border-current/5 px-4 py-2.5 rounded-xl text-sm transition-all hover:bg-black/10">
              <div className="flex items-center gap-3">
                <span className="opacity-50 text-xs">#{solves.length - index}</span>
                <span className="font-bold">{solve.timeFormatted}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] opacity-40">{solve.date}</span>
                <button 
                  onClick={() => onDeleteSolve(solve.id)}
                  className="hover:text-red-500 hover:bg-red-500/10 p-1 rounded-lg transition-all cursor-pointer text-[10px] leading-none opacity-40 hover:opacity-100"
                  title="Eliminar este tiempo"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
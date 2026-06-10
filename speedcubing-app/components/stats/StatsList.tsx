"use client";

import React from 'react';

export interface Solve {
  id: string;
  timeFormatted: string;
  ms: number;
  date: string;
}

interface StatsListProps {
  solves: Solve[];
  onClear: () => void;
}

export default function StatsList({ solves, onClear }: StatsListProps) {
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
    <div className="w-full bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-5 font-mono">
      <div className="flex justify-between items-center mb-4 border-b border-zinc-800/80 pb-2">
        <div>
          <h3 className="text-sm uppercase tracking-widest text-zinc-500">Historial</h3>
          <p className="text-xs text-zinc-400 mt-1">Solves: <span className="text-zinc-200 font-bold">{solves.length}</span> | Avg: <span className="text-green-400 font-bold">{getAverage()}</span></p>
        </div>
        {solves.length > 0 && (
          <button 
            onClick={onClear}
            className="text-xs text-red-400/70 hover:text-red-400 transition-colors bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg border border-red-500/20"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {solves.length === 0 ? (
          <p className="text-xs text-zinc-600 text-center py-4 italic">No hay tiempos registrados todavía.</p>
        ) : (
          solves.map((solve, index) => (
            <div key={solve.id} className="flex justify-between items-center bg-zinc-900/60 border border-zinc-800/40 px-4 py-2 rounded-xl text-sm">
              <span className="text-zinc-500 text-xs">#{solves.length - index}</span>
              <span className="font-bold text-zinc-200">{solve.timeFormatted}</span>
              <span className="text-[10px] text-zinc-600">{solve.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import { ALGORITHMS_DATA } from '../../data/algorithms/index';

export default function AlgsLibrary() {
  const [activeTab, setActiveTab] = useState<'F2L' | 'OLL' | 'PLL'>('F2L');

  const filteredAlgs = ALGORITHMS_DATA.filter(alg => alg.type === activeTab);

  return (
    <div className="w-full space-y-6 font-mono animate-fade-in text-zinc-200">
      
      {/* Header del Módulo Ultra Minimalista */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl">
        <h2 className="text-xl font-bold tracking-tight text-zinc-100">Biblioteca de Algoritmos</h2>
        <p className="text-xs text-zinc-500 mt-1 font-sans">Consultá los casos de F2L, OLL y PLL para tu entrenamiento.</p>
      </div>

      {/* Selector de Pestañas (F2L, OLL, PLL) */}
      <div className="flex bg-transparent p-0 gap-2 max-w-xs">
        {(['F2L', 'OLL', 'PLL'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
              activeTab === tab 
                ? 'bg-zinc-900 border-zinc-850 text-zinc-150 shadow-md' 
                : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Lista de Casos con Scrollbar Invisible */}
      <div className="grid grid-cols-1 gap-4 max-h-[450px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredAlgs.map(alg => (
          <div 
            key={alg.id} 
            className="p-5 rounded-2xl border bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700/60 transition-all flex flex-col gap-4"
          >
            <div className="space-y-3 flex-1 w-full">
              {/* Encabezado del caso */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-400">
                  {alg.group}
                </span>
                <h3 className="text-base font-black text-zinc-200">{alg.name}</h3>
              </div>
              
              {/* Lista de Algoritmos con el RETURN explícito arreglado */}
              <div className="space-y-2">
                {alg.algorithms && alg.algorithms.map((algoText, index) => {
                  return (
                    <div 
                      key={index} 
                      onClick={() => navigator.clipboard.writeText(algoText)}
                      className="bg-zinc-950/80 border border-zinc-850 p-3 rounded-xl select-all cursor-pointer group relative flex justify-between items-center hover:border-zinc-750 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-600 font-bold bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                          Alt {index + 1}
                        </span>
                        <code className="text-sm font-bold text-yellow-400/90 tracking-wide0">
                          {algoText}
                        </code>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                        Clic para copiar
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Descripción breve */}
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">{alg.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
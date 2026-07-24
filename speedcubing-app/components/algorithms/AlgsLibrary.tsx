"use client";

import React, { useState } from 'react';
import { ALGORITHMS_DATA } from '../../data/algorithms/index';
import { CubeTheme } from '../../data/themes';

interface AlgsLibraryProps {
  theme: CubeTheme;
}

export default function AlgsLibrary({ theme }: AlgsLibraryProps) {
  const [activeTab, setActiveTab] = useState<'F2L' | 'OLL' | 'PLL'>('F2L');

  const filteredAlgs = ALGORITHMS_DATA.filter(alg => alg.type === activeTab);

  return (
    <div className={`w-full space-y-6 font-mono animate-fade-in transition-all duration-500`}>
      
      {/* Header del Módulo */}
      <div className={`p-5 rounded-2xl border transition-all duration-300 ${theme.card}`}>
        <h2 className="text-xl font-bold tracking-tight">Biblioteca de Algoritmos</h2>
        <p className="text-xs opacity-70 mt-1 font-sans">Consultá los casos de F2L, OLL y PLL para tu entrenamiento.</p>
      </div>

      {/* Selector de Pestañas (F2L, OLL, PLL) */}
      <div className="flex bg-transparent p-0 gap-2 max-w-xs">
        {(['F2L', 'OLL', 'PLL'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              activeTab === tab 
                ? `${theme.accent} shadow-md` 
                : 'bg-transparent border-transparent opacity-60 hover:opacity-90 text-inherit'
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
            className={`p-5 rounded-2xl border transition-all flex flex-col gap-4 ${theme.card}`}
          >
            <div className="space-y-3 flex-1 w-full">
              {/* Encabezado del caso */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold bg-black/10 border border-current/25 px-2 py-0.5 rounded opacity-80">
                  {alg.group}
                </span>
                <h3 className="text-base font-black">{alg.name}</h3>
              </div>
              
              {/* Lista de Algoritmos */}
              <div className="space-y-2">
                {alg.algorithms && alg.algorithms.map((algoText, index) => {
                  return (
                    <div 
                      key={index} 
                      onClick={() => navigator.clipboard.writeText(algoText)}
                      className={`p-3 rounded-xl select-all cursor-pointer group relative flex justify-between items-center transition-all ${theme.algoBg}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] opacity-60 font-bold bg-black/5 px-1.5 py-0.5 rounded border border-current/10">
                          Alt {index + 1}
                        </span>
                        <code className="text-sm font-bold tracking-wide">
                          {algoText}
                        </code>
                      </div>
                      <span className="text-[10px] opacity-0 group-hover:opacity-80 transition-opacity font-sans">
                        Clic para copiar
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Descripción breve */}
              <p className="text-xs opacity-75 font-sans leading-relaxed">{alg.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
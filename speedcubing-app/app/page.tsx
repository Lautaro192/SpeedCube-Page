"use client";

import React, { useState } from 'react';
import Timer from '../components/timer/Timer';
import AlgsLibrary from '../components/algorithms/AlgsLibrary';

type ActiveView = 'menu' | 'timer' | 'algoritmos' | 'stats';

export default function Home() {
  const [view, setView] = useState<ActiveView>('menu');

  const renderBackButton = () => (
    <button
      onClick={() => setView('menu')}
      className="absolute top-6 left-6 font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2 bg-zinc-900/40 border border-zinc-800 px-3 py-1.5 rounded-xl group"
    >
      <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Volver al Inicio
    </button>
  );

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative">
      
      {/* PANTALLA 1: MENÚ DE INICIO */}
      {view === 'menu' && (
        <div className="w-full max-w-2xl text-center space-y-10 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              SPEEDCUBING HUB
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">
              Seleccioná tu espacio de entrenamiento
            </p>
          </div>

          {/* Grilla de Opciones / Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono">
            
            {/* Tarjeta 1: Timer */}
            <button
              onClick={() => setView('timer')}
              className="flex flex-col gap-2 p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all text-left outline-none group"
            >
              <div className="flex justify-between w-full items-center">
                <span className="text-xs text-green-500 font-bold">01. COMPETICIÓN</span>
              </div>
              <h2 className="text-lg font-bold text-zinc-200">Cronómetro (Timer)</h2>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans mt-1">
                Entrená tus solves oficiales de 3x3 con delay de inspección, scrambles aleatorios y guardado automático de estadísticas.
              </p>
            </button>

            {/* Tarjeta 2: Algoritmos */}
            <button
              onClick={() => setView('algoritmos')}
              className="flex flex-col gap-2 p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all text-left outline-none group"
            >
              <div className="flex justify-between w-full items-center">
                <span className="text-xs text-blue-500 font-bold">02. APRENDIZAJE</span>
              </div>
              <h2 className="text-lg font-bold text-zinc-400">Biblioteca de Algs</h2>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans mt-1">
                Repasá y trackeá tus casos de F2L, OLL y PLL. Guardá tus secuencias favoritas para bajar tus tiempos de ejecución.
              </p>
            </button>

          </div>
        </div>
      )}

      {/* PANTALLA 2: EL TIMER (TU APP ACTUAL) */}
      {view === 'timer' && (
        <div className="w-full max-w-md animate-fade-in">
          {renderBackButton()}
          <Timer />
        </div>
      )}
      {/* PANTALLA 3: BIBLIOTECA DE ALGORITMOS */}
      {view === 'algoritmos' && (
        <div className="w-full max-w-3xl animate-fade-in">
          {renderBackButton()}
          <AlgsLibrary />
        </div>
      )}

    </main>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import Timer from '../components/timer/Timer';
import AlgsLibrary from '../components/algorithms/AlgsLibrary';
import { getRandomTheme, CubeTheme, CUBE_THEMES } from '../data/themes';

type ActiveView = 'menu' | 'timer' | 'algoritmos' | 'stats';

export default function Home() {
  const [view, setView] = useState<ActiveView>('menu');
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  
  // Usamos el tema azul como valor de carga inicial para evitar problemas de SSR
  const [theme, setTheme] = useState<CubeTheme>(CUBE_THEMES[0]);

  // Al montar elegimos una cara al azar
  useEffect(() => {
    setTheme(getRandomTheme());
  }, []);

  const handleViewChange = (newView: ActiveView) => {
    setView(newView);
    setIsTimerRunning(false);
    setTheme(getRandomTheme());
  };



  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-6 relative transition-all duration-700 ${theme.bg} ${theme.text}`}>
      
      {/* Barra Superior Global */}
      <header className={`fixed top-0 left-0 right-0 h-16 border-b z-50 flex items-center justify-between px-8 font-mono transition-all duration-300 backdrop-blur-md ${
        theme.color === 'blanco' ? 'bg-white/80 border-zinc-200 text-zinc-950' : 'bg-black/20 border-current/10 text-inherit'
      } ${isTimerRunning ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        {/* Izquierda: Logo */}
        <div className="w-1/3 flex justify-start">
          <button 
            onClick={() => handleViewChange('menu')}
            className="text-sm font-black tracking-[0.2em] hover:opacity-85 transition-opacity cursor-pointer focus:outline-none"
          >
            cube app
          </button>
        </div>

        {/* Centro: Sección Activa */}
        <div className="w-1/3 flex justify-center text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold opacity-85">
            {view === 'timer' ? 'cronómetro' : view === 'algoritmos' ? 'biblioteca de algs' : 'inicio'}
          </span>
        </div>

        {/* Derecha: Espacio Balanceador */}
        <div className="w-1/3 flex justify-end"></div>
      </header>
      
      {/* PANTALLA 1: MENÚ DE INICIO */}
      {view === 'menu' && (
        <div className="w-full max-w-2xl text-center space-y-10 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-current via-current/80 to-current/50 bg-clip-text text-transparent">
              SPEEDCUBING HUB
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] opacity-65 font-mono">
              Seleccioná tu espacio de entrenamiento
            </p>
          </div>

          {/* Grilla de Opciones / Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono">
            
            {/* Tarjeta 1: Timer */}
            <button
              onClick={() => handleViewChange('timer')}
              className={`flex flex-col gap-2 p-6 rounded-2xl border transition-all text-left outline-none cursor-pointer ${theme.card}`}
            >
              <div className="flex justify-between w-full items-center">
                <span className="text-xs opacity-85 font-bold uppercase">01. Competición</span>
              </div>
              <h2 className="text-lg font-bold">Cronómetro (Timer)</h2>
              <p className="text-xs opacity-70 leading-relaxed font-sans mt-1">
                Entrená tus solves oficiales de 3x3 con delay de inspección, scrambles aleatorios y guardado automático de estadísticas.
              </p>
            </button>

            {/* Tarjeta 2: Algoritmos */}
            <button
              onClick={() => handleViewChange('algoritmos')}
              className={`flex flex-col gap-2 p-6 rounded-2xl border transition-all text-left outline-none cursor-pointer ${theme.card}`}
            >
              <div className="flex justify-between w-full items-center">
                <span className="text-xs opacity-85 font-bold uppercase">02. Aprendizaje</span>
              </div>
              <h2 className="text-lg font-bold">Biblioteca de Algs</h2>
              <p className="text-xs opacity-70 leading-relaxed font-sans mt-1">
                Repasá y trackeá tus casos de F2L, OLL y PLL. Guardá tus secuencias favoritas para bajar tus tiempos de ejecución.
              </p>
            </button>

          </div>
        </div>
      )}

      {/* PANTALLA 2: EL TIMER (TU APP ACTUAL) */}
      {view === 'timer' && (
        <div className="w-full max-w-full px-6 pt-20 pb-10 animate-fade-in">
          <Timer theme={theme} onRunningChange={setIsTimerRunning} />
        </div>
      )}
      
      {/* PANTALLA 3: BIBLIOTECA DE ALGORITMOS */}
      {view === 'algoritmos' && (
        <div className="w-full max-w-3xl pt-20 pb-10 animate-fade-in">
          <AlgsLibrary theme={theme} />
        </div>
      )}

    </main>
  );
}
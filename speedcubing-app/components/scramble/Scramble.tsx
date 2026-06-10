"use client";

import React from 'react';

interface ScrambleProps {
  scramble: string;
  isVisible: boolean;
}

export default function Scramble({ scramble, isVisible }: ScrambleProps) {
  return (
    <div className={`w-full text-center bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-2xl transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-2">Scramble 3x3</p>
      <p className="text-lg md:text-xl font-bold font-mono text-zinc-200 tracking-wide leading-relaxed select-text">
        {scramble || "Generando..."}
      </p>
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import { Solve } from './StatsList';
import { CubeTheme } from '../../data/themes';

interface ProgressChartProps {
  solves: Solve[];
  theme: CubeTheme;
}

export default function ProgressChart({ solves, theme }: ProgressChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (solves.length === 0) {
    return (
      <div className={`w-full border p-6 rounded-2xl flex flex-col items-center justify-center min-h-[160px] text-center font-mono ${theme.card}`}>
        <p className="text-xs opacity-50 uppercase tracking-widest mb-1">Progreso Temporal</p>
        <p className="text-xs opacity-40 italic">Registrá solves para ver tu gráfico de evolución.</p>
      </div>
    );
  }

  // Invertimos el orden para graficar cronológicamente (de más viejo a más nuevo)
  const data = [...solves].reverse();
  const N = data.length;

  // Extraer valores de tiempo
  const times = data.map(d => d.ms);
  const maxTime = Math.max(...times);
  const minTime = Math.min(...times);

  // Rangos y Márgenes del SVG
  const width = 500;
  const height = 150;
  const paddingX = 30;
  const paddingY = 20;

  // Evitar división por cero si todos los solves duran lo mismo
  const timeRange = maxTime === minTime ? 1000 : maxTime - minTime;
  const minY = Math.max(0, minTime - timeRange * 0.1);
  const maxY = maxTime + timeRange * 0.1;
  const actualRange = maxY - minY;

  // Calculamos los puntos del SVG
  const points = data.map((d, i) => {
    const x = N === 1 ? width / 2 : (i / (N - 1)) * (width - paddingX * 2) + paddingX;
    const y = height - paddingY - ((d.ms - minY) / actualRange) * (height - paddingY * 2);
    return { x, y, solve: d, originalIndex: solves.length - 1 - i };
  });

  // Generamos el path para la línea
  let linePath = "";
  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  }

  // Generamos el path para el área sombreada por debajo
  let areaPath = "";
  if (points.length > 0) {
    areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;
  }

  // Formateador rápido para mostrar en el tooltip
  const formatSecs = (ms: number): string => {
    return (ms / 1000).toFixed(2) + 's';
  };

  // Mapa de colores y gradientes según la cara del cubo activa
  const colorMap: Record<string, { stroke: string; glow: string; stop: string }> = {
    azul: { stroke: 'stroke-cyan-400', glow: '#22d3ee', stop: '#22d3ee' },
    rojo: { stroke: 'stroke-red-500', glow: '#ef4444', stop: '#ef4444' },
    verde: { stroke: 'stroke-emerald-400', glow: '#34d399', stop: '#34d399' },
    naranja: { stroke: 'stroke-orange-500', glow: '#f97316', stop: '#f97316' },
    amarillo: { stroke: 'stroke-yellow-500', glow: '#eab308', stop: '#eab308' },
    blanco: { stroke: 'stroke-blue-600', glow: '#2563eb', stop: '#2563eb' }
  };

  const chartColors = colorMap[theme.color] || colorMap.azul;

  return (
    <div className={`w-full border p-5 rounded-2xl font-mono relative group transition-all duration-300 ${theme.card}`}>
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xs uppercase tracking-widest opacity-60">Gráfico de Evolución</h4>
        <div className="text-[10px] opacity-60 flex gap-2">
          <span>Mejor: <b className="text-green-400/90">{formatSecs(minTime)}</b></span>
          <span>Peor: <b className="text-red-400/80">{formatSecs(maxTime)}</b></span>
        </div>
      </div>

      {/* Contenedor del Gráfico SVG */}
      <div className="relative w-full h-[150px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradiente dinámico para el área del gráfico */}
            <linearGradient id={`areaGrad-${theme.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.stop} stopOpacity="0.25" />
              <stop offset="100%" stopColor={chartColors.stop} stopOpacity="0.0" />
            </linearGradient>
            
            {/* Filtro de brillo dinámico para la línea */}
            <filter id={`glow-${theme.color}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Líneas Guía de Fondo (Y-Grid) */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} className="stroke-current/10" strokeDasharray="3,3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} className="stroke-current/5" strokeDasharray="3,3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} className="stroke-current/10" />

          {/* Área Sombreada */}
          {areaPath && (
            <path d={areaPath} fill={`url(#areaGrad-${theme.color})`} />
          )}

          {/* Línea Principal del Gráfico */}
          {linePath && (
            <path 
              d={linePath} 
              fill="none" 
              className={chartColors.stroke} 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${theme.color})`}
            />
          )}

          {/* Puntos y Eventos de Hover */}
          {points.map((p, index) => (
            <g key={p.solve.id}>
              {/* Punto visible */}
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={hoveredIndex === index ? 5.5 : 3.5} 
                fill={hoveredIndex === index ? chartColors.glow : chartColors.stop}
                stroke={theme.color === 'blanco' ? '#fff' : '#09090b'}
                strokeWidth={hoveredIndex === index ? 2 : 1}
                className="transition-all duration-150"
              />
              
              {/* Área interactiva invisible */}
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={12} 
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          ))}
        </svg>

        {/* Tooltip Absoluto HTML */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div 
            className="absolute z-10 bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 shadow-2xl text-[10px] text-zinc-300 font-sans pointer-events-none flex flex-col gap-0.5"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100 - 55}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-bold text-zinc-400 font-mono">Solve #{points[hoveredIndex].originalIndex + 1}</div>
            <div className="text-sm font-black font-mono text-zinc-100">{points[hoveredIndex].solve.timeFormatted}</div>
            <div className="text-zinc-600 text-[8px]">{points[hoveredIndex].solve.date}</div>
          </div>
        )}
      </div>
      
      {/* Indicadores inferiores */}
      <div className="flex justify-between text-[8px] opacity-40 mt-2 border-t border-current/10 pt-2 px-1">
        <span>◀ Más antiguo</span>
        <span>Mostrando últimos {N} solves</span>
        <span>Reciente ▶</span>
      </div>
    </div>
  );
}

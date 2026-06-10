import { AlgorithmCase } from './types';
import { F2L_DATA } from './f2l';
import { OLL_DATA } from './oll';
import { PLL_DATA } from './pll';

export type { AlgorithmCase };

// Creamos una función que une los datos de forma segura en tiempo de ejecución.
// Esto evita que Webpack intente resolver los arrays antes de que los archivos carguen en memoria.
const getUnifiedAlgorithms = (): AlgorithmCase[] => {
  const f2l = Array.isArray(F2L_DATA) ? F2L_DATA : [];
  const oll = Array.isArray(OLL_DATA) ? OLL_DATA : [];
  const pll = Array.isArray(PLL_DATA) ? PLL_DATA : [];
  
  return [...f2l, ...oll, ...pll];
};

// Exportamos la constante ejecutando la función protectora
export const ALGORITHMS_DATA: AlgorithmCase[] = getUnifiedAlgorithms();

console.log("-> TOTAL CARGADO EN HUB:", ALGORITHMS_DATA.length);
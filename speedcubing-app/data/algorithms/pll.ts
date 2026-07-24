import { AlgorithmCase } from './types';

export const PLL_DATA: AlgorithmCase[] = [
{ 
    id: 'pll-ua', 
    name: 'Ua Perm', 
    type: 'PLL', 
    group: 'Aristas', 
    // Guardamos el algoritmo principal y alternativas desde otros ángulos
    algorithms: [
      "R U' R U R U R U' R' U' R2", // Estándar (R-U)
      "M2 U M U2 M' U M2",          // Variante con capas medias (M-U)
    ], 
    description: "Permutación de 3 aristas en sentido horario" 
  },
  { 
    id: 'pll-t', 
    name: 'T Perm', 
    type: 'PLL', 
    group: 'Adyacentes', 
    algorithms: [
      "R U R' U' R' F R2 U' R' U' R U R' F'", // Estándar clásico
      "F R U' R' U' R U R' F' R U R' U' R' F R F'", // Variante alternativa
    ], 
    description: "Intercambio de dos esquinas y dos aristas adyacentes" 
  }
]

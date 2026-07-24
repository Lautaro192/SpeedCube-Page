import { AlgorithmCase } from './types';

export const OLL_DATA: AlgorithmCase[] = [
  {
    id: 'oll-01',
    name: 'Runway',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "R U2 R2 F R F' U2 R' F R F'",
      "y L U2 L2 F' L' F U2 L' F' L' F"
    ],
    description: "Punto central, cuatro aristas y esquinas desorientadas"
  },
  {
    id: 'oll-02',
    name: 'Zamboni',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "F R U R' U' F' f R U R' U' f'",
      "y' r U r' U2 r U2 R' U2 R U' r'"
    ],
    description: "Punto central, forma de barra diagonal desorientada"
  },
  {
    id: 'oll-03',
    name: 'Anti-Mouse',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "f R U R' U' f' U' F R U R' U' F'",
      "y' f R U R' U' f' U' f R U R' U' f'"
    ],
    description: "Punto central con esquinas adyacentes desorientadas"
  },
  {
    id: 'oll-04',
    name: 'Mouse',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "f R U R' U' f' U F R U R' U' F'",
      "y' f R U R' U' f' U y' f R U R' U' f'"
    ],
    description: "Punto central, esquina diagonal y aristas desorientadas"
  },
  {
    id: 'oll-05',
    name: 'Lefty Square',
    type: 'OLL',
    group: 'Cuadrados',
    algorithms: [
      "r' U2 R U R' U r",
      "y2 l' U2 L U L' U l"
    ],
    description: "Forma de cuadrado en una esquina"
  },
  {
    id: 'oll-06',
    name: 'Righty Square',
    type: 'OLL',
    group: 'Cuadrados',
    algorithms: [
      "r U2 R' U' R U' r'",
      "y2 l U2 L' U' L U' l'"
    ],
    description: "Forma de cuadrado espejo en una esquina"
  },
  {
    id: 'oll-07',
    name: 'Lightning Bolt 1',
    type: 'OLL',
    group: 'Relámpago',
    algorithms: [
      "r U R' U R U2 r'",
      "y2 l U L' U L U2 l'"
    ],
    description: "Relámpago corto apuntando a la derecha"
  },
  {
    id: 'oll-08',
    name: 'Lightning Bolt 2',
    type: 'OLL',
    group: 'Relámpago',
    algorithms: [
      "r' U' R U' R' U2 r",
      "y2 l' U' L U' L' U2 l"
    ],
    description: "Relámpago corto espejo"
  },
  {
    id: 'oll-09',
    name: 'Fish Tail 1',
    type: 'OLL',
    group: 'Peces',
    algorithms: [
      "R U R' U' R' F R2 U R' U' F'",
      "y R' U' R y' R U R' U R U2 R'"
    ],
    description: "Forma de pez con cabeza arriba a la derecha"
  },
  {
    id: 'oll-10',
    name: 'Fish Tail 2',
    type: 'OLL',
    group: 'Peces',
    algorithms: [
      "R U R' U R' F R F' R U2 R'",
      "y R U R' y R' U' R U' R' U2 R"
    ],
    description: "Forma de pez espejo"
  },
  {
    id: 'oll-11',
    name: 'Flying Cross',
    type: 'OLL',
    group: 'Relámpago',
    algorithms: [
      "F R U R' U' F' U F R U R' U' F'",
      "y' r U R' U R U' R' U R U2 r'"
    ],
    description: "Relámpago largo apuntando a la derecha"
  },
  {
    id: 'oll-12',
    name: 'Flying Cross Mirror',
    type: 'OLL',
    group: 'Relámpago',
    algorithms: [
      "F R U R' U' F' U' F R U R' U' F'",
      "y' F R U R' U' F' U2 F R U R' U' F'"
    ],
    description: "Relámpago largo espejo"
  },
  {
    id: 'oll-13',
    name: 'Knight Move 1',
    type: 'OLL',
    group: 'Caballo',
    algorithms: [
      "F U R U2 R' U' R U R' F'",
      "y' r U' r' U' r U r' y' R' U R"
    ],
    description: "Movimiento de caballo, aristas y esquinas desorientadas"
  },
  {
    id: 'oll-14',
    name: 'Knight Move 2',
    type: 'OLL',
    group: 'Caballo',
    algorithms: [
      "R' F R U R' F' R y' R U' R'",
      "y' r' U r U r' U' r y L U' L'"
    ],
    description: "Movimiento de caballo espejo"
  },
  {
    id: 'oll-15',
    name: 'Knight Move 3',
    type: 'OLL',
    group: 'Caballo',
    algorithms: [
      "r' U' r R' U' R U r' U r",
      "y L' U' L y L U L' U L U2 L'"
    ],
    description: "Movimiento de caballo largo apuntando a la izquierda"
  },
  {
    id: 'oll-16',
    name: 'Knight Move 4',
    type: 'OLL',
    group: 'Caballo',
    algorithms: [
      "r U r' R U R' U' r U' r'",
      "y R U R' y R' U' R U' R' U2 R"
    ],
    description: "Movimiento de caballo largo espejo"
  },
  {
    id: 'oll-17',
    name: 'Diagonal Slash',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "F R U R' U' F' U R U2 R' U' R U R' U' R U' R'",
      "y2 f R U R' U' f' U' r U r' U2 R U2 R' U2 r U' r'"
    ],
    description: "Punto central con diagonal resuelta"
  },
  {
    id: 'oll-18',
    name: 'Crown',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "F R U R' U' F' U' R U2 R' U' R U R' U' R U' R'",
      "y2 r U R' U R U2 R' U' r U R' U' r' F R F'"
    ],
    description: "Punto central con dos esquinas opuestas resueltas"
  },
  {
    id: 'oll-19',
    name: 'Shield',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "r' R U R U R' U' r2 R2' U R U' r'",
      "y2 M' U2 M U2 M' U M U2 M' U2 M"
    ],
    description: "Punto central, forma de escudo o línea diagonal interrumpida"
  },
  {
    id: 'oll-20',
    name: 'Star',
    type: 'OLL',
    group: 'Punto',
    algorithms: [
      "r U R' U' M2 U R U' R' U' M'",
      "y2 M U M' U2 M U M' U2 M U2 M'"
    ],
    description: "Punto central rodeado, forma de flor desorientada"
  },
  {
    id: 'oll-21',
    name: 'Double Headlights',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "R U2 R' U' R U R' U' R U R' U' R U' R'",
      "y R U R' U R U2 R' U2 R U R' U R U2 R'"
    ],
    description: "Cruz resuelta, las cuatro esquinas desorientadas (Headlights dobles)"
  },
  {
    id: 'oll-22',
    name: 'Pi',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "R U2 R2' U' R2 U' R2' U2 R",
      "y f R U R' U' f' F R U R' U' F'"
    ],
    description: "Cruz resuelta, dos pares de headlights enfrentados (Pi)"
  },
  {
    id: 'oll-23',
    name: 'Headlights',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "R2 D R' U2 R D' R' U2 R'",
      "y R2 D' R U2 R' D R U2 R"
    ],
    description: "Cruz resuelta, headlights traseros y esquinas desorientadas a los lados (Headlights)"
  },
  {
    id: 'oll-24',
    name: 'Cross T',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "r U R' U' r' F R F'",
      "y2 L' U' L U' L' U2 L y' R' U' R U' R' U2 R"
    ],
    description: "Cruz resuelta, headlights laterales desalineados (T)"
  },
  {
    id: 'oll-25',
    name: 'Bowtie',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "F' r U R' U' r' F R",
      "y' R' F R U R' U' F' U R"
    ],
    description: "Cruz resuelta, headlights a los lados en diagonal (Bowtie)"
  },
  {
    id: 'oll-26',
    name: 'Antisune',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "R U2 R' U' R U' R'",
      "y' L' U' L U' L' U2 L"
    ],
    description: "Cruz armada, una esquina orientada arriba a la derecha (Antisune)"
  },
  {
    id: 'oll-27',
    name: 'Sune',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "R U R' U R U2 R'",
      "y' L' U2 L U L' U L"
    ],
    description: "Cruz armada, una esquina bien orientada arriba a la izquierda (Sune)"
  },
  {
    id: 'oll-28',
    name: 'Stealth',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "r U R' U' M' U R U' R'",
      "y2 M' U M U2 M' U M"
    ],
    description: "Forma de flecha o stealth, todas las esquinas orientadas"
  },
  {
    id: 'oll-29',
    name: 'W-Shape 1',
    type: 'OLL',
    group: 'Forma de W',
    algorithms: [
      "R U R' U' R' F R F' R U2 R'",
      "y2 L' U' L U L F' L' F L' U2 L"
    ],
    description: "Forma de W orientada abajo a la izquierda"
  },
  {
    id: 'oll-30',
    name: 'W-Shape 2',
    type: 'OLL',
    group: 'Forma de W',
    algorithms: [
      "R' U' R U R D' R' U r",
      "y2 R U R' U' R' F R F' U2 R U2 R'"
    ],
    description: "Forma de W espejo"
  },
  {
    id: 'oll-31',
    name: 'Couch',
    type: 'OLL',
    group: 'Forma de P',
    algorithms: [
      "R' U' F U R U' R' F' R",
      "y2 L' U' F U L U' L' F' L"
    ],
    description: "Forma de P apuntando hacia abajo a la derecha"
  },
  {
    id: 'oll-32',
    name: 'Couch Mirror',
    type: 'OLL',
    group: 'Forma de P',
    algorithms: [
      "R U B' U' R' U R B R'",
      "y2 L U F U' L' U L F' L'"
    ],
    description: "Forma de P espejo"
  },
  {
    id: 'oll-33',
    name: 'T-Shape 1',
    type: 'OLL',
    group: 'Forma de T',
    algorithms: [
      "R U R' U' R' F R F'",
      "y2 L' U' L U L F' L' F"
    ],
    description: "Forma de T, barra resuelta"
  },
  {
    id: 'oll-34',
    name: 'C-Shape 1',
    type: 'OLL',
    group: 'Forma de C',
    algorithms: [
      "R U R2' U' R' F R U R U' F'",
      "y R U R' U' B' R' F R F' B"
    ],
    description: "Forma de C orientada a la derecha"
  },
  {
    id: 'oll-35',
    name: 'Fish Tail 3',
    type: 'OLL',
    group: 'Peces',
    algorithms: [
      "R U2' R2' F R F' R U2' R'",
      "y2 L U2 L2 F' L' F L U2 L'"
    ],
    description: "Forma de pez apuntando hacia abajo a la derecha"
  },
  {
    id: 'oll-36',
    name: 'W-Shape 3',
    type: 'OLL',
    group: 'Forma de W',
    algorithms: [
      "L' U' L U' L' U L U L F' L' F",
      "y2 R U R' U R U' R' U' R' F R F'"
    ],
    description: "Forma de W espejo secundaria"
  },
  {
    id: 'oll-37',
    name: 'Fish Tail 4',
    type: 'OLL',
    group: 'Peces',
    algorithms: [
      "F R' F' R U R U' R'",
      "y2 F' L F L' U' L' U L"
    ],
    description: "Forma de pez apuntando hacia abajo a la izquierda"
  },
  {
    id: 'oll-38',
    name: 'W-Shape 4',
    type: 'OLL',
    group: 'Forma de W',
    algorithms: [
      "R U R' U R U' R' U' R' F R F'",
      "y2 L' U' L U' L' U L U L F' L' F"
    ],
    description: "Forma de W secundaria"
  },
  {
    id: 'oll-39',
    name: 'Lightning Bolt 3',
    type: 'OLL',
    group: 'Relámpago',
    algorithms: [
      "L F' L' U' L U F U' L'",
      "y R' F R U R' U' F' U R"
    ],
    description: "Relámpago grande apuntando a la izquierda"
  },
  {
    id: 'oll-40',
    name: 'Lightning Bolt 4',
    type: 'OLL',
    group: 'Relámpago',
    algorithms: [
      "R' F R U R' U' F' U R",
      "y2 L F' L' U' L U F U' L'"
    ],
    description: "Relámpago grande espejo"
  },
  {
    id: 'oll-41',
    name: 'Awkward 1',
    type: 'OLL',
    group: 'Incómodos',
    algorithms: [
      "R U R' U R U2 R' F R U R' U' F'",
      "y R U R' U' R' F R F' U2 R U R'"
    ],
    description: "Forma incómoda con headlights a la izquierda"
  },
  {
    id: 'oll-42',
    name: 'Awkward 2',
    type: 'OLL',
    group: 'Incómodos',
    algorithms: [
      "R' U' R U' R' U2 R F R U R' U' F'",
      "y2 R' U' R U R' U' R' F R F' U R"
    ],
    description: "Forma incómoda espejo"
  },
  {
    id: 'oll-43',
    name: 'P-Shape 3',
    type: 'OLL',
    group: 'Forma de P',
    algorithms: [
      "F' U' L' U L F",
      "y2 F U R U' R' F'"
    ],
    description: "Forma de P apuntando hacia arriba a la izquierda"
  },
  {
    id: 'oll-44',
    name: 'P-Shape 4',
    type: 'OLL',
    group: 'Forma de P',
    algorithms: [
      "F U R U' R' F'",
      "y2 F' U' L' U L F"
    ],
    description: "Forma de P espejo apuntando hacia arriba a la derecha"
  },
  {
    id: 'oll-45',
    name: 'T-Shape 2',
    type: 'OLL',
    group: 'Forma de T',
    algorithms: [
      "F R U R' U' F'",
      "y2 f R U R' U' f'"
    ],
    description: "Forma de T con barra desorientada"
  },
  {
    id: 'oll-46',
    name: 'C-Shape 2',
    type: 'OLL',
    group: 'Forma de C',
    algorithms: [
      "R' U' R' F R F' U R",
      "y2 L' U' L' F L F' U L"
    ],
    description: "Forma de C con barra desorientada"
  },
  {
    id: 'oll-47',
    name: 'L-Shape 1',
    type: 'OLL',
    group: 'Forma de L',
    algorithms: [
      "F' L' U' L U L' U' L U F",
      "y R' U' y R U R' U R U2 R'"
    ],
    description: "Forma de L apuntando arriba a la izquierda"
  },
  {
    id: 'oll-48',
    name: 'L-Shape 2',
    type: 'OLL',
    group: 'Forma de L',
    algorithms: [
      "F R U R' U' R U R' U' F'",
      "y2 F' L' U' L U L' U' L U F"
    ],
    description: "Forma de L espejo"
  },
  {
    id: 'oll-49',
    name: 'L-Shape 3',
    type: 'OLL',
    group: 'Forma de L',
    algorithms: [
      "r U' r2' U r2 U r2' U' r",
      "y2 l U' l2' U l2 U l2' U' l"
    ],
    description: "Forma de L pequeña apuntando arriba a la derecha"
  },
  {
    id: 'oll-50',
    name: 'L-Shape 4',
    type: 'OLL',
    group: 'Forma de L',
    algorithms: [
      "r' U r2 U' r2' U' r2 U r'",
      "y2 l' U l2 U' l2' U' l2 U l'"
    ],
    description: "Forma de L pequeña espejo"
  },
  {
    id: 'oll-51',
    name: 'I-Shape 1',
    type: 'OLL',
    group: 'Forma de I',
    algorithms: [
      "f R U R' U' f' U' F R U R' U' F'",
      "y' f R U R' U' f' U2 F R U R' U' F'"
    ],
    description: "Forma de I vertical"
  },
  {
    id: 'oll-52',
    name: 'I-Shape 2',
    type: 'OLL',
    group: 'Forma de I',
    algorithms: [
      "R U R' U R U' B U' B' R'",
      "y2 L' U' L U' L' U B' U B L"
    ],
    description: "Forma de I vertical con headlights opuestos"
  },
  {
    id: 'oll-53',
    name: 'L-Shape 5',
    type: 'OLL',
    group: 'Forma de L',
    algorithms: [
      "r' U' R U' R' U R U' R' U2 r",
      "y2 l' U' L U' L' U L U' L' U2 l"
    ],
    description: "Forma de L larga apuntando arriba a la derecha"
  },
  {
    id: 'oll-54',
    name: 'L-Shape 6',
    type: 'OLL',
    group: 'Forma de L',
    algorithms: [
      "r U R' U R U' R' U R U2 r'",
      "y2 l U L' U L U' L' U L U2 l'"
    ],
    description: "Forma de L larga espejo"
  },
  {
    id: 'oll-55',
    name: 'I-Shape 3',
    type: 'OLL',
    group: 'Forma de I',
    algorithms: [
      "R U2 R2' U' R U' R' U2 F R F'",
      "y2 F R U R' U' F' f R U R' U' f'"
    ],
    description: "Forma de I horizontal"
  },
  {
    id: 'oll-56',
    name: 'I-Shape 4',
    type: 'OLL',
    group: 'Forma de I',
    algorithms: [
      "r' U' r U' R' U R r' U r",
      "y2 l' U' l U' L' U L l' U l"
    ],
    description: "Forma de I horizontal espejo"
  },
  {
    id: 'oll-57',
    name: 'Stealth Mirror',
    type: 'OLL',
    group: 'Cruz hecha',
    algorithms: [
      "R U R' U' M' U R U' r'",
      "y2 M' U M U' M' U M"
    ],
    description: "Forma de flecha o stealth espejo, todas las esquinas orientadas"
  }
];
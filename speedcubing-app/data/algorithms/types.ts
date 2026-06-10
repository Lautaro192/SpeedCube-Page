export interface AlgorithmCase {
  id: string;
  name: string;
  type: 'F2L' | 'OLL' | 'PLL';
  group: string;
  algorithms: string[];
  description: string;
  image?: string;
}
export interface Player {
  id: number;
  number: number;
  position: string;
  name: string;
  x: number;
  y: number;
}

export interface Formation {
  [key: string]: Player[];
}
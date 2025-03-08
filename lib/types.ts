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

export interface SimpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  duration: string;
  content: any;
  coverImage: any;
}

export interface BlogPost {
  currentSlug: string;
  title: string;
  content: any;
  coverImage: any;
}

export type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

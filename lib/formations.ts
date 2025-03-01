import { Formation } from './types';

export const formations: Formation = {
  '4-4-2': [
    // Goalkeeper
    { id: 1, number: 1, position: 'GK', name: 'Goalkeeper', x: 50, y: 95 },
    
    // Defenders
    { id: 2, number: 2, position: 'RB', name: 'Right Back', x: 20, y: 80 },
    { id: 3, number: 5, position: 'CB', name: 'Center Back', x: 40, y: 80 },
    { id: 4, number: 6, position: 'CB', name: 'Center Back', x: 60, y: 80 },
    { id: 5, number: 3, position: 'LB', name: 'Left Back', x: 80, y: 80 },
    
    // Midfielders
    { id: 6, number: 7, position: 'RM', name: 'Right Mid', x: 20, y: 55 },
    { id: 7, number: 8, position: 'CM', name: 'Center Mid', x: 40, y: 55 },
    { id: 8, number: 4, position: 'CM', name: 'Center Mid', x: 60, y: 55 },
    { id: 9, number: 11, position: 'LM', name: 'Left Mid', x: 80, y: 55 },
    
    // Forwards
    { id: 10, number: 9, position: 'ST', name: 'Striker', x: 40, y: 30 },
    { id: 11, number: 10, position: 'ST', name: 'Striker', x: 60, y: 30 },
  ],
  
  '4-3-3': [
    // Goalkeeper
    { id: 1, number: 1, position: 'GK', name: 'Goalkeeper', x: 50, y: 95 },
    
    // Defenders
    { id: 2, number: 2, position: 'RB', name: 'Right Back', x: 20, y: 80 },
    { id: 3, number: 5, position: 'CB', name: 'Center Back', x: 40, y: 80 },
    { id: 4, number: 6, position: 'CB', name: 'Center Back', x: 60, y: 80 },
    { id: 5, number: 3, position: 'LB', name: 'Left Back', x: 80, y: 80 },
    
    // Midfielders
    { id: 6, number: 4, position: 'CDM', name: 'Def. Mid', x: 50, y: 65 },
    { id: 7, number: 8, position: 'CM', name: 'Center Mid', x: 35, y: 55 },
    { id: 8, number: 10, position: 'CM', name: 'Center Mid', x: 65, y: 55 },
    
    // Forwards
    { id: 9, number: 7, position: 'RW', name: 'Right Wing', x: 20, y: 30 },
    { id: 10, number: 9, position: 'ST', name: 'Striker', x: 50, y: 30 },
    { id: 11, number: 11, position: 'LW', name: 'Left Wing', x: 80, y: 30 },
  ],
  
  '4-2-3-1': [
    // Goalkeeper
    { id: 1, number: 1, position: 'GK', name: 'Goalkeeper', x: 50, y: 95 },
    
    // Defenders
    { id: 2, number: 2, position: 'RB', name: 'Right Back', x: 20, y: 80 },
    { id: 3, number: 5, position: 'CB', name: 'Center Back', x: 40, y: 80 },
    { id: 4, number: 6, position: 'CB', name: 'Center Back', x: 60, y: 80 },
    { id: 5, number: 3, position: 'LB', name: 'Left Back', x: 80, y: 80 },
    
    // Defensive Midfielders
    { id: 6, number: 4, position: 'CDM', name: 'Def. Mid', x: 40, y: 65 },
    { id: 7, number: 8, position: 'CDM', name: 'Def. Mid', x: 60, y: 65 },
    
    // Attacking Midfielders
    { id: 8, number: 7, position: 'RAM', name: 'Right Att. Mid', x: 25, y: 45 },
    { id: 9, number: 10, position: 'CAM', name: 'Center Att. Mid', x: 50, y: 45 },
    { id: 10, number: 11, position: 'LAM', name: 'Left Att. Mid', x: 75, y: 45 },
    
    // Forward
    { id: 11, number: 9, position: 'ST', name: 'Striker', x: 50, y: 25 },
  ],
  
  '3-5-2': [
    // Goalkeeper
    { id: 1, number: 1, position: 'GK', name: 'Goalkeeper', x: 50, y: 95 },
    
    // Defenders
    { id: 2, number: 5, position: 'CB', name: 'Center Back', x: 30, y: 80 },
    { id: 3, number: 6, position: 'CB', name: 'Center Back', x: 50, y: 80 },
    { id: 4, number: 4, position: 'CB', name: 'Center Back', x: 70, y: 80 },
    
    // Wing Backs
    { id: 5, number: 2, position: 'RWB', name: 'Right Wing Back', x: 15, y: 65 },
    { id: 6, number: 3, position: 'LWB', name: 'Left Wing Back', x: 85, y: 65 },
    
    // Central Midfielders
    { id: 7, number: 8, position: 'CM', name: 'Center Mid', x: 35, y: 55 },
    { id: 8, number: 6, position: 'CM', name: 'Center Mid', x: 50, y: 55 },
    { id: 9, number: 10, position: 'CM', name: 'Center Mid', x: 65, y: 55 },
    
    // Forwards
    { id: 10, number: 9, position: 'ST', name: 'Striker', x: 40, y: 30 },
    { id: 11, number: 11, position: 'ST', name: 'Striker', x: 60, y: 30 },
  ],
  
  '5-3-2': [
    // Goalkeeper
    { id: 1, number: 1, position: 'GK', name: 'Goalkeeper', x: 50, y: 95 },
    
    // Defenders
    { id: 2, number: 2, position: 'RB', name: 'Right Back', x: 15, y: 80 },
    { id: 3, number: 5, position: 'CB', name: 'Center Back', x: 35, y: 80 },
    { id: 4, number: 6, position: 'CB', name: 'Center Back', x: 50, y: 80 },
    { id: 5, number: 4, position: 'CB', name: 'Center Back', x: 65, y: 80 },
    { id: 6, number: 3, position: 'LB', name: 'Left Back', x: 85, y: 80 },
    
    // Midfielders
    { id: 7, number: 8, position: 'CM', name: 'Center Mid', x: 35, y: 55 },
    { id: 8, number: 6, position: 'CM', name: 'Center Mid', x: 50, y: 55 },
    { id: 9, number: 10, position: 'CM', name: 'Center Mid', x: 65, y: 55 },
    
    // Forwards
    { id: 10, number: 9, position: 'ST', name: 'Striker', x: 40, y: 30 },
    { id: 11, number: 11, position: 'ST', name: 'Striker', x: 60, y: 30 },
  ],
};
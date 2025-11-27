export interface MissionStep {
  id: number;
  title: string;
  locationName: string;
  context: string;
  clue: string;
  unlockCode: string; // The code the user needs to enter to proceed TO the next step
  isFinal?: boolean;
}

export enum GameState {
  LOCKED = 'LOCKED', // Waiting for code
  UNLOCKED = 'UNLOCKED', // Code correct, reading info
  COMPLETED = 'COMPLETED' // All done
}
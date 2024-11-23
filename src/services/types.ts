export interface Cell {
  index: number;
  value: number;
  color: string;
  ownerIndex: number;
}

export interface Player {
  index: number;
  color: string;
  ownedCells: number[];
  readyCells: number[];
  score: number;
  playerPoints: number;
}

export interface AppState {
  isOn: boolean;
  dice: number;
  isDiceSet: boolean;
  remainingTurns: number;
  currentPlayerIndex: number;
  cells: Cell[];
  playerCount: number;
  players: Player[];
  showResult: boolean;
}

export type typePlayerCount = number;

export interface FormInput {
  count: typePlayerCount;
}

export interface CellProps {
  cell: Cell;
}

export interface RollProps {
  dices: string[];
}

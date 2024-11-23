//used in various core calculations in the app
//constant value depending on the player count
export const MAP_SIDE_LENGTH = (playerCount: number) => 2 * playerCount + 1;

//initate player starting cells, depending on the player count
export const PLAYER_INITIAL_CELLS = (
  playerIndex: number,
  playerCount: number
) =>
  playerCount === 2
    ? [0, 24][playerIndex]
    : playerCount === 3
    ? [0, 48, 6][playerIndex]
    : playerCount === 4
    ? [0, 80, 8, 72][playerIndex]
    : 0;

//helper function to calc ready cells in a single loop
const checkVertical = (cellIndex: number, mapSize: number) =>
  cellIndex - mapSize < 0
    ? cellIndex + mapSize
    : cellIndex + mapSize > mapSize ** 2 - 1
    ? cellIndex - mapSize
    : [cellIndex + mapSize, cellIndex - mapSize];

//helper function to calc ready cells in a single loop
const checkHorizontal = (cellIndex: number, mapSize: number) =>
  cellIndex % mapSize === 0
    ? cellIndex + 1
    : cellIndex % mapSize === mapSize - 1
    ? cellIndex - 1
    : [cellIndex + 1, cellIndex - 1];

//calculate ready cells
//map size is the result of MAP_SIDE_LENGTH
export const PLAYER_READY_CELLS = (ownedCells: number[], mapsize: number) => [
  ...new Set(
    ownedCells
      .map((cellIndex) =>
        [
          checkVertical(cellIndex, mapsize),
          checkHorizontal(cellIndex, mapsize),
        ].flat()
      )
      .flat()
  ),
];

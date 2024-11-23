//imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, Cell, Player, typePlayerCount } from "./types";
import {
  COEF_MAP_LNGHT,
  DEF_CELL_CLR,
  DICE,
  INIT_CELL_VAL,
  PLAYERS_COLORS,
} from "./constants";
import {
  MAP_SIDE_LENGTH,
  PLAYER_INITIAL_CELLS,
  PLAYER_READY_CELLS,
} from "./helpers";
import { RootState } from "../store";

//initial app state
const initialState: AppState = {
  isOn: false,
  isDiceSet: false,
  dice: 0,
  remainingTurns: 0,
  currentPlayerIndex: -1,
  cells: [],
  playerCount: -1,
  players: [],
  showResult: false,
};

//reducers to manage global app state
export const appSlice = createSlice({
  name: "app_slice",
  initialState,
  reducers: {
    startGame: (state) => {
      //only to toggle between components
      state.isOn = true;
    },

    endGame: (state) => {
      //only to toggle between components
      //button use only
      state.isOn = false;
    },

    setShowResult: (state, action: PayloadAction<boolean>) => {
      state.showResult = action.payload;
    },

    setDice: (state) => {
      //random number for both initiation and turn based use
      if (state.isDiceSet) state.dice = Math.floor(Math.random() * 6) || DICE;
    },

    setIsDiceSet: (state, action: PayloadAction<boolean>) => {
      //when true set new dice
      state.isDiceSet = action.payload;
    },

    initTurns: (state) => {
      //init max turns
      //at the start
      //and if the draw conditions are met
      state.remainingTurns = 2 ** state.playerCount * COEF_MAP_LNGHT;
    },

    setTurns: (state) => {
      //lower turns, after the last player clicks dice
      state.remainingTurns--;
    },

    initCurrentPlayer: (state) => {
      //start with the first player in the players array
      state.currentPlayerIndex = 0;
    },

    setCurrentPlayer: (state) => {
      //next player based on length modulo
      state.currentPlayerIndex =
        (state.currentPlayerIndex + 1) % state.playerCount;
    },

    setPlayerCount: (state, action: PayloadAction<typePlayerCount>) => {
      //form input
      state.playerCount = action.payload;
    },

    initCells: (state) => {
      //create map based on the player count
      state.cells = Array.from(
        { length: MAP_SIDE_LENGTH(state.playerCount) ** 2 },
        (_, i) => ({
          index: i,
          value: INIT_CELL_VAL,
          color: DEF_CELL_CLR,
          ownerIndex: -1,
        })
      );
    },

    setCells: (state, action: PayloadAction<Cell>) => {
      //update map, chane an old cell with a new updated one
      state.cells = state.cells.map((cell, index) =>
        index === action.payload.index
          ? {
              index: action.payload.index,
              value: action.payload.value,
              color: action.payload.color,
              ownerIndex: action.payload.ownerIndex,
            }
          : cell
      );
    },

    initPlayers: (state) => {
      //initiate players with default values
      state.players = Array.from({ length: state.playerCount }, (_, i) => ({
        index: i,
        color: PLAYERS_COLORS[i],
        ownedCells: [PLAYER_INITIAL_CELLS(i, state.playerCount)],
        readyCells: PLAYER_READY_CELLS(
          [PLAYER_INITIAL_CELLS(i, state.playerCount)],
          MAP_SIDE_LENGTH(state.playerCount)
        ),
        score: 1,
        playerPoints: 0,
      }));
    },

    setPlayers: (state, action: PayloadAction<Player>) => {
      //update all players when a single player is updated
      //recieves a copy player
      state.players = state.players.map((player, index) =>
        index === action.payload.index
          ? {
              index: action.payload.index,
              color: action.payload.color,
              ownedCells: action.payload.ownedCells,
              readyCells: action.payload.readyCells,
              score: action.payload.ownedCells.reduce(
                (sum, cellIndex) => sum + state.cells[cellIndex].value,
                0
              ),
              playerPoints: action.payload.playerPoints,
            }
          : player
      );
    },
  },
});

export const {
  startGame,
  endGame,
  setDice,
  setIsDiceSet,
  initTurns,
  setTurns,
  initCurrentPlayer,
  setCurrentPlayer,
  setPlayerCount,
  initCells,
  setCells,
  initPlayers,
  setPlayers,
  setShowResult,
} = appSlice.actions;

export const selectAppSlice = (state: RootState) => state.appReducer;

export default appSlice.reducer;

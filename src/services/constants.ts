//App constants
//
export const DICE = 6; //max dice value instead of 0
export const COEF_MAP_LNGHT = 5; //random number to calc max turns
export const INIT_CELL_VAL = 1; //default cell value
export const DICE_ROLL_INTERVAL = 25; //time between src changes
export const DICE_ROLL_DURATION = 500; //dice roll duration
export const DICES = [
  "d1.png",
  "d2.png",
  "d3.png",
  "d4.png",
  "d5.png",
  "d6.png",
]; //dice images
//player styles
//all 4 players' assigned colors
export const PLAYERS_COLORS: { [key: number]: string } = {
  0: "bg-red-400",
  1: "bg-green-400",
  2: "bg-orange-400",
  3: "bg-blue-400",
};
//all 4 players' assigned ready colors
export const PLAYERS_READY_COLORS: { [key: number]: string } = {
  0: "hover:bg-red-200",
  1: "hover:bg-green-200",
  2: "hover:bg-orange-200",
  3: "hover:bg-blue-200",
};
//all 4 players border styles
export const PLAYERS_BORDERS = {
  0: "border-red-700",
  1: "border-green-700",
  2: "border-orange-700",
  3: "border-blue-700",
};

export const DEF_CELL_CLR = "bg-gray-400"; //default cell color

//default tailwind styles (mobile first)
//form bg styles, coming from the chatgpt
export const DEF_THEME = "bg-black text-gray-400 select-none";
//default font styles
export const DEF_FONT = "font-mono text-xl font-semibold tracking-wide";
//default button, input styles
export const DEF_INP = "font-mono text-3xl font-black text-center outline-none";
//default hover for input and button elements
export const DEF_INP_HOV =
  "hover:bg-sky-400 hover:text-black hover:border-none";
//default border
export const DEF_BORDER = "rounded-lg border-4 border-double border-gray-400";
//default table border
export const DEF_TAB_BORDER = "border-2 border-gray-400 px-1";

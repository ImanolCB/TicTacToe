import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardTocheck) => {

    //Revisión de combinaciones ganadoras
    for(const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardTocheck[a] &&
        boardTocheck[a] === boardTocheck[b] &&
        boardTocheck[a] === boardTocheck[c]

      ) {
        return boardTocheck[a]
      }
    }
    //Si no hay ganador
    return null
  }
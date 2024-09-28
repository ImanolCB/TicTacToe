import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './index.css'

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({children, isSelected, updateBoard, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''} `
  const HandleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={HandleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  const [board , setBoard] = useState(Array(9).fill(null))
  const [turn , setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //Null -> no hay ganador, False es empate

  const checkWinner = (boardTocheck) => {

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

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    //Revisión de un empate comprobando que no haya espacios en blanco en el tablero
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) =>{

    //No se modifica la celda si hay algo en esa posición
    if(board[index] || winner) return

    //Copia el tablero y se actualiza con los nuevos datos
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Cambia el estado de turno
    const newTurn = turn ===TURNS.X ? TURNS.O :TURNS.X
    setTurn(newTurn)

    //Revisión si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return(

              <Square
                key={index}
                index={index}
                updateBoard = {updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X }>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O }>{TURNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Ganó ' + winner
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App

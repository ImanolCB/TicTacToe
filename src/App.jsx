import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import confetti from 'canvas-confetti'
import './index.css'

import { Square } from './components/Square'
import { TURNS } from './constants.js'
import { checkWinnerFrom } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'



function App() {

  //Inicializacion del estado del board
  const [board , setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  //Estados de Ganador y de Turnos
  const [turn , setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    return winnerFromStorage ?? TURNS.X
  }) //Null -> no hay ganador, False es empate

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
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

    //Guardado de partida
    window.localStorage.setItem('board', JSON.stringify(newBoard) )
    window.localStorage.setItem('turn', newTurn )

    //Revisión si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      window.localStorage.setItem('winner', newWinner )
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

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}

export default App

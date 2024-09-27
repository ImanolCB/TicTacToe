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



function App() {

  const [board , setBoard] = useState(Array(9).fill(null))
  const [turn , setTurn] = useState(TURNS.X)

  const updateBoard = (index) =>{

    //No se modifica la celda si hay algo en esa posición
    if(board[index]) return

    //Copia el tablero y se actualiza con los nuevos datos
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Cambia el estado de turno
    const newTurn = turn ===TURNS.X ? TURNS.O :TURNS.X
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return(

              <Square
                key={index}
                index={index}
                updateBoard = {updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X }>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O }>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App

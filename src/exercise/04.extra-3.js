// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

const Board = ({onClick, squares}) => {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  const [squaresHistory, setSquaresHistory] = useLocalStorageState(
    'squares:history',
    [Array(9).fill(null)],
  )
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)
  const currentSquares = squaresHistory[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) return

    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue

    setSquaresHistory([...squaresHistory, squaresCopy])
    setCurrentStep(currentStep + 1)
  }

  function restart() {
    setSquaresHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <div>
          <div className="status">{status}</div>
          <Board onClick={selectSquare} squares={currentSquares} />
          <button className="restart" onClick={restart}>
            restart
          </button>
        </div>
        <div className="game-history">
          {squaresHistory.map((squares, step) => {
            const isCurrentStep = step === currentStep
            return (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                disabled={isCurrentStep}
              >
                {isCurrentStep ? `Current #${step}` : `Go to move #${step}`}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const App = () => {
  return <Game />
}

export default App

import React, { useState, useEffect } from 'react'

import Square from './square';

function Board() {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const initialBoardState = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoardState);
  const [win, setWin] = useState(null)
  const [winStreak, setWinStreak] = useState(null);
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ];

  const playerMove = (index) => {
    if (win || board[index] !== null) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    const winner = checkWin(newBoard, player);
    if (winner) {
      setWin(winner);
      return;
    }

    setPlayer(player === 'X' ? 'O' : 'X');

  };




  const checkWin = (currentBoard, currentPlayer) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        currentBoard[a] === currentPlayer &&
        currentBoard[b] === currentPlayer &&
        currentBoard[c] === currentPlayer
      ) {

        setWinStreak(winConditions[i]);
        return currentPlayer;

      }
    }
    setWinStreak(null);
    return null;

  };



  const reset = () => {
    // Reset the board and player to their initial state
    setBoard(initialBoardState);
    setPlayer('X');
    setWin(null);
    setWinStreak(null);
  };

  return (
    <div className='container'>
      <div className='windisplay'>


        {win ? (
          <h3 className='animate__animated animate__fadeIn'>{win} wins</h3>
        ) : (
          <h3 className='animate__animated animate__fadeIn'>{player} is up</h3>
        )}

      </div>
      <div id='board-body'>

        {board.map((value, index) => {
          let isWinningSquare = false;
          if (winStreak && winStreak.includes(index)) {
            isWinningSquare = true;
          }
          return <Square key={index} value={value} player={player} onClick={() => playerMove(index)} isWinningSquare={isWinningSquare} />
        })}

      </div>



      {!win ? (
        <button onClick={reset} className='reset-button'>reset</button>
      ) : (
        <button onClick={reset} className='reset-button'>Play Again</button>
      )}



    </div>
  )
}

export default Board






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



  useEffect(() => {
    if (mode === 1 && player === 'O') {
      const emptySquares = board.reduce((acc, val, index) => {
        if (val === null) {
          acc.push(index);
        }
        return acc;
      }, []);

      if (emptySquares.length > 0 && !win) {
        let delay;
        const delayedMove = () => {
          makeSmartComputerMove(board);
        };

        delay = setTimeout(delayedMove, 1000);

        return () => clearTimeout(delay);
      }
    }
  }, [player, board, win]);

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



  const [menuDisplay, setMenuDisplay] = useState(true);

  const toggleMenu = () => {
    setMenuDisplay(!menuDisplay)
  }

  const [mode, gameMode] = useState(null)

  const setSinglePlayer = () => {
    toggleMenu();
    gameMode(1);
  }

  const setDoublePlayer = () => {
    toggleMenu();
    gameMode(2);
  }

  const isDisabled = mode === 1 && player === 'O';



  const checkWin = (currentBoard, currentPlayer) => {
    let isBoardFull = true;
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

      if (currentBoard[a] === null || currentBoard[b] === null || currentBoard[c] === null) {
        isBoardFull = false;
      }
    }

    if (isBoardFull) {
      return "Tie";
    }
    setWinStreak(null);
    return null;

  };



  const makeSmartComputerMove = (currentBoard) => {
    const emptySquares = currentBoard.reduce((acc, val, index) => {
      if (val === null) {
        acc.push(index);
      }
      return acc;
    }, []);
    for (let i = 0; i < emptySquares.length; i++) {
      const testBoard = [...currentBoard];
      testBoard[emptySquares[i]] = 'O';
      if (checkWin(testBoard, 'O')) {
        playerMove(emptySquares[i]);
        return;
      }
    }
    for (let i = 0; i < emptySquares.length; i++) {
      const testBoard = [...currentBoard];
      testBoard[emptySquares[i]] = 'X';
      if (checkWin(testBoard, 'X')) {
        playerMove(emptySquares[i]);
        return;
      }
    }
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    playerMove(emptySquares[randomIndex]);
  };

  const reset = () => {
    // Reset the board and player to their initial state
    setBoard(initialBoardState);
    setPlayer('X');
    setWin(null);
    setWinStreak(null);
  };


  const switchGameMode = () => {
    if (mode === 1) {
      reset();
      gameMode(2)
    } else {
      reset();
      gameMode(1)
    }
  }

  return (
    <div className='container'>
      {!menuDisplay ? (
        <div className='main-board-container'>
          <div className='windisplay'>
            {win ? (
              win === "Tie" ? (
                <h3 className='animate__animated animate__fadeIn'>It's a Tie!</h3>
              ) : (
                <h3 className='animate__animated animate__fadeIn'>{win} wins</h3>
              )
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
              return <Square key={index} value={value} player={player} onClick={() => playerMove(index)} isWinningSquare={isWinningSquare} disabled={isDisabled} />
            })}


            <div className={`animate__animated animate__fadeIn ${JSON.stringify(winStreak) === JSON.stringify(winConditions[0]) ? 'win-streak-1' : JSON.stringify(winStreak) === JSON.stringify(winConditions[1]) ? 'win-streak-2' : JSON.stringify(winStreak) === JSON.stringify(winConditions[2]) ? 'win-streak-3' : JSON.stringify(winStreak) === JSON.stringify(winConditions[3]) ? 'win-streak-4' : JSON.stringify(winStreak) === JSON.stringify(winConditions[4]) ? 'win-streak-5' : JSON.stringify(winStreak) === JSON.stringify(winConditions[5]) ? 'win-streak-6' : JSON.stringify(winStreak) === JSON.stringify(winConditions[6]) ? 'win-streak-7' : JSON.stringify(winStreak) === JSON.stringify(winConditions[7]) ? 'win-streak-8' : ''}`}>
            </div>

          </div>



          {!win ? (
            <div className='reset-switch-btns'>
              <button onClick={reset} className='reset-button'>reset</button>
              <button className='switch-btn' onClick={switchGameMode}>Switch Game Mode</button>
            </div>
          ) : (
            <div className='reset-switch-btns'>
              <button onClick={reset} className='reset-button'>Play Again</button>
              <button className='switch-btn' onClick={switchGameMode}>Switch Game Mode</button>
            </div>
          )}
        </div>
      ) : (
        <div className='game-mode-panel'>
          <button className='mode-btn' onClick={setSinglePlayer}>Single Player</button>
          <button className='mode-btn' onClick={setDoublePlayer}>Double Player</button>
        </div>
      )}

    </div>

  )
}

export default Board





//square 1
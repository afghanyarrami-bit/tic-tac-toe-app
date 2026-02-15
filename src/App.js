import React, { useState } from 'react';

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const handleClick = (index) => {
    // Don't allow moves if there's a winner or square is already filled
    if (winner || squares[index]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => {
    return (
      <button
        className="square"
        onClick={() => handleClick(index)}
      >
        {squares[index]}
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Tic-Tac-Toe</h1>
      
      <div style={{ 
        marginBottom: '20px', 
        fontSize: '24px',
        fontWeight: 'bold',
        color: winner ? '#27ae60' : '#34495e'
      }}>
        {status}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gridTemplateRows: 'repeat(3, 100px)',
        gap: '5px',
        marginBottom: '20px'
      }}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <button
        id="reset"
        onClick={handleReset}
        style={{
          padding: '12px 30px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
      >
        Reset Game
      </button>
      
    </div>
  );
}

export default Board;

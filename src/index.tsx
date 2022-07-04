import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

type Player = "X" | "O";
type NullablePlayer = Player | null;

interface SquareProps {
  value: NullablePlayer;
  onClick: () => void;
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState<NullablePlayer[]>(
    new Array(9).fill(null)
  );
  const [player, setPlayer] = useState<Player>("X");

  function calculateWinner(squares: NullablePlayer[]): NullablePlayer {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i: number) {
    console.log("click", i);
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = player;
    setSquares(newSquares);

    setPlayer(player === "X" ? "O" : "X");
  }

  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${player}`;

  return (
    <div>
      <div className="status">{status}</div>
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
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game />);

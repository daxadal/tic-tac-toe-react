import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

type Player = 'X' | 'O';
type NullablePlayer = Player | null;

interface SquareProps {
  value: NullablePlayer,
  onClick: () => void
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState<NullablePlayer[]>(new Array(9).fill(null));
  const [player, setPlayer] = useState<Player>("X");

  function handleClick(i: number) {
    console.log("click", i);

    const newSquares = [...squares];
    newSquares[i] = player;
    setSquares(newSquares);

    setPlayer(player === "X" ? "O" : "X");
  }

  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  const status = `Next player: ${player}`;

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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Game />);

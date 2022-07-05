import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

type Player = "X" | "O";
type NullablePlayer = Player | null;
type Squares = NullablePlayer[];

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

interface BoardProps {
  squares: Squares;
  onClick: (i: number) => void;
}

function Board(props: BoardProps) {
  function renderSquare(i: number) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
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
  );
}

interface HistoryItem {
  squares: Squares;
  indexClicked: number;
}

function Game() {
  const [player, setPlayer] = useState<Player>("X");
  const [history, setHistory] = useState<HistoryItem[]>([
    { squares: new Array(9).fill(null), indexClicked: -1 },
  ]);
  const [step, setStep] = useState(0);

  function calculateWinner(squares: Squares): NullablePlayer {
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
    const squares = history[step].squares;
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = player;
    const newHistory = [
      ...history.slice(0, step + 1),
      { squares: newSquares, indexClicked: i },
    ];
    setHistory(newHistory);

    setStep(newHistory.length - 1);
    setPlayer(player === "X" ? "O" : "X");
  }

  function jumpToMove(newStep: number) {
    setStep(newStep);
    setPlayer(newStep % 2 === 0 ? "X" : "O");
  }

  function renderHistory() {
    const player = step % 2 === 0 ? "O" : "X";
    const row = Math.floor(history[step].indexClicked / 3);
    const column = history[step].indexClicked % 3;

    return history.map((squares, step) => (
      <li key={step}>
        <button onClick={() => jumpToMove(step)}>
          {step > 0
            ? `Go to move #${step}: ${player} on (${row},${column})`
            : "Go to game start"}
        </button>
      </li>
    ));
  }

  const winner = calculateWinner(history[history.length - 1].squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${player}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[step].squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{renderHistory()}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game />);

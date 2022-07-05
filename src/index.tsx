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
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  return (
    <div>
      {new Array(3).fill(null).map((_, row) => (
        <div key={"row-" + row} className="board-row">
          {new Array(3).fill(null).map((_, col) => renderSquare(row * 3 + col))}
        </div>
      ))}
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
  const [currentStep, setCurrentStep] = useState(0);

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
    const squares = history[currentStep].squares;
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = player;
    const newHistory = [
      ...history.slice(0, currentStep + 1),
      { squares: newSquares, indexClicked: i },
    ];
    setHistory(newHistory);

    setCurrentStep(newHistory.length - 1);
    setPlayer(player === "X" ? "O" : "X");
  }

  function jumpToMove(newStep: number) {
    setCurrentStep(newStep);
    setPlayer(newStep % 2 === 0 ? "X" : "O");
  }

  function renderHistory() {
    return history.map((squares, step) => {
      const player = step % 2 === 0 ? "O" : "X";
      const row = Math.floor(history[step].indexClicked / 3);
      const column = history[step].indexClicked % 3;
      const text =
        step > 0
          ? `Go to move #${step}: ${player} on (${row},${column})`
          : "Go to game start";

      return (
        <li key={step}>
          <button onClick={() => jumpToMove(step)}>
            {step === currentStep ? <strong>{text}</strong> : text}
          </button>
        </li>
      );
    });
  }

  const winner = calculateWinner(history[history.length - 1].squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${player}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[currentStep].squares} onClick={handleClick} />
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

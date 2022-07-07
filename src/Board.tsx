import React from "react";

import { Squares } from "./types";

import Square from "./Square";

import "./Board.css";

interface BoardProps {
  squares: Squares;
  onClick: (i: number) => void;
  winnerLine: number[];
}

export default function Board(props: BoardProps) {
  const { squares, onClick, winnerLine } = props;

  function renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        bold={winnerLine.includes(i)}
      />
    );
  }

  return (
    <div>
      {new Array(3).fill(null).map((_v, row) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`row-${row}`} className="board-row">
          {new Array(3).fill(null).map((_, col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

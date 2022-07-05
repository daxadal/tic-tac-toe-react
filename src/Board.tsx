import React from "react";

import { Square } from "./Square";
import { Squares } from "./types";

import "./Board.css";

interface BoardProps {
  squares: Squares;
  onClick: (i: number) => void;
  winnerLine: number[];
}

export default function Board(props: BoardProps) {
  function renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        bold={props.winnerLine.includes(i)}
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

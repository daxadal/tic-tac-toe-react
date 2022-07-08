import React from "react";
import styled from "styled-components";

import { Squares } from "./types";

import Square from "./Square";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

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
    <BoardContainer>
      {new Array(9).fill(null).map((_v, index) => renderSquare(index))}
    </BoardContainer>
  );
}

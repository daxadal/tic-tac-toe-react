import React, { useState } from "react";
import styled from "styled-components";

import { Player, HistoryItem, Squares } from "../types";

import Board from "./Board";
import History from "./History";

const Title = styled.h1`
  text-align: center;
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  max-width: 640px;
  margin: auto;
`;

const HalfDiv = styled.div`
  flex: 1 0 0;
`;

const StatusDiv = styled.div`
  margin-bottom: 10px;
`;

export default function Game() {
  const [player, setPlayer] = useState<Player>("X");
  const [history, setHistory] = useState<HistoryItem[]>([
    { squares: new Array(9).fill(null), indexClicked: -1 },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  function calculateWinnerLine(squares: Squares): number[] {
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
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [a, b, c];
      }
    }
    return [];
  }

  function handleClick(i: number) {
    const { squares } = history[currentStep];
    if (squares[i] || calculateWinnerLine(squares).length > 0) {
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

  const winnerLine = calculateWinnerLine(history[history.length - 1].squares);
  const winner =
    winnerLine.length === 0 ? null : history.length % 2 === 0 ? "X" : "O";
  const status = winner
    ? `Winner: ${winner}`
    : history.length === 10
    ? "Tie"
    : `Next player: ${player}`;

  return (
    <>
      <Title>Tic Tac Toe</Title>
      <WrapperDiv>
        <HalfDiv>
          <Board
            squares={history[currentStep].squares}
            onClick={handleClick}
            winnerLine={winnerLine}
          />
        </HalfDiv>
        <HalfDiv>
          <StatusDiv>{status}</StatusDiv>
          <History
            history={history}
            onClick={jumpToMove}
            currentStep={currentStep}
          />
        </HalfDiv>
      </WrapperDiv>
    </>
  );
}

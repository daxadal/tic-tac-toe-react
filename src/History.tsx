import React, { useState } from "react";

import { HistoryItem } from "./types";

interface HistoryProps {
  history: HistoryItem[];
  onClick: (newStep: number) => void;
  currentStep: number;
}

export default function History(props: HistoryProps) {
  const [ascending, setAscending] = useState(true);

  function renderStep(step: number) {
    const player = step % 2 === 0 ? "O" : "X";
    const row = Math.floor(props.history[step].indexClicked / 3);
    const column = props.history[step].indexClicked % 3;
    const text =
      step > 0
        ? `Go to move #${step}: ${player} on (${row},${column})`
        : "Go to game start";

    return (
      <li key={step}>
        <button onClick={() => props.onClick(step)}>
          {step === props.currentStep ? <strong>{text}</strong> : text}
        </button>
      </li>
    );
  }

  const stepList = props.history.map((squares, step) => renderStep(step));
  return (
    <>
      <ol>{ascending ? stepList : stepList.reverse()}</ol>
      <label htmlFor="ascending">Ascending order:</label>
      <input
        id="ascending"
        type="checkbox"
        checked={ascending}
        onChange={() => setAscending(!ascending)}
      />
    </>
  );
}

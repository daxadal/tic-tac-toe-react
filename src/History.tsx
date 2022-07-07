import React, { useState } from "react";
import styled from "styled-components";

import { HistoryItem } from "./types";

interface HistoryProps {
  history: HistoryItem[];
  onClick: (newStep: number) => void;
  currentStep: number;
}

const StyledButton = styled.button<{ stepIsCurrent: boolean }>`
  font-weight: ${(props) => (props.stepIsCurrent ? "bold" : "normal")};
`;

export default function History(props: HistoryProps) {
  const { history, onClick, currentStep } = props;

  const [ascending, setAscending] = useState(true);

  function renderStep(step: number) {
    const player = step % 2 === 0 ? "O" : "X";
    const row = Math.floor(history[step].indexClicked / 3);
    const column = history[step].indexClicked % 3;

    return (
      <li key={step}>
        <StyledButton
          type="button"
          onClick={() => onClick(step)}
          stepIsCurrent={step === currentStep}
        >
          {step > 0
            ? `Go to move #${step}: ${player} on (${row},${column})`
            : "Go to game start"}
        </StyledButton>
      </li>
    );
  }

  const stepList = history.map((squares, step) => renderStep(step));
  return (
    <>
      <ol>{ascending ? stepList : stepList.reverse()}</ol>
      <label htmlFor="ascending">
        Ascending order:
        <input
          id="ascending"
          type="checkbox"
          checked={ascending}
          onChange={() => setAscending(!ascending)}
        />
      </label>
    </>
  );
}

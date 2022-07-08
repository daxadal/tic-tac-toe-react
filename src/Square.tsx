import React from "react";
import styled from "styled-components";

import { NullablePlayer } from "./types";

import { ReactComponent as Circle } from "./circle.svg";
import { ReactComponent as Cross } from "./cross.svg";

const StyledButton = styled.button<{ bold: boolean }>`
  aspect-ratio: 1/ 1;
  display: flex;
  align-items: center;
  padding: 5%;

  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => (props.bold ? "green" : props.theme.text)};
  background-color: ${(props) => props.theme.background};

  .kbd-navigation &:focus {
    background: ${(props) => props.theme.foreground};
  }
`;

const Content = styled.svg`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

interface SquareProps {
  value: NullablePlayer;
  bold: boolean;
  onClick: () => void;
}

export default function Square(props: SquareProps) {
  const { bold, onClick, value } = props;

  return (
    <StyledButton type="button" onClick={onClick} bold={bold}>
      <Content
        as={value === "X" ? Cross : value === "O" ? Circle : undefined}
      />
    </StyledButton>
  );
}

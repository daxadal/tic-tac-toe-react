import React from "react";
import styled from "styled-components";

import { NullablePlayer } from "./types";

const StyledButton = styled.button<{ bold: boolean }>`
  border: 1px solid ${(props) => props.theme.border};
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
  color: ${(props) => (props.bold ? "green" : props.theme.text)};

  &:focus {
    outline: none;
  }

  .kbd-navigation &:focus {
    background: ${(props) => props.theme.foreground};
  }
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
      {value}
    </StyledButton>
  );
}

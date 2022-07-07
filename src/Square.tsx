import React from "react";
import styled from "styled-components";

import { NullablePlayer } from "./types";

const StyledButton = styled.button`
  background: #fff;
  border: 1px solid #999;
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

  &:focus {
    outline: none;
  }

  .kbd-navigation &:focus {
    background: #ddd;
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
    <StyledButton
      type="button"
      onClick={onClick}
      style={bold ? { color: "green" } : {}}
    >
      {value}
    </StyledButton>
  );
}

import React from "react";

import { NullablePlayer } from "./types";

import "./Square.css";

interface SquareProps {
  value: NullablePlayer;
  bold: boolean;
  onClick: () => void;
}

export default function Square(props: SquareProps) {
  const { bold, onClick, value } = props;

  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
      style={bold ? { color: "green" } : {}}
    >
      {value}
    </button>
  );
}

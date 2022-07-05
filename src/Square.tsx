import React from "react";

import { NullablePlayer } from "./types";

import "./Square.css";

interface SquareProps {
  value: NullablePlayer;
  bold: boolean;
  onClick: () => void;
}

export function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={props.bold ? { color: "green" } : {}}
    >
      {props.value}
    </button>
  );
}

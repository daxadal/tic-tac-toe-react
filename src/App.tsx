import React from "react";
import { ThemeProvider } from "styled-components";

import Game from "./Game";

const lightTheme = {
  background: "#fff",
  foreground: "#ddd",
  border: "#999",
  text: "#000",
};
const darkTheme = {
  background: "#111",
  foreground: "#333",
  border: "#aaa",
  text: "#eee",
};

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Game />
    </ThemeProvider>
  );
}

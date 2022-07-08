import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

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

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.border};
    color: ${(props) => props.theme.text};
  }

  body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;
  }
  
  ol,
  ul {
    padding-left: 30px;
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Game />
    </ThemeProvider>
  );
}

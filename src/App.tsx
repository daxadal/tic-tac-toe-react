import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import Game from "./components/Game";
import { lightTheme } from "./themes";

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
      <Normalize />
      <GlobalStyle />
      <Game />
    </ThemeProvider>
  );
}

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    foreground: string;
    border: string;
    text: string;
  }
}

export const lightTheme = {
  background: "#fff",
  foreground: "#ddd",
  border: "#999",
  text: "#000",
};

export const darkTheme = {
  background: "#111",
  foreground: "#333",
  border: "#aaa",
  text: "#eee",
};

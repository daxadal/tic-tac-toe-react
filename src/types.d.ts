export type Player = "X" | "O";
export type NullablePlayer = Player | null;
export type Squares = NullablePlayer[];

export interface HistoryItem {
  squares: Squares;
  indexClicked: number;
}

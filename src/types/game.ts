export interface GameCard {
  readonly id: number;
  readonly name: string;
  readonly genre: string;
  readonly topPlayer: string;
}
export type GameInput = Omit<GameCard, "id">;
export interface Favourite {
  readonly id: number;
  readonly gameId: number;
}

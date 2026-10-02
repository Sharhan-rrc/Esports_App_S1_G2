export interface GameCard {
  id: number;
  name: string;
  genre: string;
  topPlayer: string;
}

export interface LiveStream {
  id: number;
  title: string;
  game: string;
  platform: string;
}
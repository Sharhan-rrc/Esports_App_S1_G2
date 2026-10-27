export const streamPlatforms = ["YouTube", "Twitch"] as const;
export interface Stream {
  readonly id: number;
  readonly title: string;
  readonly gameId: number;
  readonly platform: typeof streamPlatforms[number];
}
export interface StreamInput {
  title: string;
  gameId: string;
  platform: string;
}

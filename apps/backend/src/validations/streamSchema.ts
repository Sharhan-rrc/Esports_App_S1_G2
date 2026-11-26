import { z } from "zod";
export const streamSchema = z.object({ gameId: z.number().int().positive().max(2147483647), title: z.string().trim().min(1).max(100), platform: z.enum(["YouTube", "Twitch"]) }).strict();
export type StreamInput = z.infer<typeof streamSchema>;

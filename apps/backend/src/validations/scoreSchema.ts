import { z } from "zod";
export const scoreSchema = z.object({
  game: z.string().trim().min(1).max(60),
  name: z.string().trim().min(3).max(39),
  score: z.number().int().safe().min(501),
}).strict();
export type ScoreInput = z.infer<typeof scoreSchema>;

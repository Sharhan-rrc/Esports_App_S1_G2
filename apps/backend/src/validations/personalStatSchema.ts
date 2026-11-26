import { z } from "zod";
export const personalStatSchema = z.object({ name: z.string().trim().min(1).max(80), hoursPlayed: z.number().finite().min(0), highestScore: z.number().int().safe().min(0), rank: z.string().trim().min(1).max(40) }).strict();
export type PersonalStatInput = z.infer<typeof personalStatSchema>;

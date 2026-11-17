import { Router } from "express";
import { z } from "zod";
import { validate, empty, idParams } from "../middleware/validate.js";
import { listGames, createGame, deleteGame } from "../controllers/gameController.js";
const gameSchema = z.object({ name: z.string().trim().min(1).max(60), genre: z.string().trim().min(1).max(80), topPlayer: z.string().trim().min(1).max(80) }).strict();
export const gameRoutes = Router();
gameRoutes.get("/", validate(), listGames);
gameRoutes.post("/", validate(gameSchema), createGame);
gameRoutes.delete("/:id", validate(empty, idParams), deleteGame);

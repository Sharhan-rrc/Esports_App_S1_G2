import { Router } from "express";
import { validate, empty, idParams } from "../middleware/validate.js";
import { scoreSchema } from "../validations/scoreSchema.js";
import { listScores, createScore, updateScore, deleteScore } from "../controllers/scoreController.js";
export const scoreRoutes = Router();
scoreRoutes.get("/", validate(), listScores);
scoreRoutes.post("/", validate(scoreSchema), createScore);
scoreRoutes.put("/:id", validate(scoreSchema, idParams), updateScore);
scoreRoutes.delete("/:id", validate(empty, idParams), deleteScore);

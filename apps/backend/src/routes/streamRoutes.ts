import { Router } from "express";
import { validate,empty,idParams } from "../middleware/validate.js";
import { streamSchema } from "../validations/streamSchema.js";
import { listStream,createStream,updateStream,deleteStream } from "../controllers/streamController.js";
export const streamRoutes=Router();
streamRoutes.get("/",validate(),listStream);
streamRoutes.post("/",validate(streamSchema),createStream);
streamRoutes.put("/:id",validate(streamSchema,idParams),updateStream);
streamRoutes.delete("/:id",validate(empty,idParams),deleteStream);

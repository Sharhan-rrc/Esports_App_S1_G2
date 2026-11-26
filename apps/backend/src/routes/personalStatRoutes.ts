import { Router } from "express";
import { validate,empty,idParams } from "../middleware/validate.js";
import { personalStatSchema } from "../validations/personalStatSchema.js";
import { listPersonalStat,createPersonalStat,updatePersonalStat,deletePersonalStat } from "../controllers/personalStatController.js";
export const personalStatRoutes=Router();
personalStatRoutes.get("/",validate(),listPersonalStat);
personalStatRoutes.post("/",validate(personalStatSchema),createPersonalStat);
personalStatRoutes.put("/:id",validate(personalStatSchema,idParams),updatePersonalStat);
personalStatRoutes.delete("/:id",validate(empty,idParams),deletePersonalStat);

import type { RequestHandler } from "express";
import { z } from "zod";
export const empty = z.object({}).strict();
export const idParams = z.object({ id: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER) }).strict();
export function validate(body = empty, params: z.ZodType = empty): RequestHandler {
  return (req, res, next) => {
    const result = z.object({ body, params, query: empty }).safeParse({ body: req.body ?? {}, params: req.params, query: req.query });
    if (!result.success) { res.status(400).json({ message: result.error.issues.map(issue => issue.message).join(" ") }); return; }
    res.locals.input = result.data; next();
  };
}

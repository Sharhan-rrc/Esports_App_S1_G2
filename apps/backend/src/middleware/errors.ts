import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
export const errors: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next;
  if (error instanceof HttpError) { res.status(error.status).json({ message: error.message }); return; }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") { res.status(409).json({ message: "This record already exists." }); return; }
    if (error.code === "P2025") { res.status(404).json({ message: "This record no longer exists." }); return; }
    if (error.code === "P2003") { res.status(409).json({ message: "This game is still used by other records." }); return; }
  }
  if (error instanceof SyntaxError && "body" in error) { res.status(400).json({ message: "Send valid JSON." }); return; }
  console.error(error); res.status(500).json({ message: "Unable to complete this request. Please try again." });
};

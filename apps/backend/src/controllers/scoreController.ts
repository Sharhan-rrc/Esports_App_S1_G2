import type { RequestHandler } from "express";
import { scoreService } from "../services/scoreService.js";
export const listScores: RequestHandler = async (_req, res) => { res.json(await scoreService.list()); };
export const createScore: RequestHandler = async (_req, res) => { res.status(201).json(await scoreService.create(res.locals.input.body)); };
export const updateScore: RequestHandler = async (_req, res) => { res.json(await scoreService.update(res.locals.input.params.id, res.locals.input.body)); };
export const deleteScore: RequestHandler = async (_req, res) => { await scoreService.remove(res.locals.input.params.id); res.status(204).end(); };

import type { RequestHandler } from "express";
import { gameService } from "../services/gameService.js";
export const listGames: RequestHandler = async (_req, res) => { res.json(await gameService.list()); };
export const createGame: RequestHandler = async (_req, res) => { res.status(201).json(await gameService.create(res.locals.input.body)); };
export const deleteGame: RequestHandler = async (_req, res) => { await gameService.remove(res.locals.input.params.id); res.status(204).end(); };

import type { RequestHandler } from "express";
import { personalStatService } from "../services/personalStatService.js";
export const listPersonalStat:RequestHandler = async (_req,res) => { res.json(await personalStatService.list()); };
export const createPersonalStat:RequestHandler = async (_req,res) => { res.status(201).json(await personalStatService.create(res.locals.input.body)); };
export const updatePersonalStat:RequestHandler = async (_req,res) => { res.json(await personalStatService.update(res.locals.input.params.id,res.locals.input.body)); };
export const deletePersonalStat:RequestHandler = async (_req,res) => { await personalStatService.remove(res.locals.input.params.id);res.status(204).end(); };

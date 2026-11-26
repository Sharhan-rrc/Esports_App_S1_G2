import type { RequestHandler } from "express";
import { streamService } from "../services/streamService.js";
export const listStream:RequestHandler = async (_req,res) => { res.json(await streamService.list()); };
export const createStream:RequestHandler = async (_req,res) => { res.status(201).json(await streamService.create(res.locals.input.body)); };
export const updateStream:RequestHandler = async (_req,res) => { res.json(await streamService.update(res.locals.input.params.id,res.locals.input.body)); };
export const deleteStream:RequestHandler = async (_req,res) => { await streamService.remove(res.locals.input.params.id);res.status(204).end(); };

import "dotenv/config";
import express from "express";
import cors from "cors";
import { errors } from "./middleware/errors.js";
import { scoreRoutes } from "./routes/scoreRoutes.js";
import { gameRoutes } from "./routes/gameRoutes.js";
const app = express();
const origins = (process.env.FRONTEND_URL || "http://localhost:5173").split(",").map(value => value.trim());
app.use((req, res, next) => {
  const origin = req.get("Origin");
  if (origin && !origins.includes(origin)) { res.status(403).json({ message: "Origin is not allowed." }); return; }
  next();
});
app.use(cors({ origin: origins, methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }));
app.use(express.json({ limit: "32kb" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/v1/games", gameRoutes);
app.use("/api/v1/scores", scoreRoutes);
app.use((_req, res) => res.status(404).json({ message: "Endpoint not found." }));
app.use(errors);
export default app;

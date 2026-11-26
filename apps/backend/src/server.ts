import "dotenv/config";
import app from "./app.js";
import { prisma } from "./db.js";
const server = app.listen(Number(process.env.PORT || 3000), () => console.log("API listening on port", process.env.PORT || 3000));
async function shutdown() { server.close(); await prisma.$disconnect(); }
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

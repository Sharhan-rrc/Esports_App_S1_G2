import { spawn } from "node:child_process";
const children = ["dev:frontend", "dev:backend"].map(script => spawn(
  process.platform === "win32" ? "npm.cmd" : "npm", ["run", script],
  { stdio: "inherit", shell: process.platform === "win32" },
));
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}
for (const child of children) {
  child.on("error", error => { console.error(error); stop(1); });
  child.on("exit", code => { if (!stopping) stop(code || 0); });
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());

/* global process */

import { spawn } from "node:child_process";

const port = process.env.PORT || 3001;
const command =
  process.platform === "win32" ? "npx.cmd" : "npx";

const server = spawn(
  command,
  [
    "json-server",
    "db.json",
    "--host",
    "0.0.0.0",
    "--port",
    String(port)
  ],
  {
    stdio: "inherit",
    shell: true
  }
);

server.on("exit", (code) => {
  process.exit(code ?? 0);
});



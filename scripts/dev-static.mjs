
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL("../dist/client/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".png":"image/png", ".svg":"image/svg+xml" };

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const clean = pathname.replace(/^\//, "").replace(/\/$/, "");
  const relative = pathname === "/" ? "index.html" : extname(clean) ? clean : `${clean}/index.html`;
  try {
    const file = await readFile(join(root, relative));
    response.writeHead(200, { "content-type": types[extname(relative)] || "application/octet-stream" });
    response.end(file);
  } catch {
    response.writeHead(404, { "content-type":"text/plain" });
    response.end("Not found");
  }
}).listen(4173, "127.0.0.1", () => console.log("Local URL: http://127.0.0.1:4173"));


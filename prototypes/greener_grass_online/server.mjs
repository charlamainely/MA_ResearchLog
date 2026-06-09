import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  GENERATIONS,
  addPlayerToRoom,
  applyAction,
  buildRoomSnapshot,
  createRoomState,
  loadContentFromDirectory
} from "./shared/game-core.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const ROOM_IDLE_MS = 60 * 60 * 1000;
const ROOM_FINISHED_MS = 60 * 60 * 1000;

const content = await loadContentFromDirectory(path.join(__dirname, "data"));
const rooms = new Map();
const streams = new Map();

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function notFound(res) {
  json(res, 404, { error: "Not found." });
}

function badRequest(res, message) {
  json(res, 400, { error: message });
}

function getRoom(code) {
  return rooms.get(String(code || "").trim().toUpperCase()) || null;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function ensureRoomStreamSet(code) {
  const key = String(code || "").trim().toUpperCase();
  if (!streams.has(key)) {
    streams.set(key, new Set());
  }
  return streams.get(key);
}

async function appendRoomLog(room, entry) {
  const line = JSON.stringify(entry) + "\n";
  const logPath = path.join(__dirname, "logs", `room-${room.code}.jsonl`);
  await fs.appendFile(logPath, line, "utf8");
}

async function broadcastRoom(room) {
  const snapshot = buildRoomSnapshot(room, content);
  const payload = `event: snapshot\ndata: ${JSON.stringify(snapshot)}\n\n`;
  const listeners = ensureRoomStreamSet(room.code);
  const closed = [];
  for (const res of listeners) {
    try {
      res.write(payload);
    } catch {
      closed.push(res);
    }
  }
  closed.forEach((res) => listeners.delete(res));
  const startIndex = typeof room._persistedLogIndex === "number" ? room._persistedLogIndex : 0;
  const pendingLogs = room.log.slice(startIndex);
  for (const entry of pendingLogs) {
    await appendRoomLog(room, entry);
  }
  room._persistedLogIndex = room.log.length;
}

async function mutateRoom(code, mutator) {
  const room = getRoom(code);
  if (!room) {
    throw new Error("Room not found.");
  }
  await mutator(room);
  rooms.set(room.code, room);
  await broadcastRoom(room);
  return room;
}

function validatePlayerInput(payload) {
  const name = String(payload.name || "").trim();
  const generation = String(payload.generation || "").trim();
  if (!name) {
    throw new Error("Please enter a nickname.");
  }
  if (!GENERATIONS[generation]) {
    throw new Error("Please pick a generation.");
  }
  return { name, generation };
}

function roomSummary(room) {
  return {
    code: room.code,
    status: room.status,
    players: room.players.map((player) => ({
      id: player.id,
      name: player.name,
      generation: player.generation
    }))
  };
}

async function serveStatic(req, res) {
  let requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  if (requestPath === "/") {
    requestPath = "/index.html";
  }
  const fullPath = path.normalize(path.join(__dirname, requestPath));
  if (!fullPath.startsWith(__dirname)) {
    notFound(res);
    return;
  }
  try {
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      notFound(res);
      return;
    }
    const ext = path.extname(fullPath).toLowerCase();
    const types = {
      ".html": "text/html; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".mjs": "application/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".csv": "text/csv; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".woff": "font/woff",
      ".woff2": "font/woff2"
    };
    const data = await fs.readFile(fullPath);
    res.writeHead(200, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=60"
    });
    res.end(data);
  } catch {
    notFound(res);
  }
}

setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms.entries()) {
    const expiry = room.status === "finished" ? ROOM_FINISHED_MS : ROOM_IDLE_MS;
    if (now - room.lastActivityAt > expiry) {
      rooms.delete(code);
      streams.delete(code);
    }
  }
}, 60 * 1000);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    if (req.method === "GET" && pathname === "/api/meta") {
      json(res, 200, {
        title: "Greener Grass Online MVP",
        generations: GENERATIONS
      });
      return;
    }

    if (req.method === "POST" && pathname === "/api/rooms") {
      const payload = validatePlayerInput(await readBody(req));
      const room = createRoomState(content, payload);
      rooms.set(room.code, room);
      await broadcastRoom(room);
      json(res, 200, {
        room: roomSummary(room),
        playerId: room.players[0].id
      });
      return;
    }

    const joinMatch = pathname.match(/^\/api\/rooms\/([A-Z0-9]+)\/join$/i);
    if (req.method === "POST" && joinMatch) {
      const code = joinMatch[1].toUpperCase();
      const payload = validatePlayerInput(await readBody(req));
      const room = getRoom(code);
      if (!room) {
        badRequest(res, "Room code not found.");
        return;
      }
      const player = addPlayerToRoom(room, content, payload);
      await broadcastRoom(room);
      json(res, 200, {
        room: roomSummary(room),
        playerId: player.id
      });
      return;
    }

    const stateMatch = pathname.match(/^\/api\/rooms\/([A-Z0-9]+)\/state$/i);
    if (req.method === "GET" && stateMatch) {
      const room = getRoom(stateMatch[1]);
      if (!room) {
        badRequest(res, "Room code not found.");
        return;
      }
      json(res, 200, buildRoomSnapshot(room, content));
      return;
    }

    const eventsMatch = pathname.match(/^\/api\/rooms\/([A-Z0-9]+)\/events$/i);
    if (req.method === "GET" && eventsMatch) {
      const room = getRoom(eventsMatch[1]);
      if (!room) {
        badRequest(res, "Room code not found.");
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
      });
      res.write("\n");
      const listeners = ensureRoomStreamSet(room.code);
      listeners.add(res);
      res.write(`event: snapshot\ndata: ${JSON.stringify(buildRoomSnapshot(room, content))}\n\n`);
      req.on("close", () => {
        listeners.delete(res);
      });
      return;
    }

    const actionMatch = pathname.match(/^\/api\/rooms\/([A-Z0-9]+)\/actions$/i);
    if (req.method === "POST" && actionMatch) {
      const code = actionMatch[1].toUpperCase();
      const payload = await readBody(req);
      const room = await mutateRoom(code, async (currentRoom) => {
        applyAction(currentRoom, content, payload);
      });
      json(res, 200, {
        ok: true,
        room: roomSummary(room)
      });
      return;
    }

    await serveStatic(req, res);
  } catch (error) {
    badRequest(res, error instanceof Error ? error.message : "Unexpected server error.");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Greener Grass Online MVP running at http://0.0.0.0:${PORT}`);
  console.log(`Open on your own machine: http://localhost:${PORT}`);
});

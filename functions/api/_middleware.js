// functions/api/_middleware.js
// Menyediakan helper bersama + gerbang autentikasi untuk seluruh /api/*

const PUBLIC_PATHS = new Set(["/api/login"]);
const SESSION_TTL = 60 * 60 * 24 * 30; // 30 hari

function readCookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function makeStore(env) {
  return {
    async list(collection) {
      const raw = await env.DASH_KV.get("col:" + collection);
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },
    async save(collection, items) {
      await env.DASH_KV.put("col:" + collection, JSON.stringify(items));
      return items;
    },
  };
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  context.data.json = json;
  context.data.store = makeStore(env);
  context.data.SESSION_TTL = SESSION_TTL;

  if (PUBLIC_PATHS.has(url.pathname)) return next();

  const token = readCookie(request, "gf_session");
  if (!token) return json({ error: "unauthorized" }, 401);

  const valid = await env.DASH_KV.get("session:" + token);
  if (!valid) return json({ error: "unauthorized" }, 401);

  context.data.token = token;
  return next();
}

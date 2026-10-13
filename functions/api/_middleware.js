// functions/api/_middleware.js
// Helper bersama + gerbang autentikasi untuk endpoint dashboard.
// Endpoint situs publik lain (mis. /api/brief) sengaja dibiarkan lewat.

const OWNER_PATHS = new Set([
  "/api/files",
  "/api/file",
]);
const OWNER_PREFIXES = ["/api/data/"];

const SHARED_PATHS = new Set(["/api/session"]);
const CECE_PREFIXES = ["/api/cece/"];

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

function classify(pathname) {
  if (OWNER_PATHS.has(pathname)) return "owner";
  if (OWNER_PREFIXES.some((p) => pathname.startsWith(p))) return "owner";
  if (CECE_PREFIXES.some((p) => pathname.startsWith(p))) return "shared";
  if (SHARED_PATHS.has(pathname)) return "shared";
  return "public";
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  context.data.json = json;
  context.data.SESSION_TTL = SESSION_TTL;
  if (env.DASH_KV) context.data.store = makeStore(env);

  const need = classify(url.pathname);
  if (need === "public") return next();

  if (!env.DASH_KV) return json({ error: "kv_not_bound" }, 500);

  const token = readCookie(request, "gf_session");
  if (!token) return json({ error: "unauthorized" }, 401);

  const raw = await env.DASH_KV.get("session:" + token);
  if (!raw) return json({ error: "unauthorized" }, 401);

  let role = "owner";
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.role) role = parsed.role;
  } catch {
    // Sesi lama tersimpan sebagai angka biasa — perlakukan sebagai pemilik.
  }

  if (need === "owner" && role !== "owner") {
    return json({ error: "forbidden" }, 403);
  }

  context.data.token = token;
  context.data.role = role;
  return next();
}

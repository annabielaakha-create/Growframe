// functions/api/data/[col].js
// Satu endpoint generik untuk seluruh koleksi dashboard.
// GET  /api/data/<col>  -> array
// PUT  /api/data/<col>  -> simpan array utuh
const ALLOWED = new Set([
  "projects",
  "tasks",
  "notes",
  "clips",
  "prompts",
  "assets",
  "finance",
  "settings",
]);

const MAX_BYTES = 20 * 1024 * 1024; // batas aman per koleksi di KV (25 MB)

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function keyFor(params) {
  const col = Array.isArray(params.col) ? params.col[0] : params.col;
  return ALLOWED.has(col) ? "col:" + col : null;
}

export async function onRequestGet({ params, env }) {
  const key = keyFor(params);
  if (!key) return json({ error: "unknown_collection" }, 404);

  const raw = await env.DASH_KV.get(key);
  if (!raw) return json(key === "col:settings" ? {} : []);
  try {
    return json(JSON.parse(raw));
  } catch {
    return json(key === "col:settings" ? {} : []);
  }
}

export async function onRequestPut({ params, request, env }) {
  const key = keyFor(params);
  if (!key) return json({ error: "unknown_collection" }, 404);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_json" }, 400);
  }

  const isSettings = key === "col:settings";
  const shapeOk = isSettings
    ? body && typeof body === "object" && !Array.isArray(body)
    : Array.isArray(body);
  if (!shapeOk) return json({ error: "bad_shape" }, 400);

  const payload = JSON.stringify(body);
  if (payload.length > MAX_BYTES) return json({ error: "too_large" }, 413);

  await env.DASH_KV.put(key, payload);
  return json({ ok: true, count: isSettings ? 1 : body.length });
}

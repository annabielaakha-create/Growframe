// functions/api/cece/sheet.js
// Proxy ke Apps Script. Token jembatan tidak pernah sampai ke browser.

const TIMEOUT_MS = 20000;

function endpoint(env) {
  const url = env.CECE_SHEET_URL, token = env.CECE_SHEET_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\?.*$/, ""), token };
}

async function callScript(env, params) {
  const cfg = endpoint(env);
  if (!cfg) return { error: "sheet_not_configured" };

  const qs = new URLSearchParams({ token: cfg.token, ...params });
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(cfg.url + "?" + qs.toString(), {
      method: "GET",
      redirect: "follow",
      signal: ctrl.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    return { error: "bridge_unreachable", detail: String(err) };
  }
  clearTimeout(timer);

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    // Apps Script yang belum di-deploy ulang biasanya mengembalikan HTML login.
    return { error: "bridge_bad_response", status: res.status };
  }
}

export async function onRequestGet({ env, data }) {
  const result = await callScript(env, { action: "read" });
  return data.json(result, result.error ? 502 : 200);
}

export async function onRequestPost({ request, env, data }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return data.json({ error: "bad_json" }, 400);
  }

  const edits = Array.isArray(body.edits) ? body.edits : [];
  if (!edits.length) return data.json({ error: "no_edits" }, 400);
  if (edits.length > 40) return data.json({ error: "too_many_edits" }, 413);

  const clean = edits.map((e) => ({
    tab: String(e.tab || "").slice(0, 120),
    row: Number(e.row) || 0,
    col: Number(e.col) || 0,
    value: String(e.value == null ? "" : e.value).slice(0, 1000),
  }));

  const result = await callScript(env, {
    action: "update",
    edits: JSON.stringify(clean),
  });
  return data.json(result, result.error ? 502 : 200);
}

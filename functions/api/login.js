// functions/api/login.js
// Dua akun: pemilik (HAN) dan klien (Cece). Masing-masing punya perannya.

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function onRequestPost(context) {
  const { request, env, data } = context;
  const { json, SESSION_TTL } = data;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  if (!env.DASH_KV) return json({ error: "server_not_configured" }, 500);

  const given = typeof body.password === "string" ? body.password : "";

  // Urutan penting: akun pemilik diperiksa lebih dulu.
  const accounts = [
    { role: "owner", secret: env.DASH_PASSWORD, home: "/dash/" },
    { role: "cece", secret: env.CECE_PASSWORD, home: "/dash/cece/" },
  ].filter((a) => !!a.secret);

  if (!accounts.length) return json({ error: "server_not_configured" }, 500);

  const matched = accounts.find((a) => timingSafeEqual(given, a.secret));
  if (!matched) return json({ error: "invalid" }, 401);

  const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "");
  await env.DASH_KV.put(
    "session:" + token,
    JSON.stringify({ role: matched.role, at: Date.now() }),
    { expirationTtl: SESSION_TTL }
  );

  const cookie = [
    "gf_session=" + token,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=" + SESSION_TTL,
  ].join("; ");

  return json({ ok: true, role: matched.role, home: matched.home }, 200, {
    "Set-Cookie": cookie,
  });
}

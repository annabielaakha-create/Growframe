// functions/api/login.js
export async function onRequestPost(context) {
  const { request, env, data } = context;
  const { json, SESSION_TTL } = data;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const expected = env.DASH_PASSWORD;
  if (!expected) return json({ error: "server_not_configured" }, 500);

  const given = typeof body.password === "string" ? body.password : "";
  if (given.length !== expected.length) {
    return json({ error: "invalid" }, 401);
  }
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (diff !== 0) return json({ error: "invalid" }, 401);

  const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "");
  await env.DASH_KV.put("session:" + token, String(Date.now()), {
    expirationTtl: SESSION_TTL,
  });

  const cookie = [
    "gf_session=" + token,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=" + SESSION_TTL,
  ].join("; ");

  return json({ ok: true }, 200, { "Set-Cookie": cookie });
}

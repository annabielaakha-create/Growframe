// functions/api/session.js
export async function onRequestGet(context) {
  return context.data.json({ ok: true });
}

export async function onRequestDelete(context) {
  const { env, data } = context;
  if (data.token) await env.DASH_KV.delete("session:" + data.token);
  const cookie = "gf_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
  return data.json({ ok: true }, 200, { "Set-Cookie": cookie });
}

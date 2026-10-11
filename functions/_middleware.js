// functions/_middleware.js
// Gerbang halaman privat. Semua URL di bawah /dash/ hanya bisa dibuka
// kalau cookie sesi valid. Tambah file HTML baru ke folder dash/ —
// otomatis ikut terlindungi, tanpa perlu mengubah file ini.

const PROTECTED_PREFIX = "/dash";

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

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  const isProtected =
    url.pathname === PROTECTED_PREFIX ||
    url.pathname.startsWith(PROTECTED_PREFIX + "/");

  if (!isProtected) return next();

  const token = readCookie(request, "gf_session");
  const valid = token ? await env.DASH_KV.get("session:" + token) : null;

  if (!valid) {
    const to = new URL("/login", url.origin);
    to.searchParams.set("next", url.pathname);
    return Response.redirect(to.toString(), 302);
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

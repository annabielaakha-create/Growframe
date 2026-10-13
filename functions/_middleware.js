// functions/_middleware.js
// Gerbang halaman privat.
//   /dash/cece/*  → pemilik dan Cece
//   /dash/*       → pemilik saja
// File HTML baru di bawah folder itu otomatis ikut terlindungi.

const PROTECTED_PREFIX = "/dash";
const CECE_PREFIX = "/dash/cece";

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

function redirectToLogin(url) {
  const to = new URL("/login", url.origin);
  to.searchParams.set("next", url.pathname);
  return Response.redirect(to.toString(), 302);
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  const isProtected =
    path === PROTECTED_PREFIX || path.startsWith(PROTECTED_PREFIX + "/");
  if (!isProtected) return next();

  if (!env.DASH_KV) {
    return new Response(
      "Binding DASH_KV belum dipasang di Cloudflare Pages. Lihat SETUP.md.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const token = readCookie(request, "gf_session");
  const raw = token ? await env.DASH_KV.get("session:" + token) : null;
  if (!raw) return redirectToLogin(url);

  let role = "owner";
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.role) role = parsed.role;
  } catch {
    // Sesi lama berformat angka — perlakukan sebagai pemilik.
  }

  const isCeceArea = path === CECE_PREFIX || path.startsWith(CECE_PREFIX + "/");

  if (role === "cece" && !isCeceArea) {
    return Response.redirect(new URL("/dash/cece/", url.origin).toString(), 302);
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

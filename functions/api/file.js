// functions/api/file.js — unduh satu file dari R2 (butuh sesi login)
export async function onRequestGet({ request, env, data }) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key || !key.startsWith("uploads/")) return data.json({ error: "bad_key" }, 400);

  const object = await env.R2_BUCKET.get(key);
  if (!object) return data.json({ error: "not_found" }, 404);

  const name = (object.customMetadata && object.customMetadata.name) || key.slice(8);
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "private, max-age=0, no-store");
  headers.set(
    "Content-Disposition",
    (url.searchParams.get("inline") ? "inline" : "attachment") +
      '; filename="' + name.replace(/"/g, "") + '"'
  );

  return new Response(object.body, { headers });
}

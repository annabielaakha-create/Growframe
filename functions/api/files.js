// functions/api/files.js — upload/list/hapus file di R2 (transfer iPad ⇄ Windows)
const PREFIX = "uploads/";

function safeName(name) {
  return (name || "file")
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "file";
}

export async function onRequestGet({ env, data }) {
  const listed = await env.R2_BUCKET.list({
    prefix: PREFIX,
    include: ["customMetadata"],
    limit: 1000,
  });

  const files = listed.objects
    .map((obj) => ({
      key: obj.key,
      name: (obj.customMetadata && obj.customMetadata.name) || obj.key.slice(PREFIX.length),
      size: obj.size,
      uploaded: obj.uploaded,
    }))
    .sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));

  return data.json(files);
}

export async function onRequestPut({ request, env, data }) {
  const url = new URL(request.url);
  const name = safeName(url.searchParams.get("name"));
  const key = PREFIX + Date.now() + "-" + name;

  if (!request.body) return data.json({ error: "empty_body" }, 400);

  await env.R2_BUCKET.put(key, request.body, {
    httpMetadata: {
      contentType: request.headers.get("Content-Type") || "application/octet-stream",
    },
    customMetadata: { name },
  });

  const head = await env.R2_BUCKET.head(key);
  return data.json(
    {
      key,
      name,
      size: head ? head.size : null,
      uploaded: head ? head.uploaded : new Date().toISOString(),
    },
    201
  );
}

export async function onRequestDelete({ request, env, data }) {
  const key = new URL(request.url).searchParams.get("key");
  if (!key || !key.startsWith(PREFIX)) return data.json({ error: "bad_key" }, 400);
  await env.R2_BUCKET.delete(key);
  return data.json({ ok: true });
}

// functions/api/assets.js — pustaka link aset (SFX, logo, transisi, LUT, font, dll)
const COLLECTION = "assets";

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function onRequestGet({ data }) {
  return data.json(await data.store.list(COLLECTION));
}

export async function onRequestPost({ request, data }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return data.json({ error: "bad_request" }, 400);
  }

  const label = clean(body.label, 160);
  const url = clean(body.url, 2000);
  if (!label || !url) return data.json({ error: "missing_fields" }, 400);

  const item = {
    id: crypto.randomUUID(),
    label,
    url,
    category: clean(body.category, 60) || "Lainnya",
    note: clean(body.note, 500),
    createdAt: new Date().toISOString(),
  };

  const items = await data.store.list(COLLECTION);
  items.unshift(item);
  await data.store.save(COLLECTION, items);
  return data.json(item, 201);
}

export async function onRequestPut({ request, data }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return data.json({ error: "bad_request" }, 400);
  }

  const items = await data.store.list(COLLECTION);
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx === -1) return data.json({ error: "not_found" }, 404);

  for (const [field, max] of [
    ["label", 160],
    ["url", 2000],
    ["category", 60],
    ["note", 500],
  ]) {
    if (typeof body[field] === "string") items[idx][field] = clean(body[field], max);
  }

  await data.store.save(COLLECTION, items);
  return data.json(items[idx]);
}

export async function onRequestDelete({ request, data }) {
  const id = new URL(request.url).searchParams.get("id");
  const items = await data.store.list(COLLECTION);
  await data.store.save(COLLECTION, items.filter((i) => i.id !== id));
  return data.json({ ok: true });
}

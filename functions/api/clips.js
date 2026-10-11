// functions/api/clips.js — titipan copy-paste lintas device
const COLLECTION = "clips";
const MAX_ITEMS = 200;

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

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return data.json({ error: "empty" }, 400);
  if (text.length > 20000) return data.json({ error: "too_long" }, 413);

  const item = {
    id: crypto.randomUUID(),
    text,
    label: typeof body.label === "string" ? body.label.slice(0, 120) : "",
    pinned: false,
    createdAt: new Date().toISOString(),
  };

  const items = await data.store.list(COLLECTION);
  items.unshift(item);

  const pinned = items.filter((i) => i.pinned);
  const rest = items.filter((i) => !i.pinned).slice(0, MAX_ITEMS);
  await data.store.save(COLLECTION, [...pinned, ...rest]);

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

  if (typeof body.text === "string") items[idx].text = body.text;
  if (typeof body.label === "string") items[idx].label = body.label.slice(0, 120);
  if (typeof body.pinned === "boolean") items[idx].pinned = body.pinned;

  await data.store.save(COLLECTION, items);
  return data.json(items[idx]);
}

export async function onRequestDelete({ request, data }) {
  const id = new URL(request.url).searchParams.get("id");
  const items = await data.store.list(COLLECTION);

  if (id === "__all__") {
    await data.store.save(COLLECTION, items.filter((i) => i.pinned));
    return data.json({ ok: true });
  }

  await data.store.save(COLLECTION, items.filter((i) => i.id !== id));
  return data.json({ ok: true });
}

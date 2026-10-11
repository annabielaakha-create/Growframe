// functions/api/projects.js — project tracker
const COLLECTION = "projects";
const STATUSES = ["brief", "shoot", "edit", "review", "revisi", "selesai"];

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

  const name = clean(body.name, 200);
  if (!name) return data.json({ error: "missing_name" }, 400);

  const status = STATUSES.includes(body.status) ? body.status : "brief";

  const item = {
    id: crypto.randomUUID(),
    name,
    client: clean(body.client, 160),
    status,
    due: clean(body.due, 20),
    note: clean(body.note, 1000),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    ["name", 200],
    ["client", 160],
    ["due", 20],
    ["note", 1000],
  ]) {
    if (typeof body[field] === "string") items[idx][field] = clean(body[field], max);
  }
  if (STATUSES.includes(body.status)) items[idx].status = body.status;
  items[idx].updatedAt = new Date().toISOString();

  await data.store.save(COLLECTION, items);
  return data.json(items[idx]);
}

export async function onRequestDelete({ request, data }) {
  const id = new URL(request.url).searchParams.get("id");
  const items = await data.store.list(COLLECTION);
  await data.store.save(COLLECTION, items.filter((i) => i.id !== id));
  return data.json({ ok: true });
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type Site = {
  _id: string;
  address: string;
  title: string;
  body: string;
  author: string;
};

export type Visit = {
  _id: string;
  personName: string;
  address: string;
  via: string;
  visitedAt: string;
};

export type Person = {
  _id: string;
  name: string;
};

export async function fetchSite(address: string): Promise<{ found: boolean; site?: Site }> {
  const res = await fetch(`${BASE}/sites/${encodeURIComponent(address)}`);
  return res.json();
}

export async function searchSites(q: string): Promise<Site[]> {
  const res = await fetch(`${BASE}/sites?q=${encodeURIComponent(q)}`);
  return res.json();
}

export async function publishSite(data: Omit<Site, "_id">): Promise<Site> {
  const res = await fetch(`${BASE}/sites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchPersons(): Promise<Person[]> {
  const res = await fetch(`${BASE}/persons`);
  return res.json();
}

export async function fetchHistory(personName: string): Promise<Visit[]> {
  const res = await fetch(`${BASE}/visits/${encodeURIComponent(personName)}`);
  return res.json();
}

export async function recordVisit(data: {
  personName: string;
  address: string;
  via: string;
}): Promise<void> {
  await fetch(`${BASE}/visits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

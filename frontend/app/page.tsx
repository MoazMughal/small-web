"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchSite,
  fetchPersons,
  fetchHistory,
  recordVisit,
  searchSites,
  publishSite,
  Site,
  Visit,
  Person,
} from "./lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type HistoryEntry = { address: string; via: string };
type Tab = "browser" | "history" | "search" | "publish";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Browser() {
  // Person selection
  const [persons, setPersons] = useState<Person[]>([]);
  const [currentPerson, setCurrentPerson] = useState<string>("");

  // Navigation stack (mimics real browser back/forward)
  const stack = useRef<HistoryEntry[]>([]);
  const cursor = useRef<number>(-1);

  // Current page state
  const [address, setAddress] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [site, setSite] = useState<Site | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  // History panel
  const [history, setHistory] = useState<Visit[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Site[]>([]);
  const [searchDone, setSearchDone] = useState(false);

  // Publish
  const [pubAddress, setPubAddress] = useState("");
  const [pubTitle, setPubTitle] = useState("");
  const [pubBody, setPubBody] = useState("");
  const [pubDone, setPubDone] = useState(false);

  // Active tab
  const [tab, setTab] = useState<Tab>("browser");

  // Load persons on mount
  useEffect(() => {
    fetchPersons().then((list) => {
      setPersons(list);
      if (list.length > 0) setCurrentPerson(list[0].name);
    });
  }, []);

  // ─── Navigation ─────────────────────────────────────────────────────────────

  async function navigate(addr: string, via: string) {
    const clean = addr.trim().toLowerCase();
    if (!clean) return;

    setLoading(true);
    setNotFound(false);
    setSite(null);

    const result = await fetchSite(clean);
    setAddress(clean);
    setInputAddress(clean);
    setLoading(false);

    if (result.found && result.site) {
      setSite(result.site);
    } else {
      setNotFound(true);
    }

    // Push to stack, drop forward history
    cursor.current += 1;
    stack.current = stack.current.slice(0, cursor.current);
    stack.current.push({ address: clean, via });

    // Record visit in backend
    if (currentPerson) {
      await recordVisit({ personName: currentPerson, address: clean, via });
    }

    setTab("browser");
  }

  function goBack() {
    if (cursor.current <= 0) return;
    cursor.current -= 1;
    const entry = stack.current[cursor.current];
    navigateNoRecord(entry.address, "back");
  }

  function goForward() {
    if (cursor.current >= stack.current.length - 1) return;
    cursor.current += 1;
    const entry = stack.current[cursor.current];
    navigateNoRecord(entry.address, "forward");
  }

  async function navigateNoRecord(addr: string, via: string) {
    setLoading(true);
    setNotFound(false);
    setSite(null);
    const result = await fetchSite(addr);
    setAddress(addr);
    setInputAddress(addr);
    setLoading(false);
    if (result.found && result.site) setSite(result.site);
    else setNotFound(true);
    if (currentPerson) {
      await recordVisit({ personName: currentPerson, address: addr, via });
    }
  }

  // ─── Link clicks inside site HTML ────────────────────────────────────────────

  function handleSiteClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const href = target.getAttribute("href");
    if (!href || href.startsWith("http")) return;
    e.preventDefault();
    navigate(href, "link");
  }

  // ─── History panel ───────────────────────────────────────────────────────────

  async function openHistory() {
    if (currentPerson) {
      const h = await fetchHistory(currentPerson);
      setHistory(h);
    }
    setTab("history");
  }

  // ─── Search ──────────────────────────────────────────────────────────────────

  async function doSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const results = await searchSites(searchQuery);
    setSearchResults(results);
    setSearchDone(true);
  }

  // ─── Publish ─────────────────────────────────────────────────────────────────

  async function doPublish(e: React.FormEvent) {
    e.preventDefault();
    if (!pubAddress || !pubTitle || !pubBody || !currentPerson) return;
    await publishSite({ address: pubAddress, title: pubTitle, body: pubBody, author: currentPerson });
    setPubDone(true);
    setTimeout(() => {
      navigate(pubAddress, "typed");
      setPubDone(false);
      setPubAddress(""); setPubTitle(""); setPubBody("");
    }, 1200);
  }

  const canBack = cursor.current > 0;
  const canForward = cursor.current < stack.current.length - 1;

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100">

      {/* ── Chrome bar ── */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2 shadow-sm">

        {/* Back / Forward */}
        <button
          onClick={goBack}
          disabled={!canBack}
          title="Back"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-lg"
        >
          ←
        </button>
        <button
          onClick={goForward}
          disabled={!canForward}
          title="Forward"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-lg"
        >
          →
        </button>

        {/* Address bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); navigate(inputAddress, "typed"); }}
          className="flex-1"
        >
          <input
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            placeholder="Type an address, e.g. tidepool.zz"
            className="w-full border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono"
          />
        </form>

        {/* Nav tabs */}
        <button onClick={openHistory} className={`px-3 py-1.5 text-sm rounded ${tab === "history" ? "bg-gray-200" : "hover:bg-gray-100"}`}>History</button>
        <button onClick={() => setTab("search")} className={`px-3 py-1.5 text-sm rounded ${tab === "search" ? "bg-gray-200" : "hover:bg-gray-100"}`}>Search</button>
        <button onClick={() => setTab("publish")} className={`px-3 py-1.5 text-sm rounded ${tab === "publish" ? "bg-gray-200" : "hover:bg-gray-100"}`}>Publish</button>

        {/* Person picker */}
        <select
          value={currentPerson}
          onChange={(e) => setCurrentPerson(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-white"
        >
          {persons.map((p) => (
            <option key={p._id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 overflow-auto">

        {/* Browser tab */}
        {tab === "browser" && (
          <div className="max-w-3xl mx-auto mt-8 px-4">
            {!address && (
              <div className="text-center text-gray-400 mt-24">
                <p className="text-2xl mb-2">Small Web</p>
                <p className="text-sm">Type an address above to begin.</p>
                <p className="text-xs mt-4 text-gray-300">Try: tidepool.zz</p>
              </div>
            )}
            {loading && <p className="text-gray-400 text-center mt-24">Loading…</p>}
            {notFound && !loading && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm">
                <p className="text-gray-500 text-lg mb-1">Nothing at <span className="font-mono text-gray-700">{address}</span></p>
                <p className="text-gray-400 text-sm">This address does not exist in the small web.</p>
              </div>
            )}
            {site && !loading && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">{site.address}</span>
                  <span className="text-xs text-gray-400">by {site.author}</span>
                </div>
                {/* Site HTML rendered in a sandboxed div */}
                <div
                  className="px-8 py-6 prose prose-gray max-w-none site-content"
                  onClick={handleSiteClick}
                  dangerouslySetInnerHTML={{ __html: site.body }}
                />
              </div>
            )}
          </div>
        )}

        {/* History tab */}
        {tab === "history" && (
          <div className="max-w-2xl mx-auto mt-8 px-4">
            <h2 className="text-lg font-medium mb-4 text-gray-700">{currentPerson}&apos;s history</h2>
            {history.length === 0 && <p className="text-gray-400 text-sm">No history yet.</p>}
            <ul className="space-y-1">
              {history.map((v) => (
                <li key={v._id} className="flex items-center gap-3 bg-white rounded px-4 py-2 border border-gray-100 hover:bg-gray-50">
                  <button
                    onClick={() => navigate(v.address, "history")}
                    className="font-mono text-sm text-blue-600 hover:underline flex-1 text-left"
                  >
                    {v.address}
                  </button>
                  <span className="text-xs text-gray-400 w-16 text-right">{v.via}</span>
                  <span className="text-xs text-gray-300">{new Date(v.visitedAt).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Search tab */}
        {tab === "search" && (
          <div className="max-w-2xl mx-auto mt-8 px-4">
            <form onSubmit={doSearch} className="flex gap-2 mb-6">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the small web…"
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">Search</button>
            </form>
            {searchDone && searchResults.length === 0 && <p className="text-gray-400 text-sm">No results.</p>}
            <ul className="space-y-2">
              {searchResults.map((s) => (
                <li key={s._id} className="bg-white rounded border border-gray-100 px-4 py-3 hover:bg-gray-50">
                  <button onClick={() => navigate(s.address, "link")} className="text-left w-full">
                    <p className="font-medium text-gray-800">{s.title}</p>
                    <p className="font-mono text-xs text-blue-500 mt-0.5">{s.address}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Publish tab */}
        {tab === "publish" && (
          <div className="max-w-2xl mx-auto mt-8 px-4">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Publish a site</h2>
            {pubDone && <p className="text-green-500 text-sm mb-4">Published! Taking you there…</p>}
            <form onSubmit={doPublish} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input
                  value={pubAddress}
                  onChange={(e) => setPubAddress(e.target.value)}
                  placeholder="mysite.zz"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                  value={pubTitle}
                  onChange={(e) => setPubTitle(e.target.value)}
                  placeholder="My Site"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">HTML body</label>
                <textarea
                  value={pubBody}
                  onChange={(e) => setPubBody(e.target.value)}
                  placeholder="<p>Write your page here. You can use HTML.</p>"
                  required
                  rows={10}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <p className="text-xs text-gray-400">Publishing as: <span className="font-medium">{currentPerson}</span></p>
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded text-sm hover:bg-blue-600">Publish</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

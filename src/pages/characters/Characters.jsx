import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CardComponent from "../../components/CharacterCard";
import "./charachters.css";

function useDebounced(value, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value.trim()), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function Charachters() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounced(searchQuery, 350);

  const [items, setItems] = useState([]);   
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false);
  const abortRef = useRef(null);


  const firstUrl = useMemo(() => {
    const base = "https://rickandmortyapi.com/api/character/";
    return debouncedQuery ? `${base}?name=${encodeURIComponent(debouncedQuery)}&page=1`
                          : `${base}?page=1`;
  }, [debouncedQuery]);
  useEffect(() => {
    setItems([]);
    setNextUrl(firstUrl);
    setErr(null);
  }, [firstUrl]);

  const loadMore = useCallback(async () => {
    if (!nextUrl || isFetchingRef.current) return;

    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setErr(null);

      const res = await fetch(nextUrl, { signal: ac.signal });

      if (res.status === 404) {
        setNextUrl(null);
        if (items.length === 0) setItems([]);
        return;
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setItems(prev => [...prev, ...(data.results || [])]);
      setNextUrl(data.info?.next || null);
    } catch (e) {
      if (e.name !== "AbortError") setErr(e.message || "Network error");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [nextUrl, items.length]);

  useEffect(() => {
    if (nextUrl && items.length === 0 && !loading) {
      loadMore();
    }
  }, [nextUrl, items.length, loading, loadMore]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "600px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  return (
    <div className="home-page">
      <div className="search-form">
        <input
          type="text"
          placeholder="Search Your Favorite Character..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {err && <p style={{ color: "salmon" }}>Error: {err}</p>}

      <div className="char-grid">
        {items.map((item) => (
          <CardComponent key={item.id} item={item} />
        ))}
      </div>

      {!loading && items.length === 0 && nextUrl === null && (
        <p style={{ color: "#fff", textAlign: "center", marginTop: 16 }}>No results.</p>
      )}
      {loading && (
        <p style={{ color: "#fff", textAlign: "center", marginTop: 16 }}>Loading…</p>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}

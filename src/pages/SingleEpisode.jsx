// pages/SingleEpisode.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EpisodeCard from "../components/EpisodeCard";

const getIdFromUrl = (url) => url?.split("/").filter(Boolean).pop() ?? null;

const chunk = (arr, size) =>
  arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

export default function SingleEpisode() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // 1) Fetch same epizode
  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setErr(null);
    setEpisode(null);
    setCharacters([]);

    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => !cancel && setEpisode(data))
      .catch((e) => !cancel && setErr(e.message))
      .finally(() => !cancel && setLoading(false));

    return () => { cancel = true; };
  }, [id]);

  // 2) Kada epizoda stigne, batchem pokupi likove da prikažemo imena
  useEffect(() => {
    if (!episode?.characters?.length) return;

    const ids = episode.characters.map(getIdFromUrl).filter(Boolean);
    const groups = chunk(ids, 20); // sigurnije u chunkovima

    Promise.all(
      groups.map((g) =>
        fetch(`https://rickandmortyapi.com/api/character/${g.join(",")}`).then((r) => r.json())
      )
    )
      .then((parts) => {
        const flat = parts.flatMap((x) => (Array.isArray(x) ? x : [x]));
        setCharacters(flat.map((c) => ({ id: c.id, name: c.name })));
      })
      .catch(() => {
        // fallback: samo ID-jevi ako poziv padne
        setCharacters(ids.map((cid) => ({ id: Number(cid), name: `Character #${cid}` })));
      });
  }, [episode]);

  if (loading) return <div className="page-wrap"><p>Loading episode…</p></div>;
  if (err) return <div className="page-wrap"><p>Error: {err}</p></div>;
  if (!episode) return <div className="page-wrap"><p>Not found.</p></div>;

  return (
    <div className="page-wrap">
      <EpisodeCard episode={episode} characters={characters} />
    </div>
  );
}

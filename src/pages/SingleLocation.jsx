
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationCard from "../components/LocationCard.jsx";

const getIdFromUrl = (url) => url?.split("/").filter(Boolean).pop() ?? null;

export default function SingleLocation() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setErr(null);
    setLocation(null);
    setResidents([]);

    fetch(`https://rickandmortyapi.com/api/location/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => !cancel && setLocation(data))
      .catch((e) => !cancel && setErr(e.message))
      .finally(() => !cancel && setLoading(false));

    return () => { cancel = true; };
  }, [id]);
  
  useEffect(() => {
    if (!location?.residents?.length) return; 

    const ids = location.residents.map(getIdFromUrl).filter(Boolean);
    const idsParam = ids.join(",");

    fetch(`https://rickandmortyapi.com/api/character/${idsParam}`)
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [data];
        setResidents(arr.map((c) => ({ id: c.id, name: c.name })));
      })
      .catch(() => {
        setResidents(ids.map((rid) => ({ id: Number(rid), name: `Character #${rid}` })));
      });
  }, [location]);

  if (loading) return <div className="page-wrap"><p>Loading location…</p></div>;
  if (err) return <div className="page-wrap"><p>Error: {err}</p></div>;
  if (!location) return <div className="page-wrap"><p>Not found.</p></div>;

  return (
    <div className="page-wrap">
      <LocationCard location={location} residents={residents} />
    </div>
  );
}

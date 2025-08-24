import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SingleCharacterCard from "../../components/singleCharacterCard";

export default function SingleCharacter() {
  const { id } = useParams();
  const { state } = useLocation();
  const [item, setItem] = useState(state?.item || null);

  useEffect(() => {
    if (item) return;
    (async () => {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await res.json();
      setItem(data);
    })();
  }, [id, item]);

  if (!item) return <div className="singleCharCard">Loading…</div>;
  return <SingleCharacterCard item={item} />;
}

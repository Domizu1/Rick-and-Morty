import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingleChar.css";
const getIdFromUrl = (url) => url?.split("/").filter(Boolean).pop() ?? null;

function SingleCharacterCard({ item }) {
  const [episodes, setEpisodes] = useState([]);
  const locationId = getIdFromUrl(item?.location?.url);

  useEffect(() => {
    if (!item?.episode?.length) return;

    const ids = item.episode.map((url) => getIdFromUrl(url)).filter(Boolean).join(",");
    if (!ids) return;

    fetch(`https://rickandmortyapi.com/api/episode/${ids}`)
      .then((res) => res.json())
      .then((data) => setEpisodes(Array.isArray(data) ? data : [data]))
      .catch((err) => console.error("Error fetching episodes:", err));
  }, [item]); 

  return (
    <div className="singleCharCard">
      <div className="single-char-name">Character: {item.name}</div>

      <div>
        <img src={item.image} alt="Single Char" width="200" />
      </div>

      <div className="single-char-box1">
        <h2>{item.status}</h2>
        <h2>{item.species}</h2>
        <h2>{item.gender}</h2>
      </div>

      <div className="single-char-box2">
        <h3>ORIGIN: {item.origin?.name ?? "Unknown"}</h3>
      </div>

      <div className="single-char-box3">
        <span>LOCATION: </span>
        {locationId ? (
          <Link className="chip-link" to={`/location/${locationId}`}>
            {item.location.name}
          </Link>
        ) : (
          item.location?.name ?? "Unknown"
        )}
      </div>

      <div className="single-char-episodes">
        <h3>Episodes:</h3>
        <ul>
          {episodes.map((ep) => (
            <li key={ep.id}>
              <Link className="chip-link" to={`/episode/${ep.id}`}>
                {ep.episode} – {ep.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SingleCharacterCard;

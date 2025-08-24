import { useEffect, useState } from "react";
import './SingleChar.css'

function SingleCharacterCard({ item }) {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (!item.episode || item.episode.length === 0) return;

    const ids = item.episode.map(url => url.split("/").pop()).join(",");

    fetch(`https://rickandmortyapi.com/api/episode/${ids}`)
      .then(res => res.json())
      .then(data => {
        setEpisodes(Array.isArray(data) ? data : [data]);
      })
      .catch(err => console.error("Error fetching episodes:", err));
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
        <h3>ORIGIN: {item.origin.name}</h3>
      </div>
      <div className="single-char-box3">LOCATION: {item.location.name}</div>
      <div className="single-char-episodes">
        <h3>Episodes:</h3>
        <ul>
          {episodes.map(ep => (
            <li key={ep.id}>
              {ep.episode} – {ep.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default SingleCharacterCard;
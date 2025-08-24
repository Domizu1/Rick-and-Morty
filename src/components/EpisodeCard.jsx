
import { Link } from "react-router-dom";
import "./episodeCard.css";

export default function EpisodeCard({ episode, characters = [] }) {
  if (!episode) return null;

  return (
    <div className="episodeCard">
      <h1 className="page-title">{episode.name}</h1>

      <div className="epi-meta">
        <div><span>Episode:</span> {episode.episode || "—"}</div>
        <div><span>Air date:</span> {episode.air_date || "—"}</div>
        <div><span>Characters:</span> {characters.length}</div>
      </div>

      <div className="chips-wrap">
        {characters.length === 0 ? (
          <p>No known characters.</p>
        ) : (
          characters.map((c) => (
            <Link key={c.id} className="chip-link" to={`/character/${c.id}`}>
              {c.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

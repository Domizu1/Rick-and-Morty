import "./locationCard.css";
import { Link } from "react-router-dom";

export default function LocationCard({ location, residents = [] }) {
  if (!location) return null;

  return (
    <div className="locationCard">
      <h1 className="page-title">{location.name}</h1>

      <div className="loc-meta">
        <div><span>Type:</span> {location.type || "—"}</div>
        <div><span>Dimension:</span> {location.dimension || "—"}</div>
        <div><span>Residents:</span> {residents.length}</div>
      </div>

      <div className="chips-wrap">
        {residents.length === 0 ? (
          <p>No known residents.</p>
        ) : (
          residents.map((r) => (
            <Link key={r.id} className="chip-link" to={`/character/${r.id}`}>
              {r.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

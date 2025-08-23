import rickImg from "./rickAndmortylocation.jpg";

function EpisodeCard({ episodeInfo }) {
  return (
    <div className="episode-card">
      <div>
        <img src={episodeInfo.image} alt={episodeInfo.name} width="100" />
      </div>
      <div className="episode-info">
        <h2>{episodeInfo.name}</h2>
        <h3>{episodeInfo.status}</h3>
      </div>
    </div>
  );
}

export default EpisodeComponent;
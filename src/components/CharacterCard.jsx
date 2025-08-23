import rickImg from "./RickAndMortyimg.jpg";

function CardComponent({ charInfo }) {
  return (
    <div className="char-card">
      <div>
        <img src={rickImg} alt="Rick and Morty character" width="100" />
      </div>
      <div className="movie-info">
        <h2>{charInfo.name}</h2>
        <h3>{charInfo.status}</h3>
      </div>
    </div>
  );
}

export default CardComponent;
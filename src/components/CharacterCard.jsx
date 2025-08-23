import { Form, Link } from "react-router-dom";
import './components.css';

function CardComponent({ item }) {
  return (
    <div className="charCard">
      <div>
        <img src={item.image} alt="Rick and Morty character" width="100" />
      </div>
      <div className="charInfo">
  <h1>{item.name}</h1>
  <div className="separation-Div"></div>
  
  <div className="statusBoxRow">
    <div className="statusCard">
      <h3>{item.status}</h3>
    </div>
    <div className="box-Div">
      <h2>{item.species}</h2>
      <h2>{item.gender}</h2>
    </div>
  </div>
</div>
    </div>
  );
}

export default CardComponent;
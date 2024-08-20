import PropTypes from "prop-types";
import "./PokemonCard.css";

const PokemonCard = ({ name, imageUrl, onClick }) => {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PokemonCard;

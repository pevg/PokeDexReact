import PropTypes from "prop-types";
import "./PokemonCard.css";

const PokemonCard = ({ name, imageUrl }) => {
  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default PokemonCard;

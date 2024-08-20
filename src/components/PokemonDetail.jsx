import PropTypes from "prop-types";
import "./PokemonDetail.css";

const PokemonDetail = ({ pokemon, onBack }) => {
  return (
    <div className="pokemon-detail">
      <button onClick={onBack} className="back-button">
        Volver
      </button>
      <h2>
        {pokemon.name} N.º {String(pokemon.id)}
      </h2>
      <div className="pokemon-detail-content">
        <img
          src={pokemon.sprites.other["dream_world"].front_default}
          alt={pokemon.name}
        />
        <div className="pokemon-stats">
          <div>
            <h3>Height</h3>
            <p>{pokemon.height / 10} m</p>
          </div>
          <div>
            <h3>Weight</h3>
            <p>{pokemon.weight / 10} kg</p>
          </div>
          <div>
            <h3>Types</h3>
            <p>{pokemon.types.map((type) => type.type.name).join(", ")}</p>
          </div>
          <div>
            <h3>Abilities</h3>
            <p>
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PokemonDetail.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PokemonDetail;

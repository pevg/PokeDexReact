import PropTypes from "prop-types";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2>PokeDex</h2>
      <ul>
        <li>Pokemons</li>
        <li>Categorias</li>
        <li>Acerca de</li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;

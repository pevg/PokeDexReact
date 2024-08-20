import PropTypes from "prop-types";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">
      <button className="hamburger-button" onClick={toggleSidebar}>
        &#9776;
      </button>
    </div>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;

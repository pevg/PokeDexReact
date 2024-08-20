import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousClick} disabled={currentPage === 1}>
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Siguiente
      </button>
      <div className="items-per-page-selector">
        <label htmlFor="itemsPerPage">Mostrar: </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>{" "}
        &nbsp; elementos por página
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;

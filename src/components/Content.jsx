import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import "./Content.css";

const Content = () => {
  const API = "https://pokeapi.co/api/v2/pokemon/";

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(10);
  const [pokemons, setPokemons] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetch(
      `${API}?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalItems(data.count);
        setPokemons(data.results);
      });
  }, [itemsPerPage, currentPage]);

  const pokemonList = () => {
    return pokemons.map((pokemon, index) => {
      return (
        <PokemonCard
          key={index}
          name={pokemon.name}
          imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            pokemon.url.split("/")[6]
          }.svg`}
        />
      );
    });
  };

  return (
    <div className="content">
      <h2>PokeDex Nación</h2>
      <div className="search-box">
        <input type="text" placeholder="Search for Pokémon" />
        <img
          className="search-icon"
          src="/search-icon.png"
          alt="search icon"
        ></img>
      </div>

      <section className="pokemon-grid">{pokemonList()}</section>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default Content;

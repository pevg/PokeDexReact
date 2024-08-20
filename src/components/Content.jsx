import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import PokemonDetail from "./PokemonDetail";
import "./Content.css";

const Content = () => {
  // URLs base para las API de Pokémon y tipos
  const POKEMON_BASE_API = "https://pokeapi.co/api/v2/pokemon/";
  const SPRITES_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
  const TYPES_BASE_URL = "https://pokeapi.co/api/v2/type/";

  // Estados para manejar la paginación, los Pokémons, el filtro de tipo de Pokémon, la carga de datos, y el Pokémon seleccionado
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(10);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Funciones para manejar la paginación ---------------------- //
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  // ---------------------- Funciones para manejar la paginación //

  // Gestión de los cambios del dropdown de tipo
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
  };

  // Gestión de los detalles de un Pokémon
  const handlePokemonClick = async (pokemonUrl) => {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    setSelectedPokemon(data);
  };

  // Vuelve a la lista de Pokémon al salir de la vista detallada
  const handleBackClick = () => {
    setSelectedPokemon(null);
  };

  // Efecto para cargar los Pokémons basado en el tipo seleccionado y la paginación
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (selectedType === "all") {
        setPokemons([]);
        const response = await fetch(
          `${POKEMON_BASE_API}?limit=${itemsPerPage}&offset=${
            (currentPage - 1) * itemsPerPage
          }`
        );
        const data = await response.json();
        setTotalItems(data.count);
        setPokemons(data.results);
      } else {
        const response = await fetch(selectedType);
        const data = await response.json();
        const filteredPokemons = data.pokemon.map((p) => p.pokemon);

        setTotalItems(filteredPokemons.length);

        const paginatedPokemons = filteredPokemons.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

        setPokemons(paginatedPokemons);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedType, currentPage, itemsPerPage]);

  // Efecto para cargar los tipos de Pokémon al inicializar el componente
  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch(TYPES_BASE_URL);
      const data = await response.json();
      setTypes(data.results);
    };

    fetchTypes();
  }, []);

  // Función para renderizar la lista de Pokémon
  const pokemonList = () => {
    if (loading) {
      return <p>Loading Pokémon...</p>;
    }
    return pokemons.map((pokemon, index) => {
      if (!pokemon || (selectedType === "all" && !pokemon.url)) {
        return null;
      }

      const pokemonId = pokemon.url.split("/")[6];

      const pokemonName = pokemon.name;
      return (
        <PokemonCard
          key={index}
          name={`${pokemonId} - ${pokemonName}`}
          imageUrl={`${SPRITES_BASE_URL}${pokemonId}.svg`}
          onClick={() => handlePokemonClick(pokemon.url)}
        />
      );
    });
  };

  // Función para renderizar las opciones del dropdown de tipos
  const pokemonTypes = () => {
    return types.map((type, index) => {
      return (
        <option key={index} value={type.url}>
          {type.name}
        </option>
      );
    });
  };

  return (
    <div className="content">
      {selectedPokemon ? (
        <PokemonDetail pokemon={selectedPokemon} onBack={handleBackClick} />
      ) : (
        <>
          <h2>PokeDex Nación</h2>
          <div className="dropdown-container">
            <select onChange={handleTypeChange} value={selectedType}>
              <option key={4321} value={"all"}>
                all
              </option>
              {pokemonTypes()}
            </select>
          </div>

          <section className="pokemon-grid">{pokemonList()}</section>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default Content;

import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonSearcher from "./PokemonSearcher";
import AnimatedPokemonCard from "./AnimatedPokemonCard";

const itemsPerPage = 6;
let API_URI = "http://localhost:8080/pokemons/";

const CompShowPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    filterPokemons();
  }, [search, pokemons]);

  const getPokemons = async () => {
    try {
      const res = await axios.get(API_URI);
      setPokemons(res.data);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  };

  const filterPokemons = () => {
    const filtered = pokemons.filter((data) =>
      String(data.name).toLowerCase().includes(String(search).toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  useEffect(() => {
    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
    const newPages = Array.from({ length: totalPages }, (_, index) =>
      filteredPokemons.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
    );
    setPages(newPages);
    setCurrentPage(0);
  }, [filteredPokemons]);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <PokemonSearcher
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row position-relative">
          {pages.length > 0 &&
            pages[currentPage] &&
            pages[currentPage].map((pokemon) => (
              <AnimatedPokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
        <div>
          <button className="btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Anterior
          </button>
          <button className="btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pages.length - 1}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default CompShowPokemons;

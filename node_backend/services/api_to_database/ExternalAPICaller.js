const axios = require("axios");

const getTypeData = async () => {
  try {
    // Realiza una solicitud a la API de Pokémon para los Tipos
    const response = await axios.get("https://pokeapi.co/api/v2/type/");
    const results = response.data.results;
    const formattedTypesData = results.map((type) => {
      const id = type.url.split("/").filter(Boolean).pop(); // Obtener el último elemento después de dividir por '/'
      return {
        id: id,
        name: type.name,
      };
    });
    return formattedTypesData;
    console.log(
      "Se ha relizado la lectura de los datos de la API (Types) y se han convertido a JSON con éxito."
    );
  } catch (error) {
    console.error(
      "Error al obtener datos del servicio (Types):",
      error.message
    );
    throw error;
  }
};

const getAllPokemons = async () => {
  try {
    // Realiza una solicitud a la API de Pokémon
    //  "count": 1292,
    //"next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
    const count = await getPokemonCount();
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=" + count
    );
    const pokemons = response.data.results;
    // Prepara los datos necesarios para cada Pokémon en formato JSON
    //id, nombre, tipos, y si evoluciona de algun Pokémon, además su img.
    const pokemonData = await Promise.all(
      pokemons.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        const speciesResponse = await axios.get(
          detailsResponse.data.species.url
        );
        return {
          id: detailsResponse.data.id,
          name: detailsResponse.data.name,
          types: detailsResponse.data.types.map((type) =>
            type.type.url.split("/").filter(Boolean).pop()
          ),
          evolvesFrom:
            getEvolvesFrom(speciesResponse.data) == null
              ? "n/a"
              : getEvolvesFrom(speciesResponse.data),
          img: detailsResponse.data.sprites.front_default,
        };
      })
    );
    //transformo los datos en JSON después del mapeo y además los envio como respuesta
    return pokemonData;
    console.log(
      "Se ha relizado la lectura de los datos de la API (Pokémons) y se han convertido a JSON con éxito."
    );
  } catch (error) {
    console.error(
      "Error al obtener datos de la API (Pokémons):",
      error.message
    );
    res.status(500).send("Error interno del servidor, la API pokeapi.co no estuvo disponible al momento de llamar al recurso.");
  }
};

//Función para obtener la cantidad total de Pokemons
async function getPokemonCount() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    return response.data.count;
  } catch (error) {
    console.error("Error al obtener datos de la API:", error.message);
    throw error; // Lanzar el error para que sea manejado externamente
  }
}

// Función para obtener la información de evolución
function getEvolvesFrom(speciesData) {
  const evolvesFrom = speciesData.evolves_from_species;
  return evolvesFrom ? evolvesFrom.name : null;
}
module.exports = { getAllPokemons, getTypeData };

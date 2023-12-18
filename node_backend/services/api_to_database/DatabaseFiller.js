const { getAllPokemons, getTypeData } = require("./ExternalAPICaller.js");

const Pokemon = require("../../models/index.js").Pokemon;
const Type = require("../../models/index.js").Type;

const fillDatabase = async () => {
  fillTypes();
  fillPokemons();
};
const fillPokemons = async () => {
  //Obtengo los JSON de Pokemons desde la API origen.
  const pokemonsDataJSON = await getAllPokemons();
  //Recorro el JSON de Pokémons y además inserto cada uno en la base de datos
  pokemonsDataJSON.map(async (pokemon) => {
    try {
      const newPokemon = await Pokemon.create(
        {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.img,
          evolvesFrom: pokemon.evolvesFrom,
        },
        {
          logging: false,
        }
      );
      await newPokemon.addTypes(pokemon.types, {
        logging: false,
      });
    } catch (error) {
      console.error(`Error creating Pokemon: ${error.message}`);
    }
  });
};
const fillTypes = async () => {
  //Obtengo los datos JSON de Tipos desde la API origen.
  const typesDataJSON = await getTypeData();
  //Recorro el JSON de Tipos y además inserto cada uno en la base de datos
  typesDataJSON.map(async (type) => {
    try {
      const newType = await Type.create({
        id: type.id,
        idType: type.id,
        name: type.name,
      }, {
        logging: false,
      });
    } catch (error) {
      console.error(`Error creating Pokemon: ${error.message}`);
    }
  });
};
module.exports = { fillDatabase };

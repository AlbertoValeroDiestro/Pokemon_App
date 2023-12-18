const Pokemon = require("../models").Pokemon;
const Type = require("../models").Type;

//Obtenemos todos los Pokemons

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["id", "name"], // Especificamos las columnas que deseamos de la tabla Type
          through: { attributes: [] }, // Evitamos cargar la tabla intermedia
        },
      ],
    });
    res.json(pokemons);
  } catch (error) {
    res.json({ message: error.message });
  }
};
const getPokemon = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["id", "name"], // Especificamos las columnas que deseamos de la tabla Type
          through: { attributes: [] }, // Evitamos cargar la tabla intermedia
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    res.json(pokemons[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getAllPokemons, getPokemon };

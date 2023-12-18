const express = require("express");
const cors = require("cors");
const {
  getAllPokemons,
  getPokemon,
} = require("../controllers/PokemonController");

const router = express.Router();

router.get("/", getAllPokemons);
router.get("/:id", getPokemon);
module.exports = router;

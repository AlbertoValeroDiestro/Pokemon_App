const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const { runMigrations } = require("./services/api_to_database/MigrationRunner");
const { fillDatabase } = require("./services/api_to_database/DatabaseFiller");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/pokemons", router);

function run() {
  return new Promise(async (resolve, reject) => {
    try {
      await runMigrations();
      await fillDatabase();
      console.log(
        "Se ha insertado todos los Pokémons y Tipos en la base de datos del servidor local."
      );
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

run()
  .then(() => {
    app.listen(8080, () => {
      console.log("Running at http://localhost:8080/pokemons");
    });
  })
  .catch((error) => {
    console.error("Error during initialization:", error);
  });

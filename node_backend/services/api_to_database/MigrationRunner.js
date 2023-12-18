const { Sequelize } = require("sequelize");
const Umzug = require("umzug");
const config = require("../../config/config.json");

let sequelize = new Sequelize(config.development);

const umzug = new Umzug({
  migrations: {
    path: "migrations",
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
});

const resetDatabase = async () => {
  try {
    // Borra las tablas 'pokemons', 'pokemon_types', 'sequelizemeta' y 'types'
    await sequelize.query(
      "DROP TABLE IF EXISTS pokemons, pokemon_types, sequelizemeta, types;"
    );
    console.log("Tablas borradas correctamente.");
  } catch (error) {
    console.error("Error al borrar las tablas:", error);
    throw error;
  }
};

const runMigrations = async () => {
  try {
    // Resetear la base de datos antes de ejecutar las migraciones
    await resetDatabase();

    // Ejecutar las migraciones
    await umzug.up();
    console.log("Migraciones completadas.");
  } catch (error) {
    console.error("Error ejecutando migraciones:", error);
  } finally {
    // Cerrar conexión a la base de datos
    await sequelize.close();
  }
};

module.exports = { runMigrations };

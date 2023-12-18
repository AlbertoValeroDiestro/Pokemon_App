// models/pokemon_types.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pokemon_Types extends Model {
    static associate(models) {
      // Define las asociaciones aquí, si es necesario
    }
  }
  Pokemon_Types.init(
    {
      // Aquí debes definir las columnas necesarias
      PokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pokemon", // Nombre del modelo referenciado
          key: "id", // Nombre de la columna referenciada
        },
      },
      TypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Type", // Nombre del modelo referenciado
          key: "id", // Nombre de la columna referenciada
        },
      },
    },
    {
      sequelize,
      modelName: "Pokemon_Types",
    }
  );
  return Pokemon_Types;
};

 
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pokemon.belongsToMany(models.Type, {
        through: "Pokemon_Types",
      });
    }
  }
  Pokemon.init(
    
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Marcar 'id' como clave primaria
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      evolvesFrom: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pokemon",
    }
  );
  return Pokemon;
};

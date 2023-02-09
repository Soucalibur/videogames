const { DataTypes } = require('sequelize');
const {Sequelize} = require("sequelize")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,

    },
    description:{
      type: DataTypes.STRING,
      allowNull:false
    },
    date:{
      type:DataTypes.STRING,
      defaultValue: Sequelize.fn('now')
    },
    rating:{
      type: DataTypes.INTEGER,
    },
    platforms:{
      type:DataTypes.STRING,
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false
    }

  },
  {
    timestamps: false,
  }
  );
};

// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *

// en total el id deveria empezar por encima del 874377, que es el ultimo juego encontrado
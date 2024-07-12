const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/postgreSQL");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

// Sinhronizacija modela sa bazom podataka
Category.sync({ alter: true }) // Ovo će ažurirati tabelu ako već postoji
  .then(() => {
    console.log("Model Category je sinhronizovan sa bazom podataka.");
  })
  .catch((err) => {
    console.error("Greška prilikom sinhronizacije modela Category:", err);
  });

module.exports = Category;

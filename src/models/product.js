const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/postgreSQL");

const Product = sequelize.define(
  "Product",
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true }
);

// Sinhronizacija modela sa bazom podataka
Product.sync({ alter: true }) // Ovo će ažurirati tabelu ako već postoji
  .then(() => {
    console.log("Model Product je sinhronizovan sa bazom podataka.");
  })
  .catch((err) => {
    console.error("Greška prilikom sinhronizacije modela Product:", err);
  });

module.exports = Product;

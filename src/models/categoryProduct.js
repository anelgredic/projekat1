const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/postgreSQL");
const Product = require("../models/product");
const Category = require("../models/category");

const CategoryProduct = sequelize.define(
  "CategoryProduct",
  {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
      primaryKey: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
      primaryKey: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { timestamps: false }
);

Product.belongsToMany(Category, {
  through: CategoryProduct,
  foreignKey: "productId",
});
Category.belongsToMany(Product, {
  through: CategoryProduct,
  foreignKey: "categoryId",
});

// Sinhronizacija modela sa bazom podataka
CategoryProduct.sync({ alter: true }) // Ovo će ažurirati tabelu ako već postoji
  .then(() => {
    console.log("Model CategoryProduct je sinhronizovan sa bazom podataka.");
  })
  .catch((err) => {
    console.error(
      "Greška prilikom sinhronizacije modela CategoryProduct:",
      err
    );
  });

module.exports = CategoryProduct;

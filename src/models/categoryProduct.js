const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/postgreSQL");
const Product = require("../models/product");
const Category = require("../models/category");

const CategoryProduct = sequelize.define(
  "CategoryProduct",
  {},
  { timestamps: false }
);

Product.belongsToMany(Category, { through: CategoryProduct });
Category.belongsToMany(Product, { through: CategoryProduct });

module.exports = CategoryProduct;

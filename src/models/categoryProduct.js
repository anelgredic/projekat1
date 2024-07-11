const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/postgreSQL");
const Product = require("../models/product");
const Category = require("../models/category");

const CategoryProduct = sequelize.define(
  "CategoryProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  { timestamps: false }
);

Product.belongsToMany(Category, { through: CategoryProduct, allowNull: false });
Category.belongsToMany(Product, { through: CategoryProduct, allowNull: false });

module.exports = CategoryProduct;

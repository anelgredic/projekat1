const express = require("express");
const sequelize = require("./db/postgreSQL");
const Product = require("./models/product");
const Category = require("./models/category");
const CategoryProduct = require("./models/categoryProduct");

const productRouter = require("./routers/product");

const app = express();

app.use(express.json());
app.use(productRouter);

const port = process.env.PORT;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server sluša na portu ${port}`);
    });
  })
  .catch((err) => {
    console.error("Greška prilikom sinhronizacije sa bazom podataka:", err);
  });

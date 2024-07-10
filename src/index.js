const express = require("express");
const sequelize = require("./db/postgreSQL");
const Product = require("./models/product");
const productRouter = require("./routers/product");

const app = express();

app.use(express.json());
app.use(productRouter);

const port = process.env.PORT;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server sluša na portu ${port}`);
    });
  })
  .catch((err) => {
    console.error("Greška prilikom sinhronizacije sa bazom podataka:", err);
  });

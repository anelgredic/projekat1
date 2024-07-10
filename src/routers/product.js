const express = require("express");
const sequelize = require("../db/postgreSQL");
const Product = require("../models/product");

const router = new express.Router();

// Kreiranje product-a

router.post("/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = await Product.create({ name, price, description });
    console.log(newProduct);
    res.status(201).send(newProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    if (!products) {
      return res.status(404);
    }
    res.send(products);
  } catch (e) {}
});

router.get("/products/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findByPk(_id);

    if (!product) {
      return res.status(404);
    }

    console.log(_id);

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/products/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "price", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const _id = req.params.id;

  try {
    const product = await Product.findByPk(_id);

    if (!product) {
      return res.status(404);
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/products/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findByPk(_id);

    if (!product) {
      res.status(404);
    }

    product.destroy();
    res.send(product);
  } catch (e) {}
});

module.exports = router;

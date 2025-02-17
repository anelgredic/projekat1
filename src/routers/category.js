const express = require("express");
const sequelize = require("../db/postgreSQL");
const Category = require("../models/category");
const CategoryProduct = require("../models/categoryProduct");

const router = new express.Router();

router.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).send(newCategory);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      return res.status(404);
    }
    res.send(categories);
  } catch (e) {}
});

router.get("/categories/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findByPk(_id);

    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    res.send(category);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/categories/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const _id = req.params.id;

  try {
    const category = await Category.findByPk(_id);

    if (!category) {
      return res.status(404);
    }

    updates.forEach((update) => (category[update] = req.body[update]));
    await category.save();

    res.send(category);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/categories/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const category = await Category.findByPk(_id);

    if (!category) {
      res.status(404);
    }

    category.destroy();
    res.send(category);
  } catch (e) {}
});

router.patch(
  "/categories/:categoryId/products/:productId",
  async (req, res) => {
    try {
      const { categoryId, productId } = req.params;
      const category = await Category.findByPk(categoryId);
      const product = await Product.findByPk(productId);

      if (!category || !product) {
        return res
          .status(404)
          .send({ error: "Category or Product not found!" });
      }

      const categoryProduct = await CategoryProduct.create({
        productId,
        categoryId,
      });

      res.status(201).send(categoryProduct);
    } catch (e) {
      console.error("Error:", e);
      res.status(500).send();
    }
  }
);

module.exports = router;

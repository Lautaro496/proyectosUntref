const express = require("express");
const router = express.Router();

const { Categoria } = require("../models/index");

router.get("/categoria/:id", async (req, res) => {
  const act = await Categoria.findOne({
    where: { ID: req.params.id },
    include: {
      model: Categoria,
      attributes: ["Name"],
      through: { attributes: [] },
    },
  });
  res.status(200).send(act);
});

module.exports = router;

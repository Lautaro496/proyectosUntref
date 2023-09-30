const express = require("express");
const router = express.Router();

const { Genero } = require("../models/index");

router.get("/genero/:id", async (req, res) => {
  const act = await Genero.findOne({
    where: { ID: req.params.id },
    include: {
      model: Genero,
      attributes: ["Name"],
      through: { attributes: [] },
    },
  });
  res.status(200).send(act);
});

module.exports = router;

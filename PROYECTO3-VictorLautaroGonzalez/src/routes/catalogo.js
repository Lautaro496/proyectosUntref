const express = require("express");
const router = express.Router();

const { Catalogo } = require("../models/index");

router.get("/catalogo/:id", async (req, res) => {
  const act = await Catalogo.findOne({
    where: { ID: req.params.id },
    include: {
      model: Catalogo,
      attributes: ["Name",],
      through: { attributes: [] },
    },
  });
  res.status(200).send(act);
});

module.exports = router;

const express = require("express");
const router = express.Router();

const { Catalogo } = require("../models/index");

router.get("/catalogo/:id", async (req, res) => {
  const act = await Catalogo.findOne({
    where: { ID: req.params.idCatalogo },
    include: {
      model: Catalogo,
      attributes: ["Poster","Titulo","Categoria","Genero","Resumen","Temporadas","Reparto","Trailer"],
      through: { attributes: [] },
    },
  });
  res.status(200).send(act);
});

module.exports = router;

const express = require("express")
const router = express.Router()

const {ActricesActores} = require("../models/index")

router.get("/actricesactores/:id", async (req, res) => {
    const act = await ActricesActores.findOne({ 
        where: {ID: req.params.id},
        include: { model: ActricesActores, attributes: ["Name"], through: { attributes: [] } }
    })
    res.status(200).send(act)
})

module.exports = router;
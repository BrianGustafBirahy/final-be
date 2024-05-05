const express = require('express');
const router = express.Router();
const prisma = require("../db");
const { allRating, createRating } = require('./rating.service');

//  Get all Rating
router.get("/", async (req, res) => {
    const rating = await allRating();
    res.send(rating)
  });
  
  // Tambah Rating
  router.post("/", async (req, res) => {
    try{
        const newRating = req.body;
        const rating = await createRating(newRating);
        res.send({
            data : rating,
            message : "Data berhasil dibuat"
        });
    } catch(error) {
        res.status(400).send(error.message);
    }
  });

module.exports = router;
const express = require('express');
const router = express.Router();
const prisma = require("../db");
const { allFeedback, createFeedback } = require('./feedback.service');

//  Get all feedback
router.get("/", async (req, res) => {
    const feedback = await allFeedback();
    res.send(feedback)
  })
  
  // Tambah Feedback
router.post("/", async (req, res) => {
    try{
        const newFeedback = req.body;
        const feedback = await createFeedback(newFeedback);
        res.send({
            data : feedback,
            message : "Data berhasil dibuat"
        });
    } catch(error) {
        res.status(400).send(error.message);
    }
  });

module.exports = router;
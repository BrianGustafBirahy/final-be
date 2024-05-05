const express = require('express');
const router = express.Router();
const prisma = require("../db");
const { allPendaftaran } = require('./pendaftaran.service');

//  Get all Pendaftaran
router.get("/", async (req, res) => {
    const pendaftaran = await allPendaftaran();
    res.send(pendaftaran)
  });
  
  // Tambah pendaftaran
  router.post("/", async (req, res) => {
    const { id_kegiatan, id_mhs, tgl_pdf } = req.body;
    try {
      await prisma.pendaftaran.create({
        data: {
          id_kegiatan  : id_kegiatan,
          id_mhs : id_mhs,
          tgl_pdf   : tgl_pdf
        },
      });
      res.status(200).json({
        status: "success",
        message: "data berhasil dimasukan",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });


  module.exports = router;
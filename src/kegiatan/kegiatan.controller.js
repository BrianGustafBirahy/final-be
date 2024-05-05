const express = require('express');
const router = express.Router();
const prisma = require("../db");
const { allKegiatan, createKegiatan, deleteKegiatanById, patchKegiatanById } = require('./kegiatan.service');

//  Get all kegiatan
router.get("/", async (req, res) => {
    const kegiatan = await allKegiatan();
    res.send(kegiatan)
  });
  
  // Tambahkan Kegiatan
router.post("/", async (req, res) => {
    try{
        const newKegiatan = req.body;
        const kegiatan = await createKegiatan(newKegiatan);
        res.send({
            data : kegiatan,
            message : "Data berhasil dibuat"
        });
    } catch(error) {
        res.status(400).send(error.message);
    }
  });
  
  // Delete kegiatan
router.delete("/:id_kegiatan", async(req, res)=> {
    try{
        const idKegiatan = req.params.id_kegiatan;
        await deleteKegiatanById(idKegiatan);
        res.send("Data kegiatan sudah terhapus");
    }catch(error){
        res.status(400).send(error.message)
    }
  });
  
  // Modifikasi salah satu data menggunakan patch
router.patch("/:id_kegiatan", async(req, res)=>{
    try {
        const idKegiatan= req.params.id_kegiatan;
        const dataKegiatan = req.body;
    
        const kegiatan = await patchKegiatanById(idKegiatan, dataKegiatan);
        res.send  ({
            data : kegiatan,
            message : "Edit data mahasiswa sukses"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
  })

module.exports = router;
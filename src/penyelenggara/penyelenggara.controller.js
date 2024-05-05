const express = require('express');
const router = express.Router();
const prisma = require("../db");
const { allPenyelenggara, createPenyelenggara, deletePenyelenggaraById, patchPenyelenggaraById, getMahasiswaByKegiatanIDController } = require('./penyelenggara.service');


// get all penyelenggara
router.get("/", async (req, res) => {
    const penyelenggara = await allPenyelenggara();
    res.send(penyelenggara)
  });
  
//   Tambahkan Penyelenggara
router.post("/", async (req, res) => {
    try{
        const newPenyelenggara = req.body;
        const penyelenggara = await createPenyelenggara(newPenyelenggara);
        res.send({
            data : penyelenggara,
            message : "Data berhasil dibuat"
        });
    } catch(error) {
        res.status(400).send(error.message);
    }
  });
  
  // Delete penyelenggara
router.delete("/:id_py", async(req, res)=> {
    try{
        const idPenyelenggara = req.params.id_py;
        await deletePenyelenggaraById(idPenyelenggara);
        res.send("Data kegiatan sudah terhapus");
    }catch(error){
        res.status(400).send(error.message)
    }
  });
  
  // Modifikasi data penyelenggara
router.patch("/:id_py", async(req, res)=>{
    try {
        const idPenyelenggara= req.params.id_py;
        const dataPenyelenggara = req.body;
    
        const penyelenggara = await patchPenyelenggaraById(idPenyelenggara, dataPenyelenggara);
        res.send  ({
            data : penyelenggara,
            message : "Edit data mahasiswa sukses"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
  })
  
  // get siapa saja yang mengikuti sebuah event
  router.get("/:id_py/kegiatan/:id_kegiatan/mahasiswa", async (req, res) => {
    try {
      await getMahasiswaByKegiatanIDController(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
// Layer untuk handle req dan res
// Bisa juga validasi body
const express = require('express');
const router = express.Router();
const prisma = require("../db");
const { allMahasiswa, getMahasiswaByID, createMahasiswa, deleteMahasiswaById, patchMahasiswaById, getKegiatanMahasiswaByID } = require('./mahasiswa.service');
//  Get all mahasiswa
router.get("/", async (req, res) => {
    const mahasiswa = await allMahasiswa();
    res.send(mahasiswa)
  });
  
  //////// Tambahkan mahasiswa
  router.post("/", async (req, res) => {

    try{
        const newMahasiswa = req.body;
        const mahasiswa = await createMahasiswa(newMahasiswa);
        res.send({
            data : mahasiswa,
            message : "Data berhasil dibuat"
        });
    } catch(error) {
        res.status(400).send(error.message);
    }
  });
  
  // Cari mahasiswa by id
  router.get("/:id_mhs", async (req, res) => {
    try {
      const idMahasiswa = parseInt(req.params.id_mhs);
      const mahasiswa = await getMahasiswaByID(parseInt(idMahasiswa));
  
      res.send(mahasiswa);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
  // Delete mahasiswa
  router.delete("/:id_mhs", async(req, res)=> {
    try{
        const idMahasiswa = req.params.id_mhs;
        await deleteMahasiswaById(parseInt(idMahasiswa));
        res.send("Data mahasiswa sudah terhapus");
    }catch(error){
        res.status(400).send(error.message)
    }
    
  });
  
  // Modifikasi data 
  router.put("/:id_mhs", async(req, res)=>{
    const idMahasiswa= req.params.id_mhs;
    const dataMahasiswa = req.body;
    if (
      !(
        dataMahasiswa.nama_mhs && 
        dataMahasiswa.email_mhs && 
        dataMahasiswa.jurusan && 
        dataMahasiswa.Tingkat
      )
    ) {
      res.status(400).send("Ada data yang tidak terisi") 
    }
    const mahasiswa = await patchMahasiswaById(idMahasiswa, dataMahasiswa);
    res.send  ({
      data : mahasiswa,
      message : "Edit data mahasiswa sukses"
    });
  })
  
  // Modifikasi salah satu data menggunakan patch
  router.patch("/:id_mhs", async(req, res)=>{
    try {
        const idMahasiswa= req.params.id_mhs;
        const dataMahasiswa = req.body;
    
        const mahasiswa = await patchMahasiswaById(parseInt(idMahasiswa), dataMahasiswa);
        res.send  ({
            data : mahasiswa,
            message : "Edit data mahasiswa sukses"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
  })
  
  // Get all kegiatan and mahasiswa data by mahasiswa id
  router.get('/:id_mhs/kegiatan', async (req, res) => {
    try {
      const kegiatan = await getKegiatanMahasiswaByID(req);
      res.json(kegiatan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
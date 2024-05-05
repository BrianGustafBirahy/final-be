const express = require('express');
const router = express.Router();
const prisma = require("../db");
const { allAdmin, createAdmin, deleteAdminById, patchAdminById } = require('./admin.service');

//  Get all Admin
router.get("/", async (req, res) => {
    const admin = await allAdmin();
    res.send(admin)
  });
  
  // Tambah Admin
  router.post("/", async (req, res) => {
    try{
        const newAdmin = req.body;
        const admin = await createAdmin(newAdmin);
        res.send({
            data : admin,
            message : "Data berhasil dibuat"
        });
    } catch(error) {
        res.status(400).send(error.message);
    }
  });
  
  // Delete admin
  router.delete("/:id_admin", async(req, res)=> {
    try{
        const idAdmin = req.params.id_admin;
        await deleteAdminById(idAdmin);
        res.send("Data admin sudah terhapus");
    }catch(error){
        res.status(400).send(error.message)
    }
  });
  
  // Modifikasi salah satu data menggunakan patch
  router.patch("/:id_admin", async(req, res)=>{
    try {
        const idAdmin= req.params.id_admin;
        const dataAdmin = req.body;
    
        const admin = await patchAdminById(idAdmin, dataAdmin);
        res.send  ({
            data : admin,
            message : "Edit data admin sukses"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
  })

module.exports = router;
const express = require("express");
const dotenv = require("dotenv")
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const port = process.env.PORT;
const hostname = "127.0.0.1";

////////////////////////////////////////////////////            GET ALL              ////////////////////////////////////////////////////
//  Get all mahasiswa
app.get("/mahasiswa", async (req, res) => {
  try {
    const allMahasiswa = await prisma.mahasiswa.findMany();
    console.log(allMahasiswa);
    res.status(200).json({
      status: "success",
      data: allMahasiswa,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//  Get all kegiatan
app.get("/kegiatan", async (req, res) => {
  try {
    const allKegiatan = await prisma.kegiatan.findMany();
    console.log(allKegiatan);
    res.status(200).json({
      status: "success",
      data: allKegiatan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//  Get all Admin
app.get("/admin", async (req, res) => {
  try {
    const allAdmin = await prisma.adminUniv.findMany();
    console.log(allAdmin);
    res.status(200).json({
      status: "success",
      data: allAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//  Get all Pendaftaran
app.get("/pendaftaran", async (req, res) => {
  try {
    const allPendaftaran = await prisma.pendaftaran.findMany();
    console.log(allPendaftaran);
    res.status(200).json({
      status: "success",
      data: allPendaftaran,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



//////// Tambahkan mahasiswa

// app.post("/mahasiswa", async (req, res) => {
//   const { nama_mhs, email_mhs, jurusan,Tingkat} = req.body;
//   try {
//     await prisma.mahasiswa.create({
//       data: {
//         nama_mhs  : "Janeighteen",
//         email_mhs : "Janeighteen@gmail.com",
//         jurusan   : "Bahasa Inggris",
//         Tingkat   : 3
//       },
//     });
//     res.status(200).json({
//       status: "success",
//       message: "data berhasil dimasukan",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

////////////////////////// Masih error

// Cari mahasiswa by id
app.get("/mahasiswa/:id_mhs", async (req, res) => {
  try {
    const { id_mhs } = req.params;
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: {
        id_mhs: Number(id_mhs),
      },
    });
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
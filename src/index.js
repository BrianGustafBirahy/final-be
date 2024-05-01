const express = require("express");
const dotenv = require("dotenv")
const {PrismaClient} = require("@prisma/client")
// const bodyParser = require('body-parser');
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
dotenv.config();
// const db = require("../db")

const port = process.env.PORT;
const hostname = "127.0.0.1";


app.get("/", async (req, res) => {
  try {
    res.status(200).send("<H1>Home<H1>");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



////////////////////////////////////////////////////            Mahasiswa            ////////////////////////////////////////////////////
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

//////// Tambahkan mahasiswa
app.post("/mahasiswa", async (req, res) => {
  const { nama_mhs, email_mhs, jurusan, Tingkat } = req.body;
  try {
    await prisma.Mahasiswa.create({
      data: {
        nama_mhs  : nama_mhs,
        email_mhs : email_mhs,
        jurusan   : jurusan,
        Tingkat   : Tingkat
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

////////////////////////////////////////////////////            Kegiatan            ////////////////////////////////////////////////////
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

// Tambahkan Kegiatan
app.post("/kegiatan", async (req, res) => {
  const { nm_kegiatan, id_py, id_admin, deskripsi, jadwal } = req.body;
  try {
    await prisma.kegiatan.create({
      data: {
        nm_kegiatan  : nm_kegiatan,
        id_py : id_py,
        id_admin   : id_admin,
        deskripsi   : deskripsi,
        jadwal  : jadwal
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

////////////////////////////////////////////////////            Admin            ////////////////////////////////////////////////////
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

// Tambah Admin
app.post("/admin", async (req, res) => {
  const { id_admin, nama_adm, email_adm } = req.body;
  try {
    await prisma.kegiatan.create({
      data: {
        id_admin  : id_admin,
        nama_adm : nama_adm,
        email_adm   : email_adm
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

////////////////////////////////////////////////////            Pendaftaran            ////////////////////////////////////////////////////
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







/////////////////////////////////////////////// MAHASISWA //////////////////////////////////////////////////////
// app.post("/pendaftaran", async (req, res) => {
//   try {
//     const {id_kegiatan } = req.body;
//     const daftarKegiatan = await prisma.pendaftaran.create({
//       data: {
//         id_kegiatan : EW001,

//       }
//     });
//     res.status(200).json({
//       status: "success",
//       data: daftarKegiatan,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
// ///////////////////////ERRORR

// Melihat jadwal kegiatan yang diikuti
// app.get("/mahasiswa/:id_mhs/jadwal", async (req, res) => {
//   try {
//     const { id_mhs } = req.params;
//     const jadwalKegiatan = await prisma.jadwal.findMany({
//       where: {
//         id_mhs: id_mhs
//       }
//     });
//     res.status(200).json({
//       status: "success",
//       data: jadwalKegiatan,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

///////////////////////////////////belum jadi

// Memberikan feedback dan rating terhadap kegiatan
// app.post("/kegiatan/:id_kegiatan/feedback", async (req, res) => {
//   try {
//     const { id_mhs, rating, feedback, id_kegiatan} = req.body;
//     const feedbackKegiatan = await prisma.feedback.create({
//       data: {
//         id_mhs: id_mhs,
//         id_kegiatan: req.params.id_kegiatan,
//         rating: rating,
//         feedback: feedback
//       }
//     });
//     res.status(200).json({
//       status: "success",
//       data: feedbackKegiatan,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
//////////////////////////////////masih error


app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
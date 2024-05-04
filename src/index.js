const express = require("express");
const dotenv = require("dotenv")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
dotenv.config();

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

// Delete mahasiswa
app.delete("/mahasiswa/:id_mhs", async(req, res)=> {
  const idMahasiswa = req.params.id_mhs;
  await prisma.mahasiswa.delete({
    where : {
      id_mhs : parseInt(idMahasiswa),
    },
  });
  res.send("Data mahasiswa sudah terhapus");
});

// Modifikasi data 
app.put("/mahasiswa/:id_mhs", async(req, res)=>{
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
  const mahasiswa = await prisma.mahasiswa.update({
    where : {
      id_mhs : parseInt(idMahasiswa)
    },
    data : {
      nama_mhs  : dataMahasiswa.nama_mhs,
        email_mhs : dataMahasiswa.email_mhs,
        jurusan   : dataMahasiswa.jurusan,
        Tingkat   : dataMahasiswa.Tingkat
    },
  });
  res.send  ({
    data : mahasiswa,
    message : "Edit data mahasiswa sukses"
  })
})

// Modifikasi salah satu data menggunakan patch
app.patch("/mahasiswa/:id_mhs", async(req, res)=>{
  const idMahasiswa= req.params.id_mhs;
  const dataMahasiswa = req.body;

  const mahasiswa = await prisma.mahasiswa.update({
    where : {
      id_mhs : parseInt(idMahasiswa)
    },
    data : {
      nama_mhs  : dataMahasiswa.nama_mhs,
        email_mhs : dataMahasiswa.email_mhs,
        jurusan   : dataMahasiswa.jurusan,
        Tingkat   : dataMahasiswa.Tingkat
    },
  });
  res.send  ({
    data : mahasiswa,
    message : "Edit data mahasiswa sukses"
  })
})

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
    await prisma.adminUniv.create({
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

// Tambah pendaftaran
app.post("/pendaftaran", async (req, res) => {
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

////////////////////////////////////////////////////            Rating            ////////////////////////////////////////////////////
//  Get all Rating
app.get("/rating", async (req, res) => {
  try {
    const allRating = await prisma.rating.findMany();
    console.log(allRating);
    res.status(200).json({
      status: "success",
      data: allRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Tambah RAting
app.post("/rating", async (req, res) => {
  const { id_rate, id_mhs, id_kegiatan, rating } = req.body;
  try {
    await prisma.rating.create({
      data: {
        id_rate : id_rate,
        id_mhs  : id_mhs,
        id_kegiatan : id_kegiatan,
        rating   : rating
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

////////////////////////////////////////////////////            FeedBack            ////////////////////////////////////////////////////
//  Get all feedback
app.get("/feedback", async (req, res) => {
  try {
    const allFeedback = await prisma.feedback.findMany();
    console.log(allFeedback);
    res.status(200).json({
      status: "success",
      data: allFeedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Tambah Feedback
// app.post("/feedback", async (req, res) => {
//   const { id_fb, id_mhs, id_kegiatan, comment } = req.body;
//   try {
//     await prisma.feedback.create({
//       data: {
//         id_fb  : id_fb,
//         id_mhs : id_mhs,
//         id_kegiatan   : id_kegiatan,
//         comment : comment
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

app.post("/feedback", async (req, res) => {
  const { id_fb, id_mhs, id_kegiatan, comment } = req.body;
  try {
    await prisma.feedback.create({
      data: {
        id_fb  : id_fb,
        id_mhs : id_mhs,
        id_kegiatan   : id_kegiatan,
        comment : comment
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
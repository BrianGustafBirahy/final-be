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

// Get all kegiatan and mahasiswa data by mahasiswa id
app.get("/mahasiswa/:id_mhs/kegiatan", async (req, res) => {
  try {
    const { id_mhs } = req.params;
    const kegiatanMahasiswa = await prisma.Pendaftaran.findMany({
      where: {
        id_mhs: Number(id_mhs),
      },
      include: {
        kegiatan: true,
        mahasiswa: {
          select: {
            nama_mhs: true,
            id_mhs: true,
          },
        },
      },
    });
    const kegiatan = kegiatanMahasiswa.map((pendaftaran) => {
      return {
        mahasiswa: pendaftaran.mahasiswa,
        kegiatan: pendaftaran.kegiatan,
      };
    });
    res.json(kegiatan);
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
  const newKegiatan = { id_kegiatan, nm_kegiatan, id_py, id_admin, deskripsi, jadwal } = req.body;
  try {
    await prisma.kegiatan.create({
      data: {
        id_kegiatan : id_kegiatan,
        nm_kegiatan  : nm_kegiatan,
        id_py : id_py,
        id_admin   : id_admin,
        deskripsi   : deskripsi,
        jadwal  : jadwal
      },
    });
    res.status(200).json({
      data : newKegiatan,
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete kegiatan
app.delete("/kegiatan/:id_kegiatan", async(req, res)=> {
  const idKegiatan = req.params.id_kegiatan;
  await prisma.kegiatan.delete({
    where : {
      id_kegiatan : idKegiatan,
    },
  });
  res.send("Kegiatan sudah terhapus");
});

// Modifikasi salah satu data menggunakan patch
app.patch("/kegiatan/:id_kegiatan", async(req, res)=>{
  const idKegiatan= req.params.id_kegiatan;
  const dataKegiatan = req.body;

  const kegiatan = await prisma.kegiatan.update({
    where : {
      id_kegiatan :idKegiatan
    },
    data : {
      id_kegiatan : dataKegiatan.id_kegiatan,
      nm_kegiatan  : dataKegiatan.nm_kegiatan,
      id_py : dataKegiatan.id_py,
      id_admin   : dataKegiatan.id_admin,
      deskripsi   : dataKegiatan.deskripsi,
      jadwal  : dataKegiatan.jadwal
    },
  });
  res.send  ({
    data : kegiatan,
    message : "Edit data kegiatan sukses"
  })
})

// app.get("/kegiatan/:id_kegiatan/mahasiswa", async (req, res) => {
//   const idKegiatan = req.params.id_kegiatan;
//   try {
//     const mahasiswaParticipating = await prisma.feedback.findMany({
//       where: {
//         id_kegiatan: idKegiatan,
//       },
//       include: {
//         mahasiswa: true,
//       },
//     });
//     res.status(200).json({
//       status: "success",
//       data: mahasiswaParticipating.map((feedback) => feedback.mahasiswa),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// }); 
              // Errorrr

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

// Delete admin
app.delete("/admin/:id_admin", async(req, res)=> {
  const idAdmin = req.params.id_admin;
  await prisma.adminUniv.delete({
    where : {
      id_admin : idAdmin,
    },
  });
  res.send("Admin sudah terhapus");
});

// Modifikasi salah satu data menggunakan patch
app.patch("/admin/:id_admin", async(req, res)=>{
  const idAdmin= req.params.id_admin;
  const dataAdmin = req.body;

  const admin = await prisma.adminUniv.update({
    where : {
      id_admin :idAdmin
    },
    data : {
      id_admin : dataAdmin.id_admin,
      nama_adm  : dataAdmin.nama_adm,
      email_adm : dataAdmin.email_adm
    },
  });
  res.send  ({
    data : admin,
    message : "Edit data admin sukses"
  })
})

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

// Tambah Rating
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

// /////////////////////////////////////////////////////////  PENYELENGGARA  /////////////////////////////////////////////////////////////
// get all penyelenggara
app.get("/penyelenggara", async (req, res) => {
  try {
    const allPenyelenggara = await prisma.penyelenggara.findMany();
    console.log(allPenyelenggara);
    res.status(200).json({
      status: "success",
      data: allPenyelenggara,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/penyelenggara", async (req, res) => {
  const newPenyelenggara = { id_py, nama_py, kontak } = req.body;
  try {
    await prisma.penyelenggara.create({
      data: {
        id_py : id_py,
        nama_py  : nama_py,
        kontak : kontak
      },
    });
    res.status(200).json({
      data : newPenyelenggara,
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete penyelenggara
app.delete("/penyelenggara/:id_py", async(req, res)=> {
  const idpy = req.params.id_py;
  await prisma.penyelenggara.delete({
    where : {
      id_py : idpy,
    },
  });
  res.send("penyelenggara sudah terhapus");
});

app.patch("/penyelenggara/:id_py", async(req, res)=>{
  const idpy= req.params.id_py;
  const datapy = req.body;

  const penyelenggara = await prisma.penyelenggara.update({
    where : {
      id_py :idpy
    },
    data : {
      id_py : datapy.id_py,
      nama_py  : datapy.nama_py,
      kontak : datapy.kontak
    },
  });
  res.send  ({
    data : penyelenggara,
    message : "Edit data penyelenggara sukses"
  })
})





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
///////////////////ERROR

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
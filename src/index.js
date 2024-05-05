const express = require("express");
const dotenv = require("dotenv")
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
const mahasiswaController = require("./mahasiswa/mahasiswa.controller");
app.use('/mahasiswa',mahasiswaController);

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

// Modifikasi data penyelenggara
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

// Get all mahasiswa and kegiatan data by kegiatan id for a penyelenggara
app.get("/penyelenggara/:id_py/kegiatan/:id_kegiatan/mahasiswa", async (req, res) => {
  try {
    const { id_py, id_kegiatan } = req.params;
    const kegiatanPenyelenggara = await prisma.Kegiatan.findUnique({
      where: {
        id_kegiatan: id_kegiatan,
      },
      include: {
        pendaftaran: {
          include: {
            mahasiswa: true,
          },
        },
      },
    });
    if (kegiatanPenyelenggara.id_py !== id_py) {
      return res.status(400).json({ error: "Penyelenggara id does not match with the kegiatan" });
    }
    const mahasiswa = kegiatanPenyelenggara.pendaftaran.map((pendaftaran) => {
      return {
        kegiatan: {
          id_kegiatan: kegiatanPenyelenggara.id_kegiatan,
          nm_kegiatan: kegiatanPenyelenggara.nm_kegiatan,
        },
        mahasiswa: pendaftaran.mahasiswa,
        
      };
    });
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
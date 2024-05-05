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

const kegiatanController = require("./kegiatan/kegiatan.controller")
app.use('/kegiatan', kegiatanController);

////////////////////////////////////////////////////            Admin            ////////////////////////////////////////////////////
const adminController = require("./admin/admin.controller")
app.use('/admin', adminController);

////////////////////////////////////////////////////            Pendaftaran            ////////////////////////////////////////////////////
const pendaftaranController = require("./pendaftaran/pendaftaran.controller")
app.use('/pendaftaran', pendaftaranController)

////////////////////////////////////////////////////            Rating            ////////////////////////////////////////////////////
const ratingController = require("./rating/rating.controller")
app.use('/rating', ratingController)

////////////////////////////////////////////////////            FeedBack            ////////////////////////////////////////////////////
const feedbackController = require("./feedback/feedback.controller")
app.use('/feedback', feedbackController)

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
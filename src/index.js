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
const penyelenggaraController = require("./penyelenggara/penyelenggara.controller")
app.use('/penyelenggara', penyelenggaraController)



app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
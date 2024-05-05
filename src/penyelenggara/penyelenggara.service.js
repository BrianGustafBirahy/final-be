const prisma = require("../db");

const { findPenyelenggara, insertPenyelenggara, deletePenyelenggara, editPenyelenggara, getMahasiswaByKegiatanID } = require("./penyelenggara.repository");

const allPenyelenggara = async()=>{
    const penyelenggara = await findPenyelenggara();
    return penyelenggara;
};

const createPenyelenggara = async(newPenyelenggara)=>{
    const penyelenggara = await insertPenyelenggara(newPenyelenggara);
    return penyelenggara;
}

const deletePenyelenggaraById = async(id_py)=>{
    await deletePenyelenggara(id_py);
}

const patchPenyelenggaraById = async(id_py,datapy)=>{
    await findPenyelenggaraById(id_py);
    const penyelenggara = await editPenyelenggara(id_py, datapy);
    return penyelenggara;
}


const getMahasiswaByKegiatanIDController = async (req, res) => {
  const { id_py, id_kegiatan } = req.params;

  try {
    const mahasiswa = await getMahasiswaByKegiatanID(id_kegiatan, id_py);

    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    allPenyelenggara,
    createPenyelenggara,
    patchPenyelenggaraById,
    deletePenyelenggaraById,
    getMahasiswaByKegiatanIDController

}
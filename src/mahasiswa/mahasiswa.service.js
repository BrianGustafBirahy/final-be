const prisma = require("../db");
const { findMahasiswa, findMahasiswaById, insertMahasiswa, deleteMahasiswa, editMahasiswa, findKegiatanMahasiswa } = require("./mahasiswa.repository");


const allMahasiswa = async()=>{
    const mahasiswa = await findMahasiswa();
    return mahasiswa;
};

const getMahasiswaByID = async (id_mhs)=>{
      const mahasiswa = await findMahasiswaById(id_mhs);

      if(! mahasiswa){
        throw Error("Mahasiswa not found");
      }
      return mahasiswa;
  }

const createMahasiswa = async(newMahasiswa)=>{
    const mahasiswa = await insertMahasiswa(newMahasiswa);
    return mahasiswa;
}

const deleteMahasiswaById = async(id_mhs)=>{
    if (typeof id_mhs !=="number"){
        throw Error("ID is not a number");
    }
    await deleteMahasiswa(id_mhs);
}

const patchMahasiswaById = async(id_mhs,dataMahasiswa)=>{
    await getMahasiswaByID(id_mhs);
    const mahasiswa = await editMahasiswa(id_mhs, dataMahasiswa);
    return mahasiswa;
}

const getKegiatanMahasiswaByID = async (req) => {
    const { id_mhs } = req.params;
    try {
      const kegiatan = await findKegiatanMahasiswa(id_mhs);
  
      return kegiatan;
    } catch (error) {
      throw new Error(error.message);
    }
  };



module.exports = {
    allMahasiswa,
    getMahasiswaByID,
    createMahasiswa,
    deleteMahasiswaById,
    patchMahasiswaById,
    getKegiatanMahasiswaByID
}
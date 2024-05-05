
const prisma = require("../db")

const findPenyelenggara = async()=>{
    const penyelenggara = await prisma.penyelenggara.findMany();
    return penyelenggara;
}

const insertPenyelenggara = async(dataPenyelenggara)=>{
    const penyelenggara = await prisma.penyelenggara.create({
        data: {
            id_py : dataPenyelenggara.id_py,
            nama_py  : dataPenyelenggara.nama_py,
            kontak : dataPenyelenggara.kontak
          },
    });
    return penyelenggara;
}

const deletePenyelenggara = async(id_py)=>{
    await prisma.penyelenggara.delete({
        where:{
            id_py,
        },
    });
}


const findPenyelenggaraById = async(id_py)=>{
    const penyelenggara = await prisma.penyelenggara.findUnique({
        where :{
            id_py,
        },
    });
    return penyelenggara;
}

const editPenyelenggara = async(id_py,datapy)=>{
    const penyelenggara = await prisma.penyelenggara.update({
        where : {
          id_py :id_py
        },
        data : {
            id_py : datapy.id_py,
            nama_py  : datapy.nama_py,
            kontak : datapy.kontak
          },
      });
      return penyelenggara;
}

const getMahasiswaByKegiatanID = async (id_kegiatan, id_py) => {
    try {
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
        throw new Error("Penyelenggara id does not match with the kegiatan");
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
  
      return mahasiswa;
    } catch (error) {
      throw new Error(error.message);
    }
  };
module.exports = {
    findPenyelenggara,
    insertPenyelenggara,
    deletePenyelenggara,
    editPenyelenggara,
    findPenyelenggaraById,
    getMahasiswaByKegiatanID,
}

const prisma = require("../db")

const findKegiatan = async()=>{
    const kegiatan = await prisma.kegiatan.findMany();
    return kegiatan;
}

const insertKegiatan = async(dataKegiatan)=>{
    const kegiatan = await prisma.kegiatan.create({
        data: {
            id_kegiatan : dataKegiatan.id_kegiatan,
            nm_kegiatan  : dataKegiatan.nm_kegiatan,
            id_py : dataKegiatan.id_py,
            id_admin   : dataKegiatan.id_admin,
            deskripsi   : dataKegiatan.deskripsi,
            jadwal  : dataKegiatan.jadwal
          },
    });
    return kegiatan;
}

const deleteKegiatan = async(id_kegiatan)=>{
    await prisma.kegiatan.delete({
        where:{
            id_kegiatan,
        },
    });
}

const findKegiatanById = async(id_kegiatan)=>{
    const kegiatan = await prisma.kegiatan.findUnique({
        where :{
            id_kegiatan,
        },
    });
    return kegiatan;
}

const editKegiatan = async(id_kegiatan,dataKegiatan)=>{
    const kegiatan = await prisma.kegiatan.update({
        where : {
          id_kegiatan :id_kegiatan
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
      return kegiatan;
}
module.exports = {
    findKegiatan,
    insertKegiatan,
    deleteKegiatan,
    findKegiatanById,
    editKegiatan,
}
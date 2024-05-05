const prisma = require("../db");
const { findKegiatan, insertKegiatan, deleteKegiatan, findKegiatanById, editKegiatan } = require("./kegiatan.repository");

const allKegiatan = async()=>{
    const kegiatan = await findKegiatan();
    return kegiatan;
};

const createKegiatan = async(newKegiatan)=>{
    const kegiatan = await insertKegiatan(newKegiatan);
    return kegiatan;
}

const deleteKegiatanById = async(id_kegiatan)=>{
    await deleteKegiatan(id_kegiatan);
}

const patchKegiatanById = async(id_kegiatan,dataKegiatan)=>{
    await findKegiatanById(id_kegiatan);
    const kegiatan = await editKegiatan(id_kegiatan, dataKegiatan);
    return kegiatan;
}
module.exports = {
    allKegiatan,
    createKegiatan,
    deleteKegiatan,
    deleteKegiatanById,
    patchKegiatanById,

}
const prisma = require("../db")

const findPendaftaran = async()=>{
    const pendaftaran = await prisma.pendaftaran.findMany();
    return pendaftaran;
}

const insertPendaftaran = async(dataPendaftaran)=>{
    const pendaftaran = await prisma.pendaftaran.create({
        data: {
            id_kegiatan  : dataPendaftaran.id_kegiatan,
            id_mhs : dataPendaftaran.id_mhs,
            tgl_pdf   : dataPendaftaran.tgl_pdf
          },
    });
    return pendaftaran;
}

module.exports = {
    findPendaftaran,
    insertPendaftaran,

}
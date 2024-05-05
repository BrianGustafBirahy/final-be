const prisma = require("../db")

const findMahasiswa = async()=>{
    const mahasiswa = await prisma.mahasiswa.findMany();
    return mahasiswa;
}

const findMahasiswaById = async(id_mhs)=>{
    const mahasiswa = await prisma.mahasiswa.findUnique({
        where :{
            id_mhs,
        },
    });
    return mahasiswa;
}

const insertMahasiswa = async(dataMahasiswa)=>{
    const mahasiswa = await prisma.mahasiswa.create({
        data : {
            nama_mhs  : dataMahasiswa.nama_mhs,
            email_mhs : dataMahasiswa.email_mhs,
            jurusan   : dataMahasiswa.jurusan,
            Tingkat   : dataMahasiswa.Tingkat
        },
    });
    return mahasiswa;
}

const deleteMahasiswa = async(id_mhs)=>{
    await prisma.mahasiswa.delete({
        where:{
            id_mhs,
        },
    });
}

const editMahasiswa = async(id_mhs,dataMahasiswa)=>{
    const mahasiswa = await prisma.mahasiswa.update({
        where : {
          id_mhs : parseInt(id_mhs)
        },
        data : {
          nama_mhs  : dataMahasiswa.nama_mhs,
          email_mhs : dataMahasiswa.email_mhs,
          jurusan   : dataMahasiswa.jurusan,
          Tingkat   : dataMahasiswa.Tingkat
        },
      });
      return mahasiswa;
}

const findKegiatanMahasiswa = async(id_mhs)=>{
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
  
      return kegiatan;
}



module.exports = {
    findMahasiswa,
    findMahasiswaById,
    insertMahasiswa,
    deleteMahasiswa,
    editMahasiswa,
    findKegiatanMahasiswa,
}
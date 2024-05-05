const prisma = require("../db");

const findRating = async()=>{
    const rating = await prisma.rating.findMany();
    return rating;
}

const insertRating = async(dataRating)=>{
    const rating = await prisma.rating.create({
        data: {
            id_rate : dataRating.id_rate,
            id_mhs  : dataRating.id_mhs,
            id_kegiatan : dataRating.id_kegiatan,
            rating   : dataRating.rating
          },
    });
    return rating;
}

module.exports = {
    findRating,
    insertRating,
}
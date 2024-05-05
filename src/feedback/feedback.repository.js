
const prisma = require("../db")

const findFeedback = async()=>{
    const feedback = await prisma.feedback.findMany();
    return feedback;
}

const insertFeedback = async(dataFeedback)=>{
    const feedback = await prisma.feedback.create({
        data: {
            id_fb  : dataFeedback.id_fb,
            id_mhs :dataFeedback. id_mhs,
            id_kegiatan   : dataFeedback.id_kegiatan,
            comment : dataFeedback.comment
          },
    });
    return feedback;
}
module.exports = {
    findFeedback,
    insertFeedback,

}
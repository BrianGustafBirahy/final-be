const prisma = require("../db");
const { findPendaftaran, insertPendaftaran } = require("./pendaftaran.repository");

const allPendaftaran = async()=>{
    const pendaftaran = await findPendaftaran();
    return pendaftaran;
};

const createPendaftaran = async(newPendaftaran)=>{
    const pendaftaran = await insertPendaftaran(newPendaftaran);
    return pendaftaran;
}
module.exports = {
    allPendaftaran,
    createPendaftaran,
}
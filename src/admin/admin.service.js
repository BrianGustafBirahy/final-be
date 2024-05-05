const prisma = require("../db");
const { findAdmin, insertAdmin, deleteAdmin, findAdminById, editAdmin } = require("./admin.repository");

const allAdmin = async()=>{
    const admin = await findAdmin();
    return admin;
};

const createAdmin = async(newAdmin)=>{
    const admin = await insertAdmin(newAdmin);
    return admin;
}

const deleteAdminById = async(id_admin)=>{
    await deleteAdmin(id_admin);
}

const patchAdminById = async(id_admin,dataAdmin)=>{
    await findAdminById(id_admin);
    const admin = await editAdmin(id_admin, dataAdmin);
    return admin;
}

module.exports = {
    allAdmin,
    createAdmin,
    deleteAdminById,
    patchAdminById,
    
}
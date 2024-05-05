const prisma = require("../db")

const findAdmin = async()=>{
    const admin = await prisma.adminUniv.findMany();
    return admin;
}

const insertAdmin = async(dataAdmin)=>{
    const admin = await prisma.adminUniv.create({
        data: {
            id_admin  : dataAdmin.id_admin,
            nama_adm : dataAdmin.nama_adm,
            email_adm   : dataAdmin.email_adm
          },
    });
    return admin;
}

const deleteAdmin = async(id_admin)=>{
    await prisma.adminUniv.delete({
        where:{
            id_admin,
        },
    });
}

const findAdminById = async(id_admin)=>{
    const admin = await prisma.adminUniv.findUnique({
        where :{
            id_admin,
        },
    });
    return admin;
}

const editAdmin = async(id_admin,dataAdmin)=>{
    const admin = await prisma.adminUniv.update({
        where : {
          id_admin :id_admin
        },
        data : {
            id_admin : dataAdmin.id_admin,
            nama_adm  : dataAdmin.nama_adm,
            email_adm : dataAdmin.email_adm
          },
      });
      return admin;
}
module.exports = {
    findAdmin,
    insertAdmin,
    deleteAdmin,
    findAdminById,
    editAdmin,

}
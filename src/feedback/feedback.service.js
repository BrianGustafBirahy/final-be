const prisma = require("../db");
const { findFeedback, insertFeedback } = require("./feedback.repository");

const allFeedback = async()=>{
    const feedback = await findFeedback();
    return feedback;
};

const createFeedback = async(newFeedback)=>{
    const feedback = await insertFeedback(newFeedback);
    return feedback;
}


module.exports = {
    allFeedback,
    createFeedback,
}

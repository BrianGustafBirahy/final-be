const prisma = require("../db");
const { findRating, insertRating } = require("./rating.repository");

const allRating = async()=>{
    const rating = await findRating();
    return rating;
};

const createRating = async(newRating)=>{
    const rating = await insertRating(newRating);
    return rating;
}

module.exports = {
    allRating,
    createRating,

}
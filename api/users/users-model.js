const db = require("../data/dbConfig.js");

async function add(newUser) {
    const [id] = await db("users").insert(newUser)
    return findByUserId(id)
}

function findUsers() {
    return db("users")
}

function findByUserName(username) {
    return db("users")
        .select("*")
        .where("username", username)
        .first()
}

function findByUserId(id) {
    return db("users")
        .select("*")
        .where("id", id)
        .first()
}



module.exports = {
    add,
    findUsers,
    findByUserName,
    findByUserId,
} 
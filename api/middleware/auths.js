const Users = require("../users/users-model")
const bcrypt = require("bcryptjs")

const userIsUnique = async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await Users.findByUserName(username)
        if (user) {
            return res.status(400).json({
                message: "Username is already taken.",
            })
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}


const checkPayload = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password required",
        })
    } else {
        next()
    }
}


const checkUsernameExists = async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await Users.findByUserName(username)

        if (!user) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }

        const passwordValid = await bcrypt.compare(req.body.password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }

        req.user = user
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = {
    userIsUnique,
    checkPayload,
    checkUsernameExists,
} 
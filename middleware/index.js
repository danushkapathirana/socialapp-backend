const config = require("config")
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("authorization")

    if(!token) {
        return res.status(401).send({"Message": "Authorization not allowed"})
    }

    try {
        const payLoad = jwt.decode(token, config.get("tokenSecretKey"))
        req.user = payLoad.user //adding a new key into request which is called user and assign the user object which live inside the payload
        next()

    } catch (error) {
        return res.status(401).send({"Message": "Token is invalid"})
    }
}

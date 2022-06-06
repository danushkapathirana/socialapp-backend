const express = require("express")
const router = express.Router()

const userRoute = require("./users")

router.use("/user", userRoute)

module.exports = router

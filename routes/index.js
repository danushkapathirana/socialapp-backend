const express = require("express")
const router = express.Router()

const userRoute = require("./users")
const profileRoute = require("./profile")

router.use("/user", userRoute)
router.use("/profile", profileRoute)

module.exports = router

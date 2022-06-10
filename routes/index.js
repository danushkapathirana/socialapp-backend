const express = require("express")
const router = express.Router()

const userRoute = require("./users")
const profileRoute = require("./profile")
const postsRoute = require("./posts")

router.use("/user", userRoute)
router.use("/profile", profileRoute)
router.use("/posts", postsRoute)

module.exports = router

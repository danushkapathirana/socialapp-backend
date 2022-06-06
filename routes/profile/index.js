const express = require("express")
const router = express.Router()

const profileController = require("../../controllers/profile")
const middleware = require("../../middleware")

router.post("/create", middleware, profileController.profileCreateAndUpdate)

module.exports = router

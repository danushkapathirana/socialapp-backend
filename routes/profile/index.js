const express = require("express")
const router = express.Router()

const profileController = require("../../controllers/profile")
const middleware = require("../../middleware")

router.post("/", middleware, profileController.profileCreateAndUpdate)
router.get("/", middleware, profileController.fetchAllProfiles)

module.exports = router

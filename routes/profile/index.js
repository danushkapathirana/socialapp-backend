const express = require("express")
const router = express.Router()

const profileController = require("../../controllers/profile")
const middleware = require("../../middleware")

router.post("/", middleware, profileController.profileCreateAndUpdate)
router.get("/", middleware, profileController.fetchAllProfiles)
router.get("/:id", middleware, profileController.fetchProfileById)
router.post("/education", middleware, profileController.createEducation)
router.delete("/education/:id", middleware, profileController.deleteEducation)

module.exports = router

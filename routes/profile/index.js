const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const profileController = require("../../controllers/profile")
const middleware = require("../../middleware")

router.post("/", [check("location", "Location cannot be empty").not().isEmpty(), check("description", "Description cannot be empty").not().isEmpty()], middleware, profileController.profileCreateAndUpdate)
router.get("/", middleware, profileController.fetchAllProfiles)
router.get("/:id", middleware, profileController.fetchProfileById)
router.post("/education", middleware, profileController.createEducation)
router.delete("/education/:id", middleware, profileController.deleteEducation)

module.exports = router

const express = require("express")
const router = express.Router()

const userController = require("../../controllers/users")

router.post("/create", userController.userCreate)
router.post("/login", userController.userLogin)

module.exports = router

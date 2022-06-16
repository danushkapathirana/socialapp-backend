const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const userController = require("../../controllers/users")

router.post("/create", [check("name", "Name cannot be empty").not().isEmpty(), check("email", "Not a valid email").isEmail(), check("password", "Password cannot be empty").not().isEmpty()], userController.userCreate)
router.post("/login", [check("email", "Not a valid email").isEmail(), check("password", "Password cannot be empty").not().isEmpty()], userController.userLogin)

module.exports = router

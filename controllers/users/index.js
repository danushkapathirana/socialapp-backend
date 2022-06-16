const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

const User = require("../../models/User")

const userController = {
    userCreate: async (req, res) => {
        try {
            const { name, email, password } = req.body

            const errors = validationResult(req) //validation of email, password and name
            if(!errors.isEmpty()) {
                console.log(errors.errors);

                if(errors.errors.length > 0);
                {
                    const errorMsg = errors.errors.map((error) => error.msg)
                    console.log(errorMsg);
    
                    return res.status(400).send(errorMsg)
                }
            }

            const user = new User({
                name,
                email,
                password
            })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            const result = await user.save()

            const payLoad = {user: {"id": user._id}}
            const token = jwt.sign(payLoad, config.get("tokenSecretKey"), {expiresIn: 240000})

            return res.status(200).send({"Message": "Successfully created a new user", "Data": result, "Token": token})

        } catch (error) {
            return res.status(400).send({"Message": "Error occurred while creating a user", "Error": error.message})
        }
    },

    userLogin: async (req, res) => {
        try {
            const errors = validationResult(req) //validation of email and password
            if(!errors.isEmpty()) {
                console.log(errors.errors);

                if(errors.errors.length > 0);
                {
                    const errorMsg = errors.errors.map((error) => error.msg)
                    console.log(errorMsg);
    
                    return res.status(400).send(errorMsg)
                }
            }

            const { email, password } = req.body
            let user = await User.findOne( {email} ) //

            if(!user) {
                return res.status(400).send({"Message": "Invalid credential"})
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if(!isPasswordMatch) {
                return res.status(400).send({"Message": "Invalid credential"})
            }

            const payLoad = {user: {id: user._id}}
            const token = jwt.sign(payLoad, config.get("tokenSecretKey"), {expiresIn: 240000})

            return res.status(200).send({"Message": "Successfully logged in", "Data": user, "Token": token})
            // return res.status(200).send({"Message": "Successfully logged in", "Token": token})

        } catch (error) {
            console.log(error.message);
            return res.status(400).send({"Message": "Error occurred while login", "Error": error.message})
        }
    }
}

module.exports = userController

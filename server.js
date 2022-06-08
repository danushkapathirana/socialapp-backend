const express = require("express")
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser")
const config = require("config")

const routes = require("./routes")

const dbConnection = async () => {
    try {
        await mongoose.connect(config.get("url"))
        console.log("connected to the db");
    } catch (error) {
        console.log("error while connecting to the db");
    }
}

const app = express()
dbConnection()
app.use(bodyParser.json())
app.use("/app", routes)

app.listen(9000, () => {
    console.log("server started");
})

// libraries

// express
// nodemon
// mongoose
// bcryptjs -> to encrypt the data (password)
// jsonwebtoken
// config
// express-validator

require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const dashboardRoutes = require('./routes/dashboardRoutes.js')
const imageRoutes = require('./routes/imageRoutes.js')
const fileUpload = require("express-fileupload")
const path = require('path');

const app = express()
app.use(cors())

//connect to db

mongoose.connect(process.env.MONGO)
    .then(() => {

        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening!!!", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// middleware

app.use(express.json())
app.use((req, res, next) => {
    next()
})
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'uploads')));

// routes
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/dash", dashboardRoutes)
app.use("/api/v1/image", imageRoutes)


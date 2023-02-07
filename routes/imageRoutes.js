const express = require('express')
const { movePhoto } = require('../controllers/ImageSchema.js')

const router = express.Router()

router.post("/move", movePhoto)


module.exports = router

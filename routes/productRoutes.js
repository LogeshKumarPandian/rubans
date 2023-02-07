const express = require('express')
const { uploadInitial } = require('../controllers/ImageSchema.js')
const { addProduct, updateProduct, updateOtherProduct, deleteProduct, fetchAll, fetchOne, prioritizeProduct, updateImage, updateOtherProduct2, rejectImage, lastCreated } = require('../controllers/productController.js')

const router = express.Router()

router.post("/add", addProduct)
router.post("/update", updateProduct)
router.post("/updateother", updateOtherProduct)
router.post("/updateother2", updateOtherProduct2)
router.post("/delete", deleteProduct)
router.post("/fetchAll", fetchAll)
router.post("/fetchone", fetchOne)
router.post("/prioritize", prioritizeProduct)
router.post("/imgupload", uploadInitial)
router.post("/updateImage", updateImage)
router.post("/reject", rejectImage)
router.post("/last", lastCreated)


module.exports = router

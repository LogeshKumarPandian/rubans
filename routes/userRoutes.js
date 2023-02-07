const express = require('express')
const { addUser, fetchUser, updateUser, EditUser, DeleteUser, LoginUser } = require('../controllers/userController.js')

const router = express.Router()

router.post("/add", addUser)
router.post("/fetch", fetchUser)
router.post("/update", updateUser)
router.post("/edit", EditUser)
router.post("/delete", DeleteUser)
router.post("/login", LoginUser)


module.exports = router

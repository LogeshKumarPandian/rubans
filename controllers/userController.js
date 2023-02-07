require('dotenv').config()
const RubensUserSchema = require("../models/userModels.js")


const addUser = async (req, res) => {

    const data = req.body
    const userName = data.data.signUpValue.userName.toLowerCase()
    const isUserName = await RubensUserSchema.find({ userName: userName })
    const isEmailID = await RubensUserSchema.find({ emailID: data.data.signUpValue.emailID })
    const isFirstUser = await RubensUserSchema.find({ designation: "Admin" })

    if (isUserName.length > 0) {
        res.status(200).json({ "error": "error", "message": "User Name already taken. Please try with different name" })
    } else if (isEmailID.length > 0) {
        res.status(200).json({ "error": "error", "message": "Email ID already taken. Please try with different Email ID" })
    } else if (isFirstUser.length === 0 && (data.data.designation === "Admin")) {
        // console.log(isFirstUser)
        console.log("2")
        const added = await RubensUserSchema.create({
            emailID: data.data.signUpValue.emailID,
            userName: userName,
            password: data.data.signUpValue.setPassword.toLowerCase(),
            designation: data.data.designation,
            accessLevel: "Admin",
            status: "approved",
            approvedBy: "",
            approvedTime: ""
        })
        res.status(200).json({ "error": "no error", "message": "Auto Approved" })
    } else {
        console.log(isFirstUser)
        console.log("1")
        const added = await RubensUserSchema.create({
            emailID: data.data.signUpValue.emailID,
            userName: userName,
            password: data.data.signUpValue.setPassword.toLowerCase(),
            designation: data.data.designation,
            accessLevel: data.data.accessLevel,
            status: "pending",
            approvedBy: "",
            approvedTime: ""
        })
        res.status(200).json({ "error": "no error", "message": "Pending Approval" })
    }
}



const fetchUser = async (req, res) => {
    const Users = await RubensUserSchema.find()
    res.status(200).json({ "error": "no error", "data": Users })
}

const updateUser = async (req, res) => {

    const data = req.body
    const userName = data.data.userName
    const status = data.data.status
    const isUserName = await RubensUserSchema.find({ userName: userName })


    if (isUserName.length > 0) {
        if (status === "approved") {
            await RubensUserSchema.updateOne({ userName: userName }, { $set: { status: status } })
        }
        if (status === "rejected") {
            await RubensUserSchema.deleteOne({ userName: userName })
        }
        const data = await RubensUserSchema.find()
        res.status(200).json({ "error": "no error", "data": data, "message": "User Status Changed Successfully" })
    } else {
        res.status(200).json({ "error": "error", "data": data, "message": "User not found" })
    }
}

const EditUser = async (req, res) => {

    const data = req.body
    const userName = data.data.userName
    const designation = data.data.designation
    const accessLevel = data.data.accessLevel
    const isUserName = await RubensUserSchema.find({ userName: userName })

    if (isUserName.length > 0) {
        if (isUserName[0].designation === "Admin") {

            const isAdmin = await RubensUserSchema.find({ designation: "Admin", status: "approved" })
            if (isAdmin.length > 1) {

                await RubensUserSchema.updateOne({ userName: userName }, { $set: { designation: designation, accessLevel: accessLevel } })
                const data = await RubensUserSchema.find()
                res.status(200).json({ "error": "no error", "data": data, "message": "User Status updated Successfully" })
            } else {
                res.status(200).json({ "error": "error", "message": "Admin is a super user. Atleast one admin should be available" })
            }
        } else {
            await RubensUserSchema.updateOne({ userName: userName }, { $set: { designation: designation, accessLevel: accessLevel } })
            const data = await RubensUserSchema.find()
            res.status(200).json({ "error": "no error", "data": data, "message": "User Status updated Successfully" })
        }
    } else {
        res.status(200).json({ "error": "error", "message": "User not found" })
    }
}


const DeleteUser = async (req, res) => {

    const data = req.body
    const userName = data.data.userName
    const isUserName = await RubensUserSchema.find({ userName: userName })

    if (isUserName.length > 0) {
        if (isUserName[0].designation === "Admin") {

            const isAdmin = await RubensUserSchema.find({ designation: "Admin", status: "approved" })
            if (isAdmin.length > 1) {
                await RubensUserSchema.deleteOne({ userName: userName })
                res.status(200).json({ "error": "no error", "message": "User Deleted Successfully" })
            } else {
                res.status(200).json({ "error": "error", "message": "Admin is a super user. Atleast one admin should be available" })
            }
        } else {
            await RubensUserSchema.deleteOne({ userName: userName })
            res.status(200).json({ "error": "no error", "message": "User Deleted Successfully" })
        }
    } else {
        res.status(200).json({ "error": "error", "message": "User not found" })
    }
}


const LoginUser = async (req, res) => {

    const data = req.body
    const userName = data.data.loginValue.userName.toLowerCase()
    const passWord = data.data.loginValue.passWord.toLowerCase()
    const isUserName = await RubensUserSchema.find({ userName: userName })

    if (isUserName.length > 0) {

        if (isUserName[0].password === passWord) {

            if (isUserName[0].status === "pending") {
                res.status(200).json({ "error": "error", "message": "pending approval" })
            } else {
                res.status(200).json({ "error": "no error", "data": isUserName, "message": "success" })
            }
        } else {
            res.status(200).json({ "error": "error", "message": "UserName or password wrong" })
        }
    } else {
        res.status(200).json({ "error": "error", "message": "UserName or password wrong" })
    }
}

module.exports = { addUser, fetchUser, updateUser, EditUser, DeleteUser, LoginUser }

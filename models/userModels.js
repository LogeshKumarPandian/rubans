const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RubensUserSchema = new Schema({
    emailID: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        default: "",
        required: true
    },

    password: {
        type: String,
        default: "",
    },

    designation: {
        type: String,
        default: "",
    },

    accessLevel: {
        type: String,
        default: "",
    },

    status: {
        type: String,
        default: "",
    },

    approvedTime: {
        type: String,
        default: "",
    },

    approvedBy: {
        type: String,
        default: "",
    },

}, { timestamps: true })

module.exports = mongoose.model('rubensUserSchema', RubensUserSchema)
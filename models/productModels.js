const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RubansProductSchema = new Schema({

    styleID: {
        type: String,
        required: true
    },

    styleIDStatus: {
        type: String,
        required: true
    },

    styleIDCreatedTime: {
        type: String,
        required: true
    },

    adminPhoto: {
        type: Array,
        default: []
    },

    costPrice: {
        type: Number,
    },

    quantity: {
        type: Number,
    },

    vendorName: {
        type: String,
        default: ""
    },

    adminStatus: {
        type: String,
        default: ""
    },

    adminCreatedTime: {
        type: String,
        default: ""
    },

    poNumber: {
        type: String,
        default: ""
    },

    poQuantity: {
        type: String,
        default: ""
    },

    buyerStatus: {
        type: String,
        default: ""
    },

    buyerAddedTime: {
        type: String,
        default: ""
    },

    mrp: {
        type: Number,
    },

    discountSellingPrice: {
        type: Number,
    },

    title: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    baseMetal: {
        type: String,
        default: ""
    },

    collections: {
        type: String,
        default: ""
    },

    look: {
        type: String,
        default: ""
    },

    productType: {
        type: String,
        default: ""
    },

    subType: {
        type: String,
        default: ""
    },

    baseColor: {
        type: String,
        default: ""
    },

    additionalColor: {
        type: String,
        default: ""
    },

    productWeight: {
        type: String,
        default: ""
    },

    productLength: {
        type: String,
        default: ""
    },

    productWidth: {
        type: String,
        default: ""
    },

    poQty: {
        type: Number,
    },

    forwardedToPhoto2: {
        type: String,
        default: ""
    },

    forwardedToVideo: {
        type: String,
        default: ""
    },

    mercStatus: {
        type: String,
        default: ""
    },

    mercAddedTime: {
        type: String,
        default: ""
    },

    photographerPhoto: {
        type: Array,
        default: []
    },

    photographerStatus: {
        type: String,
        default: ""
    },

    photographerAddedTime: {
        type: String,
        default: ""
    },

    photographer2Photo: {
        type: Array,
        default: []
    },

    photographer2Status: {
        type: String,
        default: ""
    },

    photographer2AddedTime: {
        type: String,
        default: ""
    },

    videographerPhoto: {
        type: Array,
        default: []
    },

    videographerStatus: {
        type: String,
        default: ""
    },

    videographerAddedTime: {
        type: String,
        default: ""
    },

    photo1toEditorPhoto: {
        type: Array,
        default: []
    },

    photo1toEditorStatus: {
        type: String,
        default: ""
    },

    photo1toEditorComments: {
        type: String,
        default: ""
    },

    photo1toEditorAddedTime: {
        type: String,
        default: ""
    },
    photo2toEditorPhoto: {
        type: Array,
        default: []
    },

    photo2toEditorStatus: {
        type: String,
        default: ""
    },

    photo2toEditorComments: {
        type: String,
        default: ""
    },

    photo2toEditorAddedTime: {
        type: String,
        default: ""
    },

    videotoEditorPhoto: {
        type: Array,
        default: []
    },

    videotoEditorStatus: {
        type: String,
        default: ""
    },

    videotoEditorComments: {
        type: String,
        default: ""
    },

    videotoEditorAddedTime: {
        type: String,
        default: ""
    },

    finalEditorStatus: {
        type: String,
        default: ""
    },

    photo1toQc: {
        type: String,
        default: ""
    },

    photo1toQcStatus: {
        type: String,
        default: ""
    },

    photo1toQcComments: {
        type: String,
        default: ""
    },

    photo1toQcAddedTime: {
        type: String,
        default: ""
    },

    photo2toQc: {
        type: String,
        default: ""
    },

    photo2toQcStatus: {
        type: String,
        default: ""
    },

    photo2toQcComments: {
        type: String,
        default: ""
    },

    photo2toQcAddedTime: {
        type: String,
        default: ""
    },
    videotoQc: {
        type: String,
        default: ""
    },

    videotoQcStatus: {
        type: String,
        default: ""
    },

    videotoQcComments: {
        type: String,
        default: ""
    },

    videotoQcAddedTime: {
        type: String,
        default: ""
    },

    finalQcStatus: {
        type: String,
        default: ""
    },

    lastUpdate: {
        type: String,
        default: ""
    },

    lastUpdateTime: {
        type: String,
        default: ""
    },

    showPhoto: {
        type: Array,
        default: []
    },

    finalStatus: {
        type: String,
        default: ""
    },

    myntraStyleID: {
        type: String,
        default: ""
    },

    catalogStatus: {
        type: String,
        default: ""
    },

    catalogAddedTime: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        default: ""
    },
}, { timestamps: true })

module.exports = mongoose.model('RubansProductSchema', RubansProductSchema)
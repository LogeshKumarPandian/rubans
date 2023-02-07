const RubensProductSchema = require("../models/productModels.js")


const kpi = async (req, res) => {

    const data = await RubensProductSchema.find()

    if (data.length > 0) {

        var created = data.length
        var pending = data.filter(function (product) {
            return product.finalStatus !== "closed"
        }).length
        var admin = data.filter(function (product) {
            return product.adminStatus === "pending"
        }).length
        var merchandiser = data.filter(function (product) {
            return product.mercStatus === "pending"
        }).length
        var buyer = data.filter(function (product) {
            return product.buyerStatus === "pending"
        }).length
        var photographer1 = data.filter(function (product) {
            return product.photographerStatus === "pending"
        }).length
        var photographer2 = data.filter(function (product) {
            return product.photographer2Status === "pending"
        }).length
        var videographer = data.filter(function (product) {
            return product.videographerStatus === "pending"
        }).length
        var editor = data.filter(function (product) {
            return product.finalEditorStatus === "pending"
        }).length
        var qc = data.filter(function (product) {
            return product.finalQcStatus === "pending"
        }).length
        var catalog = data.filter(function (product) {
            return product.catalogStatus === "pending"
        }).length

        const value = {
            "created": created, "pending": pending, "admin": admin,
            "merchandiser": merchandiser, "buyer": buyer, "photographer1": photographer1,
            "photographer2": photographer2, "videographer": videographer,
            "editor": editor, "qc": qc, "catalog": catalog
        }
        res.status(200).json({ "error": "no error", "data": value, "message": "kpi successfull" })
    } else {
        res.status(200).json({ "error": "error", "data": "no data", "message": "something went wrong" })

    }
}

const kpiValue = async (req, res) => {

    const data = req.body
    const value = data.data.selected
    const allData = await RubensProductSchema.find()

    if (allData.length > 0) {

        if (value === "Created") {
            if (allData.length > 0) {
                res.status(200).json({ "error": "no error", "data": allData, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Pending") {
            if (allData.length > 0) {
                var pending = allData.filter(function (product) {
                    return product.finalStatus !== "closed"
                })
                res.status(200).json({ "error": "no error", "data": pending, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Admin") {
            if (allData.length > 0) {
                var admin = allData.filter(function (product) {
                    return product.adminStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": admin, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }


        if (value === "Merchandiser") {
            if (allData.length > 0) {
                var merchandiser = allData.filter(function (product) {
                    return product.mercStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": merchandiser, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Buyer") {
            if (allData.length > 0) {
                var buyer = allData.filter(function (product) {
                    return product.buyerStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": buyer, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Photographer1") {
            if (allData.length > 0) {
                var photographer1 = allData.filter(function (product) {
                    return product.photographerStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": photographer1, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Photographer2") {
            if (allData.length > 0) {
                var photographer2 = allData.filter(function (product) {
                    return product.photographer2Status === "pending"
                })
                res.status(200).json({ "error": "no error", "data": photographer2, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Videographer") {
            if (allData.length > 0) {
                var videographer = allData.filter(function (product) {
                    return product.videographerStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": videographer, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Editor") {
            if (allData.length > 0) {
                var editor = allData.filter(function (product) {
                    return product.finalEditorStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": editor, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Quality Control") {
            if (allData.length > 0) {
                var qc = allData.filter(function (product) {
                    return product.finalQcStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": qc, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }

        if (value === "Catalog") {
            if (allData.length > 0) {
                var catalog = allData.filter(function (product) {
                    return product.catalogStatus === "pending"
                })
                res.status(200).json({ "error": "no error", "data": catalog, "message": "fetching successfull" })
            } else {
                res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
            }
        }
    } else {
        res.status(200).json({ "error": "error", "data": "no data", "message": "fetching successfull" })
    }

}

module.exports = { kpi, kpiValue }

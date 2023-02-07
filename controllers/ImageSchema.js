const path = require("path")
var fs = require('fs');
var fse = require('fs-extra');
// const RubensProductSchema = require("../models/productModels.js")
// const downloadsFolder = require('downloads-folder');

const uploadInitial = async (req, res) => {

    const name = req.files.imagename.name
    const extension = name.split(".").pop()
    const file = req.files.imagename
    var styleID = req.body.styleID + "_" + req.body.counter + "." + extension
    const user = req.body.user
    const p1c = req.body.p1c
    const p2c = req.body.p2c
    const vc = req.body.vc

    var downloadFolder = path.join(process.env.USERPROFILE, "/Downloads/");

    let uploadPath = path.join(__dirname, '..', 'uploads', user, req.body.styleID)
    let uploadPath1 = path.join(downloadFolder, 'RUBANS', user, req.body.styleID)

    let finalPath = path.join(__dirname, '..', 'uploads', user, req.body.styleID, styleID)
    let finalPath1 = path.join(downloadFolder, 'RUBANS', user, req.body.styleID, styleID)
    let displayPath = path.join(user, req.body.styleID, styleID)


    if (user === "Admin") {
        uploadPath = path.join(__dirname, '..', 'uploads', user, "Phone Photo", req.body.styleID)
        uploadPath1 = path.join(downloadFolder, 'RUBANS', user, "Phone Photo", req.body.styleID)

        finalPath = path.join(__dirname, '..', 'uploads', user, "Phone Photo", req.body.styleID, styleID)
        finalPath1 = path.join(downloadFolder, 'RUBANS', user, "Phone Photo", req.body.styleID, styleID)
        displayPath = path.join(user, "Phone Photo", req.body.styleID, styleID)
    }

    if (user === "Editor") {
        if (p1c === "true") {
            uploadPath = path.join(__dirname, '..', 'uploads', user, "Photographer1", req.body.styleID)
            uploadPath1 = path.join(downloadFolder, 'RUBANS', user, "Photographer1", req.body.styleID)

            finalPath = path.join(__dirname, '..', 'uploads', user, "Photographer1", req.body.styleID, styleID)
            finalPath1 = path.join(downloadFolder, 'RUBANS', user, "Photographer1", req.body.styleID, styleID)
            displayPath = path.join(user, "Photographer1", req.body.styleID, styleID)

        } else if (p2c === "true") {
            uploadPath = path.join(__dirname, '..', 'uploads', user, "Photographer2", req.body.styleID)
            uploadPath1 = path.join(downloadFolder, 'RUBANS', user, "Photographer2", req.body.styleID)

            finalPath = path.join(__dirname, '..', 'uploads', user, "Photographer2", req.body.styleID, styleID)
            finalPath1 = path.join(downloadFolder, 'RUBANS', user, "Photographer2", req.body.styleID, styleID)
            displayPath = path.join(user, "Photographer2", req.body.styleID, styleID)

        } else if (vc === "true") {
            uploadPath = path.join(__dirname, '..', 'uploads', user, "Videographer", req.body.styleID)
            uploadPath1 = path.join(downloadFolder, 'RUBANS', user, "Videographer", req.body.styleID)

            finalPath = path.join(__dirname, '..', 'uploads', user, "Videographer", req.body.styleID, styleID)
            finalPath1 = path.join(downloadFolder, 'RUBANS', user, "Videographer", req.body.styleID, styleID)
            displayPath = path.join(user, "Videographer", req.body.styleID, styleID)
        }
    }


    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    if (!fs.existsSync(uploadPath1)) {
        fs.mkdirSync(uploadPath1, { recursive: true });
    }

    await file.mv(finalPath, (err) => {
        if (err) {
            return res.send(err)
        }
    })

    await file.mv(finalPath1, (err) => {
        if (err) {
            return res.send(err)
        }
    })

    res.status(200).json({ "error": "no error", "path": displayPath, "styleID": styleID, "ext": extension })

}

const movePhoto = async (req, res) => {
    const styleID = req.body.data.styleID
    const user = req.body.data.userDesignation
    const p1c = req.body.data.p1c
    const p2c = req.body.data.p2c
    const vc = req.body.data.vc
    const photoPath = req.body.data.photoPath

    console.log(styleID, user, p1c, p2c, vc, photoPath)

    var downloadFolder = path.join(process.env.USERPROFILE, "/Downloads/");

    let source1; let source2; let dest1; let dest2

    if (p1c === true) {
        source1 = path.join(__dirname, '..', 'uploads', "Editor", "Photographer1", styleID)
        source2 = path.join(downloadFolder, 'RUBANS', "Editor", "Photographer1", styleID)

        dest1 = path.join(__dirname, '..', 'uploads', "Admin", "Photographer1", styleID)
        dest2 = path.join(downloadFolder, 'RUBANS', "Admin", "Photographer1", styleID)

    } else if (p2c === true) {
        source1 = path.join(__dirname, '..', 'uploads', "Editor", "Photographer2", styleID)
        source2 = path.join(downloadFolder, 'RUBANS', "Editor", "Photographer2", styleID)

        dest1 = path.join(__dirname, '..', 'uploads', "Admin", "Photographer2", styleID)
        dest2 = path.join(downloadFolder, 'RUBANS', "Admin", "Photographer2", styleID)

    } else if (vc === true) {
        source1 = path.join(__dirname, '..', 'uploads', "Editor", "Videographer", styleID)
        source2 = path.join(downloadFolder, 'RUBANS', "Editor", "Videographer", styleID)

        dest1 = path.join(__dirname, '..', 'uploads', "Admin", "Videographer", styleID)
        dest2 = path.join(downloadFolder, 'RUBANS', "Admin", "Videographer", styleID)
    }

    if (fs.existsSync(source1)) {
        console.log(1)
        if (!fs.existsSync(dest1)) {
            console.log(2)
            fs.mkdirSync(dest1, { recursive: true });
            fse.copy(source1, dest1, { overwrite: true })
        }
    }

    if (fs.existsSync(source2)) {
        console.log(3)
        if (!fs.existsSync(dest2)) {
            console.log(4)
            fs.mkdirSync(dest2, { recursive: true });
            fse.copy(source2, dest2, { overwrite: true })
        }
    }

    res.status(200).json({ "error": "no error", "message": "successfully moved" })
}

module.exports = { uploadInitial, movePhoto }

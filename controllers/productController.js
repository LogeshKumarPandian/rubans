const RubensProductSchema = require("../models/productModels.js")


const addProduct = async (req, res) => {

    const data = req.body
    const styleID = data.data.styleID.toLowerCase()
    const isStyleID = await RubensProductSchema.find({ styleID: styleID })

    if (isStyleID.length > 0) {
        res.status(200).json({ "error": "error", "message": "Style ID already taken" })
    } else {

        const added = await RubensProductSchema.create({
            styleID: styleID,
            styleIDStatus: "created",
            finalQcStatus: "pending",
            adminStatus: "pending",
            styleIDCreatedTime: new Date(),
            lastUpdate: "Admin",
            lastUpdateTime: new Date()
        })

        res.status(200).json({ "error": "no error", "message": "Style ID Added Successfully" })
    }
}




const updateProduct = async (req, res) => {

    const data = req.body
    const styleID = data.data.form.styleID.toLowerCase()
    const isStyleID = await RubensProductSchema.find({ styleID: styleID })

    if (isStyleID.length > 0) {

        await RubensProductSchema.updateOne({ styleID: styleID }, {
            $set: {
                costPrice: data.data.form2.costPrice,
                quantity: data.data.form2.quantity,
                vendorName: data.data.form2.vendorName,
                adminStatus: "completed",
                mercStatus: "pending",
                adminCreatedTime: new Date(),
                lastUpdate: "Admin",
                lastUpdateTime: new Date()
            }
        }).catch(
            error => {
                res.status(200).json({ "error": "error", "message": "Something went wrong" })
            }
        );

        const updateStyleID = await RubensProductSchema.find({ styleID: styleID })
        res.status(200).json({ "error": "no error", "data": updateStyleID, "message": "success" })

    } else {
        res.status(200).json({ "error": "error", "message": "Style ID not found" })
    }
}




const updateOtherProduct = async (req, res) => {

    const data = req.body
    const styleID = data.data.styleID.toLowerCase()
    const userDesignation = data.data.userDesignation
    const isStyleID = await RubensProductSchema.find({ styleID: styleID })
    const p1c = data.data.p1c
    const p2c = data.data.p2c
    const vc = data.data.vc

    if (isStyleID.length > 0) {

        if (userDesignation === "Admin") {
            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    costPrice: data.data.form2.costPrice,
                    quantity: data.data.form2.quantity,
                    vendorName: data.data.form2.vendorName,
                    adminStatus: "completed",
                    finalQcStatus: "",
                    mercStatus: "pending",
                    adminPhoto: data.data.photoPath,
                    showPhoto: data.data.photoPath,
                    adminCreatedTime: new Date(),
                    lastUpdate: "Admin",
                    lastUpdateTime: new Date()
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }

        if (userDesignation === "Merchandiser") {

            var photo2Status = "NA"
            var videoStatus = "NA"

            if (data.data.photo2Checked === true) {
                photo2Status = "pending"
            }

            if (data.data.videoChecked === true) {
                videoStatus = "pending"
            }

            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    mrp: data.data.form3.mrp,
                    discountSellingPrice: data.data.form3.discountSellingPrice,
                    title: data.data.form3.title,
                    description: data.data.form3.description,
                    baseMetal: data.data.form3.baseMetal,
                    collections: data.data.form3.collections,
                    look: data.data.form3.look,
                    productType: data.data.form3.productType,
                    subType: data.data.form3.subType,
                    baseColor: data.data.form3.baseColor,
                    additionalColor: data.data.form3.additionalColor,
                    productWeight: data.data.form3.productWeight,
                    productLength: data.data.form3.productLength,
                    productWidth: data.data.form3.productWidth,
                    poQty: data.data.poQty,
                    forwardedToPhoto2: data.data.photo2Checked,
                    forwardedToVideo: data.data.videoChecked,
                    photographerStatus: "pending",
                    photographer2Status: photo2Status,
                    videographerStatus: videoStatus,
                    mercStatus: "completed",
                    buyerStatus: "pending",
                    mercAddedTime: new Date(),
                    lastUpdate: "Merchandiser",
                    lastUpdateTime: new Date()
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }

        if (userDesignation === "Buyer") {
            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    poNumber: data.data.form6.ponumber,
                    poQuantity: data.data.form6.poquantity,
                    buyerStatus: "completed",
                    buyerAddedTime: new Date(),
                    lastUpdate: "Buyer",
                    lastUpdateTime: new Date()
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }

        if (userDesignation === "Catalog") {
            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    myntraStyleID: data.data.form7.myntrastyleid,
                    catalogStatus: "completed",
                    catalogAddedTime: new Date(),
                    lastUpdate: "Catalog",
                    lastUpdateTime: new Date()
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }


        if (userDesignation === "Photographer1") {
            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    photographerPhoto: data.data.photoPath,
                    showPhoto: data.data.photoPath,
                    photographerStatus: "completed",
                    photographerAddedTime: new Date(),
                    photo1toEditorStatus: "pending",
                    photo1toEditorComments: "",
                    finalEditorStatus: "pending",
                    lastUpdate: "Photographer1",
                    lastUpdateTime: new Date()
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }

        if (userDesignation === "Photographer2") {
            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    photographer2Photo: data.data.photoPath,
                    showPhoto: data.data.photoPath,
                    photographer2Status: "completed",
                    photographer2AddedTime: new Date(),
                    photo2toEditorStatus: "pending",
                    photo2toEditorComments: "",
                    finalEditorStatus: "pending",
                    lastUpdate: "Photographer2",
                    lastUpdateTime: new Date()
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }


        if (userDesignation === "Videographer") {
            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    videographerPhoto: data.data.photoPath,
                    showPhoto: data.data.photoPath,
                    videographerStatus: "completed",
                    videographerAddedTime: new Date(),
                    videotoEditorStatus: "pending",
                    videotoEditorComments: "",
                    finalEditorStatus: "pending",
                    lastUpdate: "Videographer",
                    lastUpdateTime: new Date()
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }

        if (userDesignation === "Editor") {
            if (p1c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photo1toEditorPhoto: data.data.photoPath,
                        showPhoto: data.data.photoPath,
                        photo1toEditorStatus: "completed",
                        photo1toQcStatus: "pending",
                        finalQcStatus: "pending",
                        photo1toQcComments: "",
                        photo1toEditorAddedTime: new Date(),
                        lastUpdate: "Editor",
                        lastUpdateTime: new Date()
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                );
            } else if (p2c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photo2toEditorPhoto: data.data.photoPath,
                        showPhoto: data.data.photoPath,
                        photo2toEditorStatus: "completed",
                        photo2toQcStatus: "pending",
                        finalQcStatus: "pending",
                        photo2toQcComments: "",
                        photo2toEditorAddedTime: new Date(),
                        lastUpdate: "Editor",
                        lastUpdateTime: new Date()
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                );
            } else if (vc === true) {

                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        videotoEditorPhoto: data.data.photoPath,
                        showPhoto: data.data.photoPath,
                        videotoEditorStatus: "completed",
                        videotoQcStatus: "pending",
                        finalQcStatus: "pending",
                        videotoQcComments: "",
                        videotoEditorAddedTime: new Date(),
                        lastUpdate: "Editor",
                        lastUpdateTime: new Date()
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                );
            }

            const isEdited = await RubensProductSchema.find({ styleID: styleID })

            var a; var b; var c

            if (isEdited[0].photo1toEditorStatus === "completed" || isEdited[0].photo1toEditorStatus === "") {
                a = "completed"
            }
            if (isEdited[0].photo2toEditorStatus === "completed" || isEdited[0].photo2toEditorStatus === "") {
                b = "completed"
            }
            if (isEdited[0].videotoEditorStatus === "completed" || isEdited[0].videotoEditorStatus === "") {
                c = "completed"
            }

            if (isEdited.length > 0) {
                if (a === "completed" && b === "completed" && c === "completed") {
                    await RubensProductSchema.updateOne({ styleID: styleID }, {
                        $set: {
                            finalEditorStatus: "completed",
                            lastUpdate: "Editor",
                            lastUpdateTime: new Date()
                        }
                    }).catch(
                        error => {
                            res.status(200).json({ "error": "error", "message": "Something went wrong" })
                        }
                    );
                }
            }
        }


        if (userDesignation === "Quality Control") {
            if (p1c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photo1toQcStatus: "completed",
                        photo1toQcAddedTime: new Date(),
                        lastUpdate: "Quality Control",
                        lastUpdateTime: new Date()
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                );
            } else if (p2c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photo2toQcStatus: "completed",
                        photo2toQcAddedTime: new Date(),
                        lastUpdate: "Quality Control",
                        lastUpdateTime: new Date()
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                );
            } else if (vc === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        videotoQcStatus: "completed",
                        videotoQcAddedTime: new Date(),
                        lastUpdate: "Quality Control",
                        lastUpdateTime: new Date()
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                );
            }

            const isEdited = await RubensProductSchema.find({ styleID: styleID })

            var a; var b; var c; var d; var e; var f

            if (isEdited[0].photo1toQcStatus === "completed" || isEdited[0].photo1toQcStatus === "") {
                a = "completed"
            }
            if (isEdited[0].photo2toQcStatus === "completed" || isEdited[0].photo2toQcStatus === "") {
                b = "completed"
            }
            if (isEdited[0].videotoQcStatus === "completed" || isEdited[0].videotoQcStatus === "") {
                c = "completed"
            }
            if (isEdited[0].photographerStatus === "completed" || isEdited[0].photographerStatus === "") {
                d = "completed"
            }
            if (isEdited[0].photographer2Status === "completed" || isEdited[0].photographer2Status === "" || isEdited[0].photographer2Status === "NA") {
                e = "completed"
            }
            if (isEdited[0].videographerStatus === "completed" || isEdited[0].videographerStatus === "" || isEdited[0].videographerStatus === "NA") {
                f = "completed"
            }

            if (isEdited.length > 0) {
                if (a === "completed" && b === "completed" && c === "completed") {
                    await RubensProductSchema.updateOne({ styleID: styleID }, {
                        $set: {
                            finalQcStatus: "completed",
                            lastUpdate: "Quality Control",
                            lastUpdateTime: new Date()
                        }
                    }).catch(
                        error => {
                            res.status(200).json({ "error": "error", "message": "Something went wrong" })
                        }
                    );
                }
            }

            if (isEdited.length > 0) {
                if (a === "completed" && b === "completed" && c === "completed" && d === "completed" && e === "completed" && f === "completed") {
                    await RubensProductSchema.updateOne({ styleID: styleID }, {
                        $set: {
                            finalStatus: "closed",
                            catalogStatus: "pending",
                        }
                    }).catch(
                        error => {
                            res.status(200).json({ "error": "error", "message": "Something went wrong" })
                        }
                    );
                }
            }

        }

        const fetch = await RubensProductSchema.find()
        res.status(200).json({ "error": "no error", "data": fetch, "message": "success" })

    } else {
        res.status(200).json({ "error": "error", "message": "Style ID not found" })
    }
}





const updateOtherProduct2 = async (req, res) => {

    const data = req.body
    const userDesignation = data.data.userDesignation
    const styleID = data.data.styleID.toLowerCase()
    const isStyleID = await RubensProductSchema.find({ styleID: styleID })

    if (isStyleID.length > 0) {

        if (userDesignation === "Admin") {
            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    costPrice: data.data.form2.costPrice,
                    quantity: data.data.form2.quantity,
                    vendorName: data.data.form2.vendorName,
                    adminStatus: "completed",
                    adminPhoto: data.data.photoPath,
                    showPhoto: data.data.photoPath,
                    adminCreatedTime: new Date(),
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }

        if (userDesignation === "Merchandiser") {

            var photo2Status = "NA"
            var videoStatus = "NA"

            if (data.data.photo2Checked === true) {
                photo2Status = "pending"
            }

            if (data.data.videoChecked === true) {
                videoStatus = "pending"
            }

            await RubensProductSchema.updateOne({ styleID: styleID }, {
                $set: {
                    mrp: data.data.form3.mrp,
                    discountSellingPrice: data.data.form3.discountSellingPrice,
                    title: data.data.form3.title,
                    description: data.data.form3.description,
                    baseMetal: data.data.form3.baseMetal,
                    collections: data.data.form3.collections,
                    look: data.data.form3.look,
                    productType: data.data.form3.productType,
                    subType: data.data.form3.subType,
                    baseColor: data.data.form3.baseColor,
                    additionalColor: data.data.form3.additionalColor,
                    productWeight: data.data.form3.productWeight,
                    productLength: data.data.form3.productLength,
                    productWidth: data.data.form3.productWidth,
                    poQty: data.data.poQty,
                    forwardedToPhoto2: data.data.photo2Checked,
                    forwardedToVideo: data.data.videoChecked,
                    photographerStatus: "pending",
                    photographer2Status: photo2Status,
                    videographerStatus: videoStatus,
                    mercStatus: "completed",
                    buyerStatus: "pending",
                    mercAddedTime: new Date(),
                }
            }).catch(
                error => {
                    res.status(200).json({ "error": "error", "message": "Something went wrong" })
                }
            );
        }

        const fetch = await RubensProductSchema.find()
        res.status(200).json({ "error": "no error", "data": fetch, "message": "success" })

    } else {
        res.status(200).json({ "error": "error", "message": "Style ID not found" })
    }
}





const deleteProduct = async (req, res) => {

    const data = req.body
    const styleID = data.data.styleID.toLowerCase()
    const isStyleID = await RubensProductSchema.find({ styleID: styleID })

    if (isStyleID.length > 0) {
        await RubensProductSchema.deleteOne({ styleID: styleID })

        // let uploadPath = path.join(__dirname, '..', 'uploads', user, req.body.styleID)
        // let uploadPath1 = path.join("C:/Users/GC-Logesh/Downloads", 'RUBANS', user, req.body.styleID)

        // if (fs.existsSync(uploadPath)) {
        //     fs.rmSync(uploadPath, { recursive: true });
        // }

        // if (fs.existsSync(uploadPath1)) {
        //     fs.rmSync(uploadPath1, { recursive: true });
        // }

        res.status(200).json({ "error": "no error", "message": "Style ID deteled successfully" })
    } else {
        res.status(200).json({ "error": "error", "message": "Style ID not found" })
    }
}




const fetchAll = async (req, res) => {
    const fetch = await RubensProductSchema.find()
    res.status(200).json({ "error": "no error", "data": fetch, "message": "Style ID deteled successfully" })
}




const fetchOne = async (req, res) => {

    const data = req.body
    const styleID = data.data.styleID.toLowerCase()
    const fetch = await RubensProductSchema.find({ styleID: styleID })
    res.status(200).json({ "error": "no error", "data": fetch, "message": "Style ID fetched successfully" })
}


const prioritizeProduct = async (req, res) => {

    const data = req.body
    const styleID = data.data.styleID.toLowerCase()
    const isStyleID = await RubensProductSchema.find({ styleID: styleID })

    if (isStyleID.length > 0) {

        await RubensProductSchema.updateOne({ styleID: styleID }, {
            $set: {
                priority: "yes",
                lastUpdateTime: new Date()
            }
        }).catch(
            error => {
                res.status(200).json({ "error": "error", "message": "Something went wrong" })
            }
        );

        const fetch = await RubensProductSchema.find()
        res.status(200).json({ "error": "no error", "data": fetch, "message": "success" })

    } else {
        res.status(200).json({ "error": "error", "message": "Style ID not found" })
    }
}



const updateImage = async (req, res) => {

    const data = req.body
    const styleID = data.data.styleID.toLowerCase()
    const photoPath = data.data.photoPath
    const isStyleID = await RubensProductSchema.find({ styleID: styleID })

    if (isStyleID.length > 0) {

        await RubensProductSchema.updateOne({ styleID: styleID }, {
            $set: {
                adminPhoto: photoPath,
                showPhoto: photoPath
            }

        }).catch(
            error => {
                res.status(200).json({ "error": "error", "message": "Something went wrong" })
            }
        );
        const fetch = await RubensProductSchema.find()
        res.status(200).json({ "error": "no error", "data": fetch, "message": "success" })

    } else {
        res.status(200).json({ "error": "error", "message": "Style ID not found" })
    }
}


const rejectImage = async (req, res) => {

    const data = req.body
    const styleID = data.data.styleID.toLowerCase()
    const p1c = data.data.p1c
    const p2c = data.data.p2c
    const vc = data.data.vc
    const user = data.data.user
    const comments = data.data.comments

    if (user === "Editor") {
        const isStyleID = await RubensProductSchema.find({ styleID: styleID })

        if (isStyleID.length > 0) {
            const imagePath = isStyleID[0].adminPhoto

            if (p1c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photographerStatus: "pending",
                        photographerAddedTime: "",
                        photographerPhoto: "",
                        photo1toEditorStatus: "",
                        photo1toEditorComments: comments,
                        lastUpdate: "Editor",
                        lastUpdateTime: new Date(),
                        showPhoto: imagePath
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                )
            } else if (p2c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photographer2Status: "pending",
                        photographer2AddedTime: "",
                        photographer2Photo: "",
                        photo2toEditorStatus: "",
                        photo2toEditorComments: comments,
                        lastUpdate: "Editor",
                        lastUpdateTime: new Date(),
                        showPhoto: imagePath
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                )
            } else if (vc === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        videographerStatus: "pending",
                        videographerAddedTime: "",
                        videographerPhoto: "",
                        videotoEditorStatus: "",
                        videotoEditorComments: comments,
                        lastUpdate: "Editor",
                        lastUpdateTime: new Date(),
                        showPhoto: imagePath
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                )
            }

            const isStyleIDNew = await RubensProductSchema.find({ styleID: styleID })

            if (isStyleIDNew.length > 0) {
                if (isStyleIDNew[0].photo1toEditorStatus === "" && isStyleIDNew[0].photo2toEditorStatus === "" && isStyleIDNew[0].videotoEditorStatus === "") {
                    await RubensProductSchema.updateOne({ styleID: styleID }, {
                        $set: {
                            finalEditorStatus: ""
                        }
                    }).catch(
                        error => {
                            res.status(200).json({ "error": "error", "message": "Something went wrong" })
                        }
                    )
                }
            }

            const isStyleIDNew1 = await RubensProductSchema.find({ styleID: styleID })

            res.status(200).json({ "error": "success", data: isStyleIDNew1, "message": "Successfully updated" })

        } else {
            res.status(200).json({ "error": "error", "message": "Style ID not found" })
        }

    } else if (user === "Quality Control") {

        const isStyleID = await RubensProductSchema.find({ styleID: styleID })

        if (isStyleID.length > 0) {
            var imagePath

            if (isStyleID[0].photographerPhoto != "") {
                imagePath = isStyleID[0].photographerPhoto
            } else if (isStyleID[0].photographer2Photo != "") {
                imagePath = isStyleID[0].photographer2Photo
            } else {
                imagePath = isStyleID[0].adminPhoto
            }

            if (p1c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photo1toEditorStatus: "pending",
                        photo1toEditorAddedTime: "",
                        photo1toEditorPhoto: "",
                        photo1toQcStatus: "",
                        photo1toQcComments: comments,
                        finalEditorStatus: "pending",
                        lastUpdate: "Quality Control",
                        lastUpdateTime: new Date(),
                        showPhoto: imagePath
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                )
            } else if (p2c === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        photo2toEditorStatus: "pending",
                        photo2toEditorAddedTime: "",
                        photo2toEditorPhoto: "",
                        photo2toQcStatus: "",
                        lastUpdate: "Quality Control",
                        finalEditorStatus: "pending",
                        photo2toQcComments: comments,
                        lastUpdateTime: new Date(),
                        showPhoto: imagePath
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                )
            } else if (vc === true) {
                await RubensProductSchema.updateOne({ styleID: styleID }, {
                    $set: {
                        videotoEditorStatus: "pending",
                        videotoEditorAddedTime: "",
                        videotoEditorPhoto: "",
                        videotoQcStatus: "",
                        finalEditorStatus: "pending",
                        lastUpdate: "Quality Control",
                        videotoQcComments: comments,
                        lastUpdateTime: new Date(),
                        showPhoto: imagePath
                    }
                }).catch(
                    error => {
                        res.status(200).json({ "error": "error", "message": "Something went wrong" })
                    }
                )
            }

            const isStyleIDNew = await RubensProductSchema.find({ styleID: styleID })

            if (isStyleIDNew.length > 0) {
                if (isStyleIDNew[0].photo1toQcStatus === "" && isStyleIDNew[0].photo2toQcStatus === "" && isStyleIDNew[0].videotoQcStatus === "") {
                    await RubensProductSchema.updateOne({ styleID: styleID }, {
                        $set: {
                            finalQcStatus: ""
                        }
                    }).catch(
                        error => {
                            res.status(200).json({ "error": "error", "message": "Something went wrong" })
                        }
                    )
                }
            }

            const isStyleIDNew1 = await RubensProductSchema.find({ styleID: styleID })

            res.status(200).json({ "error": "success", data: isStyleIDNew1, "message": "Successfully updated" })

        } else {
            res.status(200).json({ "error": "error", "message": "Style ID not found" })
        }

    }
}


const lastCreated = async (req, res) => {

    const fetch = await RubensProductSchema.find().sort({ styleIDCreatedTime: -1 }).limit(1)
    if (fetch.length > 0) {
        res.status(200).json({ "error": "no error", "data": fetch[0].styleID, "message": "Style ID fetched successfully" })
    } else {
        res.status(200).json({ "error": "error", "data": "no value", "message": "" })
    }
}



// const DateFormat = () => {
//     var date = new Date();
//     var dateStr =
//         ("00" + date.getDate()).slice(-2) + "/" +
//         ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
//         date.getFullYear() + " " +
//         ("00" + date.getHours()).slice(-2) + ":" +
//         ("00" + date.getMinutes()).slice(-2) + ":" +
//         ("00" + date.getSeconds()).slice(-2);

//     return dateStr
// }

module.exports = { addProduct, updateProduct, updateOtherProduct, updateOtherProduct2, deleteProduct, fetchAll, fetchOne, prioritizeProduct, updateImage, rejectImage, lastCreated }



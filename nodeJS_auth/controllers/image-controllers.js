const Image = require('../model/image')
const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers")

const uploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required please upload an Image"
            })
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path)

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save()

        res.status(201).json({
            success: true,
            message: "Image Uploaded successfully",
            image: newlyUploadedImage
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something Went Wrong !Please try again"
        })
    }
}

module.exports = {
    uploadImage
}
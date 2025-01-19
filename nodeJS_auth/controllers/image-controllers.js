const Image = require('../model/image')
const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers")
const fs = require("fs")
const cloudinary = require("../config/cloudinary")

const uploadImageController = async (req, res) => {
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
        // if you want to remove images from local storage
        fs.unlinkSync(req.file.path)

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


const fetchImagesContoller = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'async' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {}
        sortObj[sortBy] = sortOrder

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit)
        // const images = await Image.find({})
        res.status(200).json({
            success: true,
            data: images,
            totalPages: totalPages,
            totalImages: totalImages,
            currentPage: page,


        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something Went Wrong !Please try again"
        })
    }
}


const deleteImageController = async (req, res) => {
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted)
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image Not Found"
            })
        }


        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this image "
            })
        }


        await cloudinary.uploader.destroy(image.publicId)

        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted)

        res.status(200).json({
            success: true,
            message: "Image deleted successfully"
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
    uploadImageController,
    fetchImagesContoller,
    deleteImageController
}
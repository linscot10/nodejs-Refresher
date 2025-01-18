const express = require("express")
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require('../middleware/admin-middleware')
const uploadMiddleware = require("../middleware/upload-middlware")
const { uploadImageController, fetchImagesContoller } = require('../controllers/image-controllers')
const router = express.Router()

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImageController)
router.get('/get', authMiddleware, fetchImagesContoller)

module.exports = router
const express = require("express")
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require('../middleware/admin-middleware')

const router = express.Router()

router.post('/upload', authMiddleware, adminMiddleware)

module.exports = router
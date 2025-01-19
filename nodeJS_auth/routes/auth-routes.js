const express = require("express")
const { loginUser, registerUser, changePassword } = require("../controllers/auth-controllers")
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')

router.post("/register", registerUser);
router.post("/login", loginUser)
router.post("/reset-password",authMiddleware, changePassword)




module.exports = router;




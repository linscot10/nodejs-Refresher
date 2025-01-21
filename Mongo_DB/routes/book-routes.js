const { createAuthor, createBook } = require("../controllers/book-controller")

const express = require('express')
const router = express.Router()



router.post('/author', createAuthor)
router.post('/book', createBook)


module.exports = router
const { createAuthor, createBook, getBookWithAuthor } = require("../controllers/book-controller")

const express = require('express')
const router = express.Router()



router.post('/author', createAuthor)
router.post('/book', createBook)
router.get('/get', getBookWithAuthor)


module.exports = router
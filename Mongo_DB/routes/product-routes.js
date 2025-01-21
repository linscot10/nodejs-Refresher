const { insertSampleProducts } = require("../controllers/product-controllers")

const express = require('express')
const router = express.Router()



router.post('/add', insertSampleProducts)

module.exports = router
const express = require("express")
require("dotenv").config()
const productRoutes = require("./routes/product-routes")
const mongoose = require("mongoose")

PORT = process.env.PORT
const app = express();
app.use(express.json())



app.use('/products', productRoutes )

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo_DB connected successfully"))
    .catch((e) => console.log(e))


app.listen(PORT, () => {
    console.log(`server running on port:http://localhost:${PORT}`);

})
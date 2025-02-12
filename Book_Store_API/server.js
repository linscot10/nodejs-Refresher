require("dotenv").config()
const express = require("express");
const bookRoutes = require("./routes/book-route")
const connectToDB = require("./database/db")


const app = express()
//  middleware
app.use(express.json());

const PORT = process.env.PORT || 3000

// app.get('/', (req, res) => {
//     res.json({
//         message: "Welcome to our bookstore API"
//     })
// })


app.use("/api/book", bookRoutes)

// database
connectToDB();

app.listen(PORT, () => {
    console.log(`Server connected to Port http://localhost:${PORT}`);

})

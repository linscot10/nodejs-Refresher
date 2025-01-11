const express = require("express")
require("dotenv").config();
const mongoose = require('mongoose');
const connectDB = require("./database/db")
const authRoutes = require("./routes/auth-routes")


mongoose.connect("")
    .then(() => console.log("Database is running successfully!"))
    .catch((e) => console.log(e))

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB()

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port http:localhost:${PORT}`);
})
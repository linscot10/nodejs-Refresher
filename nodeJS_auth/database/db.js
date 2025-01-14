const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb is connected Succesfully !")
    } catch (error) {
        console.error("Mongodb connection failed ", error)
        process.exit(1)
    }

}

module.exports = connectDB;
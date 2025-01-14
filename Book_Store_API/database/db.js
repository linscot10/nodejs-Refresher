const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/NodeJs_Auth");
        console.log("Mongodb is connected Succesfully !")
    } catch (error) {
        console.error("Mongodb connection failed ", error)
        process.exit(1)
    }
}
module.exports = connectToDB;
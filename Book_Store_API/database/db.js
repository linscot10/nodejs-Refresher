const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://osurulawrence:osurulawrence@cluster0.xsd9q.mongodb.net/");
        console.log("Mongodb is connected Succesfully !")
    } catch (error) {
        console.error("Mongodb connection failed ", error)
        process.exit(1)
    }
}
module.exports=connectToDB;
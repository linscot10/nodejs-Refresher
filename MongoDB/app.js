const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://osurulawrence:osurulawrence@cluster0.xzgyk.mongodb.net/')
    .then(() => console.log("databasee connecteed succesfully"))
    .catch((e) => console.log(e))


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now }
})


// model

const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
    try {
        const newUser = await User.create({
            name: "Kijana",
            email: "kijana@gmail.com",
            age: 55,
            isActive: true,
            tags: ["developer", "entrepreneur"],
        })
        // const newUser = new User({
        //     name: "Scott ",
        //     email: "scottlawrence@gmail.com",
        //     age: 24,
        //     isActive: true,
        //     tags: ["developer", "entrepreneur"],
        // })


        // await newUser.save()
        // console.log("created new User", newUser);

        // const allUser = await User.find({})
        // console.log(allUser);

        // const getUserOfActiveFalse = await User.find({
        //     isActive: false
        // })
        // console.log(getUserOfActiveFalse);

        // const getOsuruUser = await User.findOne({
        //     name: "Osuru "
        // })
        // console.log(getOsuruUser);

        // const getUserId = await User.findById(newUser._id)
        // console.log(getUserId);

        const selectedFields = await User.find().select("name email -_id")
        console.log(selectedFields);

    } catch (error) {
        console.log('Error ->', error)
    } finally {
        await mongoose.connection.close()
    }
}

runQueryExamples()
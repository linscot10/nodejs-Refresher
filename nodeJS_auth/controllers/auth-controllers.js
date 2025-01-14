const User = require("../database/db")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    try {

        const { userName, email, password, role } = req.body;
        const checkExistingUser = await User.findOne({ $or: [{ userName }, { email }] })

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this Username or Id already exists"
            })
        }
        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // user creation

        const newlyCreatedUser = new User({

            userName,
            email,
            password: hashedPassword,
            role: role || 'user'



            
        })

        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: "User created successfully"
            })
        }
        else {
            res.status(201).json({
                success: false,
                message: " Unable to register User! Please try again"
            })
        }






    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong, try again"
        })
    }
}

const loginUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

module.exports = { loginUser, registerUser }
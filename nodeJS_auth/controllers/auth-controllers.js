const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
        console.error("Error during user registration:", error);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong, try again"
        })
    }
}

const loginUser = async (req, res) => {
    try {

        const { userName, password } = req.body;
        const user = await User.findOne({ userName })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid UserName"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const accessToken = jwt.sign({
            userId: user._id,
            userName: userName,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15m"
        })

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}


const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId

        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Old Password does not Match !please TRY again"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const newHashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = newHashedPassword

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password changed  successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

module.exports = { loginUser, registerUser, changePassword }
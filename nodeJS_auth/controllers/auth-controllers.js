const express = require("express")

const registerUser = async () => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

const loginUser = async () => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

module.exports = { loginUser, registerUser }
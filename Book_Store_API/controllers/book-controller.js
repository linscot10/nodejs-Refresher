const express = require("express")
const Book = require("../models/book")

const getAllBooks = async (req, res) => {

    try {
        const allBooks = await Book.find({});

        if (allBooks?.length > 0) {
            res.status(200).json({
                success: true,
                message: "List of books fetched successfully",
                data: allBooks
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "No Books found in the collections"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}
const getSingleBookById = async (req, res) => {
    try {

        const getCurrentBookById = req.params.id;
        const bookDetailsById = await Book.findById(getCurrentBookById);

        if (!bookDetailsById) {
            return res.status(404).json({
                success: false,
                message: "Books with the current ID not Found! please Try with a different ID"
            })
        }
        res.status(200).json({
            success: true,
            data: bookDetailsById
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Books with the current ID not Found! please Try with a different ID"
        })
    }
}

const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;

        const newlyCreatedBook = await Book.create(newBookFormData);

        if (newBookFormData) {
            res.status(201).json({
                success: true,
                message: 'Book added successfully ',
                data: newlyCreatedBook
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }

}
const updateBook = async (req, res) => {
    try {
        const updatedBookFormData = req.body;
        const getCurrentBookId = req.params.id
        const updatedbook = await Book.findByIdAndUpdate(getCurrentBookId, updatedBookFormData, {
            new: true
        })


        if (!updatedbook) {
            res.status(404).json({
                success: false,
                message: "Book with that ID not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: updatedbook,
            message: "Book updated successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}


const deleteBook = async (req, res) => {
    try {
        const getCurrentBookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);

        if (!deleteBook) {
            res.status(404).json({
                success: false,
                message: "Book with that ID not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: deletedBook,
            message: "Book deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Book with that ID not Found"
        })
    }
}

module.exports = {
    getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook
}

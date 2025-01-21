const Book = require("../models/Book")
const Author = require("../models/Author")



const createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body)
        await author.save()

        res.status(201).json({
            success: true,
            message: 'author created successfully',
            data: author

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}
const createBook = async (req, res) => {
    try {
        const book = new Book(req.body)
        await book.save()

        res.status(201).json({
            success: true,
            message: 'book created successfully',
            data: book

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}


const getBookWithAuthor = async (req, res) => {
    try {
        const books = await Book.findById(req.params.id).populate('author')

        if (!books) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found",
                data: books
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error occured",

        })
    }
}


module.exports = {
    createAuthor, createBook, getBookWithAuthor
}
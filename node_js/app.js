const express = require('express');


const app = express();

app.use(express.json());

let books = [
    {
        id: '1',
        title: 'book_1'
    },
    {
        id: '2',
        title: 'book_2'
    },
]

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our bookstore API"
    })
})

app.get("/get", (req, res) => {
    res.json(books)
})



app.get('/get/:id', (req, res) => {
    const book = books.find(item => item.id === req.params.id);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({
            message: "Book Not Found! please Try with a different Book Id "
        })
    }
})

app.post('/add', (req, res) => {
    const newBook = {
        // id: books.length + 1,
        // title: `Book_${books.length + 1}`

        id: Math.floor(Math.random() * 1000).toString(),
        title: `Book ${Math.floor(Math.random() * 1000)}`
    }

    books.push(newBook);
    res.status(200).json({ data: newBook, message: "new  book added succesfully" })
})

app.put('/update/:id', (req, res) => {
    const findCurrentBook = books.find(bookItem => bookItem.id === req.params.id);

    if (findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title
        // findCurrentBook.id = req.body.id || findCurrentBook.id

        res.status(200).json({
            message: `Book with ID ${req.params.id} updated successfully`,
            data: findCurrentBook
        })
    }
    else {
        res.status(404).json({
            message: 'Book not Found'
        })
    }
})


app.delete('/delete/:id', (req, res) => {
    const findIndexOfCurrentBook = books.findIndex(item => item.id === req.params.id);

    if (findIndexOfCurrentBook !== -1) {
        const deleteBook = books.splice(findIndexOfCurrentBook, 1);

        res.status(200).json({
            message: "Book deleted successfully",
            data: deleteBook[0]
        })

    }

    else {
        res.status(404).json({
            message: 'Book not Found'
        })
    }
})
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening to port http://localhost:${PORT}`)
})




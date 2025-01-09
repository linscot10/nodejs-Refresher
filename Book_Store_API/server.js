const express = require("express")


const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our bookstore API"
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`database connected to Port http://localhost:${PORT}`);

})
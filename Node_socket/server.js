const express = require("express")
const http = require("http")
const socketIo = require("socket.io")


const app = express()


const server = http.createServer(app)

const io = socketIo(server)

app.use(express.static('public'))


const users = new Set()

io.on("connection", (socket) => {
    console.log("a user is now connected");

})
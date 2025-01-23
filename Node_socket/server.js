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

    socket.on('join', (userName) => {
        users.add(userName)

        io.emit('userJoined', userName)

        io.emit('userList', Array.from(users))
    })

})

server.listen(3000, () => {
    console.log(`server is now running on PORT: http://localhost:${3000}`);

})
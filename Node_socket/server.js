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
        socket.userName = userName

        io.emit('userJoined', userName)

        io.emit('userList', Array.from(users))
    })



    socket.on("chatMessage", (message) => {
        io.emit("chatMessage", message)
    })

    socket.on("disconnect", () => {
        console.log("A user  is disconnected");
        users.forEach(user => {
            if (user === socket.userName) {
                users.delete(user);
                io.emit('userLeft', user)

                io.emit('userList', Array.from(users))
            }
        })
    })

})

server.listen(3000, () => {
    console.log(`server is now running on PORT: http://localhost:${3000}`);

})
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = {};

io.on("connection", (socket) => {
    console.log("Có người vào:", socket.id);

    socket.on("join", (username) => {
        users[socket.id] = username;

        io.emit("message", {
            user: "Hệ Thống",
            text: `${username} đã tham gia phòng chat`
        });
    });

    socket.on("chatMessage", (msg) => {
        io.emit("message", {
            user: users[socket.id],
            text: msg
        });
    });

    socket.on("disconnect", () => {
        if (users[socket.id]) {
            io.emit("message", {
                user: "Hệ Thống",
                text: `${users[socket.id]} đã rời phòng`
            });

            delete users[socket.id];
        }
    });
});

server.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});

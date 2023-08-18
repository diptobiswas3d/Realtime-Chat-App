const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 3000 || process.env.PORT;

let users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-connected", user);
  });
  socket.on("send-chat-message", (message) => {
    console.log(`${users[socket.id]}: ${message}`);
    socket.broadcast.emit("chat-message", { user: users[socket.id], message });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to Neo Chat App");
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

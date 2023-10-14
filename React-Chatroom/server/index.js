const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
  },
});

let users = {};

io.on("connection", (socket) => {
  // socket.emit("chat-message", "Let's fight a battle!");
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-connected", user);
  });

  socket.on("send-chat-message", (msg) => {
    socket.broadcast.emit("chat-message", msg);
  });
});

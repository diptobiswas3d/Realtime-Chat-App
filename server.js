const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.emit("chat-message", "Let's fight a battle!");

  socket.on("send-chat-message", (message) => {
    console.log(message);
    socket.broadcast.emit("chat-message", message);
  });
});

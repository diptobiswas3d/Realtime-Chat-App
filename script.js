let messageContainer = document.getElementById("message-container");
let messageInput = document.getElementById("message-input");
let sendBtn = document.getElementById("send-button");

const socket = io("http://localhost:3000");

let username = Math.floor(Math.random() * 100).toString();
appendMessage("You joined the chat", "right");

socket.emit("new-user", username);

socket.on("chat-message", (data) => {
  appendMessage(data.user + ": " + data.message, "left");
});

socket.on("user-connected", (user) => {
  appendMessage(user + " joined the chat", "left");
});
socket.on("user-disconnected", (user) => {
  appendMessage(user + " left the chat", "left");
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("send-chat-message", messageInput.value);
  appendMessage(`You: ${messageInput.value}`, "right");
  console.log(messageInput.value);
  messageInput.value = "";
});

function appendMessage(data, dir) {
  let message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(dir);
  message.textContent = data;
  messageContainer.appendChild(message);
}

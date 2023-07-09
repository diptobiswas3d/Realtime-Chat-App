let messageContainer = document.getElementById("message-container");
let messageInput = document.getElementById("message-input");
let sendBtn = document.getElementById("send-button");

const socket = io("http://localhost:3000");

socket.on("chat-message", (data) => {
  console.log(data);
  appendMessage(data, "left");
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("send-chat-message", messageInput.value);
  appendMessage(messageInput.value, "right");
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

import { useState, useEffect } from "react";
import "./App.css";
import socketioclient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
let socket;
let pkmnTrainers = [
  "Ash",
  "Gary",
  "Red",
  "Gold",
  "Lyra",
  "May",
  "Brendan",
  "Paul",
  "Barry",
  "Dawn",
];

function App() {
  const [username, setUsername] = useState(
    pkmnTrainers[Math.floor(Math.random() * pkmnTrainers.length)]
  );
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = socketioclient(ENDPOINT);

    // console.log(username, "joined the chat");

    socket.emit("new-user", username);

    socket.on("user-connected", (user) => {
      console.log(user, "joined the chat");
    });

    socket.on("chat-message", (msg) => {
      console.log(msg);
    });

    // return () => {
    //   second
    // }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setChat((prevChat) => [...prevChat, message]);
    socket.emit("send-chat-message", message);
  }
  function writeMessage(e) {
    let curMessage = e.target.value;
    setMessage(curMessage);
  }
  return (
    <main>
      <h1>Neo Chat App React</h1>
      <div id="message-container">
        <div className="message right">You joined chat</div>
        {chat.map((message, index) => {
          return <div className="message">{message}</div>;
        })}
        <div className="message right">I choose you Torchic</div>
        <div className="message left">I choose you Mudkip</div>
      </div>
      <div id="send-container">
        <input
          type="text"
          placeholder="Enter message"
          id="message-input"
          onChange={writeMessage}
        />
        <button id="send-button" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </main>
  );
}
export default App;

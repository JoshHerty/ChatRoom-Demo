import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";
import ChatMessage from "../models/ChatMessage";
import "./MessageForm.css";

const Form = () => {
  const {
    chatRoomMessages,
    setChatRoomMessages,
    userName,
    currentTime,
    avatar,
  } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const { roomId } = useParams();

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const copyOfChatRoomMessages: ChatMessage[] = [...chatRoomMessages];

    if (message) {
      const chatMessage: ChatMessage = {
        avatar,
        userName,
        message,
        currentTime,
        roomId,
      };

      socket.emit("send_message", chatMessage);
      copyOfChatRoomMessages.unshift(chatMessage);
      setChatRoomMessages(copyOfChatRoomMessages);
      // console.log(chatMessage);
      setMessage("");
    }
  };

  return (
    <form className="App" onSubmit={sendMessage}>
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>Send Message</button>
    </form>
  );
};

export default Form;

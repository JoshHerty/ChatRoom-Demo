import { useContext, useState } from "react";
import "./MessageForm.css";
import { useParams } from "react-router-dom";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";

const Form = () => {
  const { chatRoomMessages, setChatRoomMessages } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const { roomId } = useParams();

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const copyOfChatRoomMessages: string[] = [...chatRoomMessages];

    if (message) {
      socket.emit("send_message", { message, roomId });

      copyOfChatRoomMessages.push(message);
      setChatRoomMessages(copyOfChatRoomMessages);

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

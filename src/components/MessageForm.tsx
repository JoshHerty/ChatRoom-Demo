import { useState } from "react";
import "./MessageForm.css";
import * as io from "socket.io-client";
import { useParams } from "react-router-dom";

interface Props {
  socket: io.Socket;
}

const Form = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const { roomId } = useParams();

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message) {
      socket.emit("send_message", { message, roomId });
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

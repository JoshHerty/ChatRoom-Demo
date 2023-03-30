import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";
import ChatMessage from "../models/ChatMessage";
import "./MessageForm.css";

const MessageForm = () => {
  const {
    chatRoomMessages,
    setChatRoomMessages,
    userName,
    currentTime,
    avatar,
  } = useContext(SocketContext);
  const [message, setMessage] = useState("");

  const [textareaHeight, setTextareaHeight] = useState<string>("auto");

  const { roomId } = useParams();

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTextareaHeight(`${e.target.scrollHeight}px`);
    if (message.length <= 500) {
      setMessage(e.target.value);
    } else {
      setMessage(message.substring(0, 500));
    }
  };

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const copyOfChatRoomMessages: ChatMessage[] = [...chatRoomMessages];

    if (message) {
      console.log(message);
      let chatMessage: ChatMessage = {
        avatar,
        userName,
        message,
        currentTime,
        roomId,
      };

      socket.emit("send_message", chatMessage);
      chatMessage.isUsersMessage = true;
      copyOfChatRoomMessages.unshift(chatMessage);
      setChatRoomMessages(copyOfChatRoomMessages);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // add a new line
        setMessage(message + "\n");
      } else {
        // submit form
        submitMessage(e as unknown as React.FormEvent<HTMLFormElement>);
        setTextareaHeight("auto");
      }
    }
  };

  return (
    <form className="MessageForm">
      <textarea
        className="text-box"
        placeholder="Message..."
        value={message}
        onChange={autoResize}
        onKeyDown={handleKeyDown}
        style={{
          height: textareaHeight,
          maxHeight: "128px",
        }}
      />
    </form>
  );
};

export default MessageForm;

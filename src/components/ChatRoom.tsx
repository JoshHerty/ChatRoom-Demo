import "./ChatRoom.css";
import MessageForm from "./MessageForm";
import { useContext, useEffect, useState } from "react";
import RoomForm from "./RoomForm";
import SocketContext from "../context/SocketContext";
import { Navigate } from "react-router-dom";
import { socket } from "../service/socket";

const ChatRoom = () => {
  const { lastRoomId, chatRoomMessages, setChatRoomMessages } =
    useContext(SocketContext);

  useEffect(() => {
    const copyOfChatRoomMessages: string[] = [...chatRoomMessages];

    socket.on("receive_message", (message: string) => {
      copyOfChatRoomMessages.push(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });

    socket.on("user_disconnected", (message) => {
      copyOfChatRoomMessages.push(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });

    socket.on("user_joined", (message) => {
      copyOfChatRoomMessages.push(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });

    socket.on("user_left", (message) => {
      copyOfChatRoomMessages.push(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });
  }, [chatRoomMessages, socket]);

  return (
    <div className="ChatRoom">
      {lastRoomId ? (
        <>
          <RoomForm />
          <MessageForm />
          <h1>Messages:</h1>
          {chatRoomMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </>
      ) : (
        <>
          <Navigate to="/Home" />
        </>
      )}
    </div>
  );
};

export default ChatRoom;

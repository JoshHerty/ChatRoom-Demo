import "./ChatRoom.css";
import MessageForm from "./MessageForm";
import * as io from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import RoomForm from "./RoomForm";
import PreviousRoomContext from "../context/PreviousRoomContext";
import { Navigate } from "react-router-dom";

interface Props {
  socket: io.Socket;
}

const ChatRoom = ({ socket }: Props) => {
  const { lastRoomId } = useContext(PreviousRoomContext);
  const [messageRecieved, setMessageRecieved] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageRecieved(data);
    });
  }, [socket]);

  return (
    <div className="ChatRoom">
      {lastRoomId ? (
        <>
          <RoomForm socket={socket} />
          <MessageForm socket={socket} />
          <h1>Message:</h1>
          {messageRecieved}
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

import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";
import ChatMessage from "../models/ChatMessage";
import ChooseAvatar from "./ChooseAvatar";
import RoomForm from "./RoomForm";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import avatar1 from "../assets/avatar-1-upscaled.png";
import avatar2 from "../assets/avatar-2-upscaled.png";
import avatar3 from "../assets/avatar-3-upscaled.png";
import avatar4 from "../assets/avatar-4-upscaled.png";
import "./ChatRoom.css";

const ChatRoom = () => {
  const {
    currentRoomId,
    chatRoomMessages,
    setChatRoomMessages,
    userName,
    avatar,
    avatarsInUse,
    setAvatarsInUse,
  } = useContext(SocketContext);

  useEffect(() => {
    socket.on("unavailable_avatars", (avatarArray: string[]) => {
      setAvatarsInUse(avatarArray);
    });

    const copyOfChatRoomMessages: ChatMessage[] = [...chatRoomMessages];

    socket.on("receive_message", (message: ChatMessage) => {
      copyOfChatRoomMessages.unshift(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });

    socket.on("user_disconnected", (message: ChatMessage) => {
      copyOfChatRoomMessages.unshift(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });

    socket.on("user_joined", (message: ChatMessage) => {
      copyOfChatRoomMessages.unshift(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });

    socket.on("user_left", (message: ChatMessage) => {
      copyOfChatRoomMessages.unshift(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });
  }, [chatRoomMessages, avatarsInUse, setAvatarsInUse, setChatRoomMessages]);

  return (
    <div className="ChatRoom">
      {currentRoomId ? (
        <>
          <RoomForm />
          {!avatar ? (
            <ChooseAvatar avatarsInUse={avatarsInUse} />
          ) : (
            <>
              <div>
                <h1>{userName}</h1>
                {avatar === "avatar1" && (
                  <img className="avatar" src={avatar1} alt="" />
                )}
                {avatar === "avatar2" && (
                  <img className="avatar" src={avatar2} alt="" />
                )}
                {avatar === "avatar3" && (
                  <img className="avatar" src={avatar3} alt="" />
                )}
                {avatar === "avatar4" && (
                  <img className="avatar" src={avatar4} alt="" />
                )}
              </div>

              <h2>{`Room ${currentRoomId} Chat`}</h2>
              <div>
                <ul className="messages-container">
                  <Messages />
                </ul>
                <MessageForm />
              </div>
            </>
          )}
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

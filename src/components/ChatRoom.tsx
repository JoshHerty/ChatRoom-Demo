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
      if (message.userName === userName) {
        message.isUsersMessage = true;
      }
      copyOfChatRoomMessages.unshift(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });

    socket.on("user_left", (message: ChatMessage) => {
      copyOfChatRoomMessages.unshift(message);
      setChatRoomMessages(copyOfChatRoomMessages);
    });
  }, [
    chatRoomMessages,
    avatarsInUse,
    setAvatarsInUse,
    setChatRoomMessages,
    userName,
  ]);

  return (
    <div className="ChatRoom">
      {currentRoomId ? (
        <>
          <RoomForm />
          {!avatar ? (
            <ChooseAvatar avatarsInUse={avatarsInUse} />
          ) : (
            <section>
              <div className="user-info">
                <p className="user-name">{userName}</p>
                {avatar === "avatar1" && (
                  <img className="user-avatar" src={avatar1} alt="avatar 1" />
                )}
                {avatar === "avatar2" && (
                  <img className="user-avatar" src={avatar2} alt="avatar 2" />
                )}
                {avatar === "avatar3" && (
                  <img className="user-avatar" src={avatar3} alt="avatar 3" />
                )}
                {avatar === "avatar4" && (
                  <img className="user-avatar" src={avatar4} alt="avatar 4" />
                )}
              </div>
              <div className="chat-container">
                <h2 className="room-id">{`Room ${currentRoomId} Chat`}</h2>
                <ul className="messages">
                  <Messages />
                </ul>
                <MessageForm />
              </div>
            </section>
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

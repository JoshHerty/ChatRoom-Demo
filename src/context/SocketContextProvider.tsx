import { ReactNode, useState } from "react";
import ChatMessage from "../models/ChatMessage";
import SocketContext from "./SocketContext";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomId, setRoomId] = useState<string>("");

  const [lastRoomId, setLastRoomId] = useState<string | null>(null);

  const [chatRoomMessages, setChatRoomMessages] = useState<ChatMessage[]>([]);

  const [userName, setUserName] = useState<string>("");

  const [avatar, setAvatar] = useState<string>("");

  const now = new Date();

  const currentTime = now.toLocaleTimeString();

  return (
    <SocketContext.Provider
      value={{
        roomId,
        setRoomId,
        lastRoomId,
        setLastRoomId,
        chatRoomMessages,
        setChatRoomMessages,
        userName,
        setUserName,
        currentTime,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

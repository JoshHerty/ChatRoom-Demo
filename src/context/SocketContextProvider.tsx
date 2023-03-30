import { ReactNode, useState } from "react";
import ChatMessage from "../models/ChatMessage";
import SocketContext from "./SocketContext";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>("");

  const [avatarsInUse, setAvatarsInUse] = useState<string[]>([]);

  const [avatar, setAvatar] = useState<string>("");

  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);

  const [chatRoomMessages, setChatRoomMessages] = useState<ChatMessage[]>([]);

  const now = new Date();

  const currentTime = now.toLocaleTimeString();

  return (
    <SocketContext.Provider
      value={{
        userName,
        setUserName,
        avatarsInUse,
        setAvatarsInUse,
        avatar,
        setAvatar,
        currentRoomId,
        setCurrentRoomId,
        chatRoomMessages,
        setChatRoomMessages,
        currentTime,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

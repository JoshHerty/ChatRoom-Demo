import { ReactNode, useState } from "react";
import ChatMessage from "../models/ChatMessage";
import SocketContext from "./SocketContext";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  // Remove in final version
  function generateRandomString(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  const randomString = generateRandomString(5);
  // Remove in final version

  const [userName, setUserName] = useState<string>(randomString);

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

import { ReactNode, useState } from "react";
import SocketContext from "./SocketContext";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [lastRoomId, setLastRoomId] = useState<string | null>(null);

  const [chatRoomMessages, setChatRoomMessages] = useState<string[]>([]);

  return (
    <SocketContext.Provider
      value={{
        lastRoomId,
        setLastRoomId,
        chatRoomMessages,
        setChatRoomMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

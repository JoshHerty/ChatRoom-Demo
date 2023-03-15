import { createContext } from "react";

interface SocketContextModel {
  lastRoomId: string | null;
  setLastRoomId: (lastRoomId: string) => void;
  chatRoomMessages: string[];
  setChatRoomMessages: (chatRoomMessages: string[]) => void;
}

const defaultValues: SocketContextModel = {
  lastRoomId: null,
  setLastRoomId: () => {},
  chatRoomMessages: [],
  setChatRoomMessages: () => {},
};

const SocketContext = createContext(defaultValues);
export default SocketContext;

import { createContext } from "react";
import ChatMessage from "../models/ChatMessage";

interface SocketContextModel {
  roomId: string;
  setRoomId: (roomId: string) => void;
  lastRoomId: string | null;
  setLastRoomId: (lastRoomId: string) => void;
  chatRoomMessages: ChatMessage[];
  setChatRoomMessages: (chatRoomMessages: ChatMessage[]) => void;
  userName: string;
  setUserName: (UserName: string) => void;
  currentTime: string;
  avatar: string;
  setAvatar: (avatar: string) => void;
}

const defaultValues: SocketContextModel = {
  roomId: "",
  setRoomId: () => {},
  lastRoomId: null,
  setLastRoomId: () => {},
  chatRoomMessages: [],
  setChatRoomMessages: () => {},
  userName: "",
  setUserName: () => {},
  currentTime: "0:00:00 AM",
  avatar: "",
  setAvatar: () => {},
};

const SocketContext = createContext(defaultValues);
export default SocketContext;

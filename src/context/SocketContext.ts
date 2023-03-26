import { createContext } from "react";
import ChatMessage from "../models/ChatMessage";

interface SocketContextModel {
  userName: string;
  setUserName: (UserName: string) => void;
  avatarsInUse: string[];
  setAvatarsInUse: (avatarsInUse: string[]) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  currentRoomId: string | null;
  setCurrentRoomId: (currentRoomId: string) => void;
  chatRoomMessages: ChatMessage[];
  setChatRoomMessages: (chatRoomMessages: ChatMessage[]) => void;
  currentTime: string;
}

const defaultValues: SocketContextModel = {
  userName: "",
  setUserName: () => {},
  avatarsInUse: [],
  setAvatarsInUse: () => {},
  avatar: "",
  setAvatar: () => {},
  currentRoomId: null,
  setCurrentRoomId: () => {},
  chatRoomMessages: [],
  setChatRoomMessages: () => {},
  currentTime: "0:00:00 AM",
};

const SocketContext = createContext(defaultValues);
export default SocketContext;

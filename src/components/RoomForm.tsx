import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";
import UserData from "../models/UserData";
import "./RoomForm.css";

const RoomForm = () => {
  const {
    lastRoomId,
    setLastRoomId,
    setChatRoomMessages,
    userName,
    setUserName,
    roomId,
    setRoomId,
    setAvatar,
  } = useContext(SocketContext);
  const navigate = useNavigate();

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();

    const hasLetter = /[a-zA-Z]/.test(roomId);

    if (!hasLetter) {
      if (!lastRoomId) {
        const userData: UserData = { userName: userName, avatar: "" };

        socket.emit("set_data", userData);
      }
      if (roomId !== "" && userName !== "") {
        if (roomId !== lastRoomId) {
          if (lastRoomId) {
            socket.emit("leave_room", lastRoomId);
            console.log(`left ${lastRoomId}`);
            setChatRoomMessages([]);
          }
          socket.emit("join_room", roomId);
          console.log(`joined ${roomId}`);
          navigate(`/ChatRoom/${roomId}`);
          setLastRoomId(roomId);
          setAvatar("");
          setRoomId("");
        }
      }
    }
  };

  return (
    <form className="RoomForm" onSubmit={joinRoom}>
      {!lastRoomId && (
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      )}
      <input
        type="text"
        placeholder="Room Number"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button>Enter Room</button>
    </form>
  );
};

export default RoomForm;

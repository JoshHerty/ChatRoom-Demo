import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";
import "./RoomForm.css";

const RoomForm = () => {
  const {
    currentRoomId,
    setCurrentRoomId,
    setChatRoomMessages,
    userName,
    setUserName,
    setAvatar,
    setAvatarsInUse,
  } = useContext(SocketContext);

  const [roomIdInput, setRoomIdInput] = useState<string>("");

  const navigate = useNavigate();

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();

    const hasLetter = /[a-zA-Z]/.test(roomIdInput);

    if (!hasLetter && roomIdInput !== "" && userName !== "") {
      if (roomIdInput !== currentRoomId) {
        if (currentRoomId) {
          socket.emit("leave_room", currentRoomId);
          setChatRoomMessages([]);
        }
        setAvatarsInUse([]);
        socket.emit("join_room", roomIdInput);
        setCurrentRoomId(roomIdInput);
        setAvatar("");
        setRoomIdInput("");
        navigate(`/ChatRoom/${roomIdInput}`);
      }
    }
  };

  return (
    <form className="RoomForm" onSubmit={joinRoom}>
      {!currentRoomId && (
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
        value={roomIdInput}
        onChange={(e) => setRoomIdInput(e.target.value)}
      />
      <button>Enter Room</button>
    </form>
  );
};

export default RoomForm;

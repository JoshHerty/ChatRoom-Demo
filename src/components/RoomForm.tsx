import "./RoomForm.css";
import * as io from "socket.io-client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviousRoomContext from "../context/PreviousRoomContext";

interface Props {
  socket: io.Socket;
}

const RoomForm = ({ socket }: Props) => {
  const { lastRoomId, setLastRoomId } = useContext(PreviousRoomContext);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();

    const hasLetter = /[a-zA-Z]/.test(roomId);

    if (!hasLetter) {
      if (roomId !== "") {
        if (lastRoomId) {
          socket.emit("leave_room", lastRoomId);
          console.log(`left ${lastRoomId}`);
        }
        socket.emit("join_room", roomId);
        console.log(`joined ${roomId}`);
        navigate(`/ChatRoom/${roomId}`);
        setLastRoomId(roomId);
        setRoomId("");
      }
    }
  };

  return (
    <form className="RoomForm" onSubmit={joinRoom}>
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

import { useContext, useEffect, useState } from "react";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";

const RoomClients = () => {
  const { roomId } = useContext(SocketContext);
  const [clients, setClients] = useState<string[]>([]);

  useEffect(() => {
    socket.on("room_clients", (clients: string[]) => {
      setClients(clients);
    });

    return () => {
      socket.off("room_clients");
    };
  }, []);

  const handleGetRoomClients = () => {
    socket.emit("get_room_clients", roomId);
  };

  return (
    <div>
      <button onClick={handleGetRoomClients}>Get Room Clients</button>
      <p>Clients in Room:</p>
      <ul>
        {clients.map((client) => (
          <li key={client}>{client}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomClients;

import "./Home.css";
import RoomForm from "./RoomForm";
import * as io from "socket.io-client";

interface Props {
  socket: io.Socket;
}

const Home = ({ socket }: Props) => {
  return (
    <div className="Home">
      <RoomForm socket={socket} />
    </div>
  );
};

export default Home;

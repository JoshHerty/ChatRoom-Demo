import { useContext } from "react";
import SocketContext from "../context/SocketContext";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";
import "./Messages.css";

const Messages = () => {
  const { chatRoomMessages } = useContext(SocketContext);

  return (
    <>
      {chatRoomMessages.map((chatMessage, index) => (
        <li className="Messages" key={index}>
          <div className="class-avatar">
            {chatMessage.avatar === "avatar1" && (
              <img className="avatar" src={avatar1} alt="" />
            )}
            {chatMessage.avatar === "avatar2" && (
              <img className="avatar" src={avatar2} alt="" />
            )}
            {chatMessage.avatar === "avatar3" && (
              <img className="avatar" src={avatar3} alt="" />
            )}
            {chatMessage.avatar === "avatar4" && (
              <img className="avatar" src={avatar4} alt="" />
            )}
            <p>{chatMessage.userName}</p>
          </div>
          <p>{chatMessage.message}</p>

          <p className="current-time">{chatMessage.currentTime}</p>
        </li>
      ))}
    </>
  );
};

export default Messages;

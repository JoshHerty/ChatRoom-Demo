import { useContext } from "react";
import { socket } from "../service/socket";
import SocketContext from "../context/SocketContext";
import UserData from "../models/UserData";
import avatar1 from "../assets/avatar-1-upscaled.png";
import avatar2 from "../assets/avatar-2-upscaled.png";
import avatar3 from "../assets/avatar-3-upscaled.png";
import avatar4 from "../assets/avatar-4-upscaled.png";
import "./ChooseAvatar.css";

interface Props {
  avatarsInUse: string[];
}

const ChooseAvatar = ({ avatarsInUse }: Props) => {
  const { userName, setAvatar, currentRoomId } = useContext(SocketContext);

  const avatarHandler = (avatar: string): void => {
    if (!avatarsInUse.includes(avatar)) {
      setAvatar(avatar);

      const userData: UserData = {
        userName,
        avatar,
        roomId: currentRoomId!,
      };
      console.log(currentRoomId);
      socket.emit("set_user_data", userData);
      socket.emit("choose_avatar", avatar);
    }
  };

  const avatarImageStyle = (avatar: string): React.CSSProperties => {
    if (!avatarsInUse.includes(avatar)) {
      return { filter: "brightness(100%)" };
    } else {
      {
        return { filter: "brightness(60%)" };
      }
    }
  };

  return (
    <div className="ChooseAvatar">
      <img
        className="avatar-icons"
        src={avatar1}
        alt="avatar1"
        onClick={() => avatarHandler("avatar1")}
        style={avatarImageStyle("avatar1")}
      />
      <img
        className="avatar-icons"
        src={avatar2}
        alt="avatar2"
        onClick={() => avatarHandler("avatar2")}
        style={avatarImageStyle("avatar2")}
      />
      <img
        className="avatar-icons"
        src={avatar3}
        alt="avatar3"
        onClick={() => avatarHandler("avatar3")}
        style={avatarImageStyle("avatar3")}
      />
      <img
        className="avatar-icons"
        src={avatar4}
        alt="avatar4"
        onClick={() => avatarHandler("avatar4")}
        style={avatarImageStyle("avatar4")}
      />
    </div>
  );
};

export default ChooseAvatar;

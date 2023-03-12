import { createContext } from "react";

interface PreviousRoomContextModel {
  lastRoomId: string | null;
  setLastRoomId: (lastRoomId: string) => void;
}

const defaultValues: PreviousRoomContextModel = {
  lastRoomId: null,
  setLastRoomId: () => {},
};

const PreviousRoomContext = createContext(defaultValues);
export default PreviousRoomContext;

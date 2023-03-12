import { ReactNode, useState } from "react";
import PreviousRoomContext from "./PreviousRoomContext";

const PreviousRoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [lastRoomId, setLastRoomId] = useState<string | null>(null);

  return (
    <PreviousRoomContext.Provider value={{ lastRoomId, setLastRoomId }}>
      {children}
    </PreviousRoomContext.Provider>
  );
};

export default PreviousRoomContextProvider;

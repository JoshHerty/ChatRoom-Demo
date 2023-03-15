import * as io from "socket.io-client";

export const socket: io.Socket = io.connect("http://localhost:3001");

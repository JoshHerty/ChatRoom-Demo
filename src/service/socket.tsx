import * as io from "socket.io-client";

// const socketUrl: string = process.env.SOCKET_IO_BASE_URL || "";

// console.log(socketUrl);

export const socket: io.Socket = io.connect("http://localhost:3001");

import io, { Socket } from "socket.io-client";

const baseUrl: string = process.env.REACT_APP_API_BASE_URL || "";

export const socket: Socket = io(baseUrl);

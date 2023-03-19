import React from "react";
import ReactDOM from "react-dom/client";
import SocketContextProvider from "./context/SocketContextProvider";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SocketContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SocketContextProvider>
);

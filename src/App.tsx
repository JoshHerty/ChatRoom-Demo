import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Home from "./components/Home";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Home" element={<Home socket={socket} />} />
          <Route
            path="/ChatRoom/:roomId"
            element={<ChatRoom socket={socket} />}
          />
          {/* WildCard */}
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/ChatRoom/:roomId" element={<ChatRoom />} />
          {/* WildCard */}
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Menu from "./screens/Menu";

function App() {
  return (
    <div className="App h-full">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

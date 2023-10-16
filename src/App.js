import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Menu from "./screens/Menu";
import Signup from "./screens/Signup";
import DataProvider from "./Provider/DataProvider";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/createuser" element={<Signup />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;

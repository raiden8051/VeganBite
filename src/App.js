import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Menu from "./screens/Menu";
import Signup from "./screens/Signup";
import RestaurantDetails from "./components/elements/RestaurantDetails/RestaurantDetails";
import GetLocation from "./components/elements/GetLocation/GetLocation";
import Cart from "./components/elements/Cart/Cart";

function App() {
  console.log(
    "%c !!Code by RAIDEN!!",
    "font-weight: bold; font-size: 40px;color: dodgerblue; text-shadow: 3px 3px 0 rgb(0,191,255) , 6px 6px 0 rgb(138,43,226) , 9px 9px 0 rgb(245,221,8) , 21px 21px 0 rgb(42,21,113)"
  );
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/restaurants-details"
            element={<RestaurantDetails />}
          />
          <Route exact path="/get-location" element={<GetLocation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

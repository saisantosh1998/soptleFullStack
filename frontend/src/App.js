import "./App.css";
import LandingPage from "./components/LandingPage";
// import { MyProvider } from "./components/MyContext";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Booking from "./components/Booking";
import Dashboard from "./components/Dashboard";

export const config = {
  endpoint: 'https://soptle.onrender.com/v1',
};

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/booking/:flightId" element={<Booking />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;

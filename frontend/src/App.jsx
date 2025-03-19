import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Venues from "./pages/Venues";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
function App() {
  const [user, setUser] = useState(null); // ✅ Track logged-in user

  return (
    <Router>
      <Navbar user={user} setUser={setUser} /> {/* ✅ Pass user to Navbar */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/book/:matchId" element={<BookingPage user={user} />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;

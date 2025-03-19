import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure CSS file is correctly linked

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">IPL Ticket Booking</div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/venues">Venues</Link></li>
        {token && <li><Link to="/my-bookings">My Bookings</Link></li>}
      </ul>

      {/* Authentication Links */}
      <div className="auth-links">
        {token ? (
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}>Logout</button>
        ) : (
          <>
            <Link className="login" to="/login">Login</Link>
            <Link className="signup" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

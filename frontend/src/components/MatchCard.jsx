import { Link } from "react-router-dom";

const MatchCard = ({ match }) => {
  // Define inline styles
  const cardStyle = {
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    padding: "15px",
    margin: "15px",
    width: "320px",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  };

  const headingStyle = {
    color: "#007bff",
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const textStyle = {
    color: "#333",
    fontSize: "1rem",
    marginBottom: "5px",
  };

  const buttonStyle = {
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "#ff6600",
    color: "white",
    padding: "10px 14px",
    borderRadius: "5px",
    marginTop: "12px",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "0.3s ease",
  };

  return (
    <div style={cardStyle} className="match-card">
      <h3 style={headingStyle}>
        {match.teamA?.name} 🆚 {match.teamB?.name}
      </h3>
      <p style={textStyle}><strong>Venue:</strong> {match.venue?.name}</p>
      <p style={textStyle}><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</p>
      <p style={textStyle}><strong>Time:</strong> {match.time}</p>

      {/* ✅ Tickets Availability */}
      <p style={textStyle}><strong>Tickets Available:</strong></p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={textStyle}>🎟 VIP: {match.ticketAvailability?.vip ?? 0}</li>
        <li style={textStyle}>🎟 Regular: {match.ticketAvailability?.regular ?? 0}</li>
      </ul>

      <Link to={`/book/${match._id}`} style={buttonStyle} className="book-button">
        🎫 Book Ticket
      </Link>
    </div>
  );
};

export default MatchCard;

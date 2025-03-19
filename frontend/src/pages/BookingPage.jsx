import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/api";

const BookingPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [seatType, setSeatType] = useState("vip");
  const [seats, setSeats] = useState(1);
  const [match, setMatch] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book a ticket!");
      navigate("/login");
    } else {
      setUser(token);
    }
  }, [navigate]);

  useEffect(() => {
    axios.get(`/matches/${matchId}`)
      .then((res) => setMatch(res.data))
      .catch((error) => console.error("Error fetching match:", error));
  }, [matchId]);

  useEffect(() => {
    if (match) {
      setTotalPrice(match.ticketPrice[seatType] * seats);
    }
  }, [seatType, seats, match]);

  const handleCheckout = async () => {
    try {
      if (!user) {
        alert("Please log in first!");
        return;
      }

      const response = await axios.post("http://localhost:3001/api/checkout",{ matchId, seatType, seats, totalPrice
       
       },
        {
          headers: { Authorization: `Bearer ${user}` },
          withCredentials: true,
        }
      );
      console.log("✅ Checkout Response:", response.data);
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      alert("Payment failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div>
      <h2>Book Ticket</h2>
      {match && (
        <>
          <p>Match: {match.teamA?.name} vs {match.teamB?.name}</p>
          <p>Venue: {match.venue?.name}</p>
          <p>Time: {match.time}</p>
          <p>Date: {new Date(match.date).toLocaleDateString()}</p>
        </>
      )}

      <label>Seat Type:</label>
      <select value={seatType} onChange={(e) => setSeatType(e.target.value)}>
        <option value="vip">VIP - ₹{match?.ticketPrice?.vip}</option>
        <option value="regular">Regular - ₹{match?.ticketPrice?.regular}</option>
      </select>

      <label>Number of Seats:</label>
      <input
        type="number"
        value={seats}
        min="1"
        onChange={(e) => setSeats(Number(e.target.value))}
      />

      <h3>Total Price: ₹{totalPrice}</h3>

      <button onClick={handleCheckout}>Proceed to Payment</button>
    </div>
  );
};

export default BookingPage;

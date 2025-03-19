import { useState, useEffect } from "react";
import axios from "../api/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // Don't fetch if user is not logged in

    axios.get("/bookings/my", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, [token]);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Match: {booking.teams[0]?.name} vs {booking.teams[1]?.name}</p>
              <p>Venue: {booking.venue?.name}</p>
              <p>Date: {new Date(booking.match.date).toLocaleDateString()}</p>
              <p>Seat Type: {booking.seatType}</p>
              <p>Seats: {booking.seats}</p>
              <p>Total Price: ₹{booking.totalPrice}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;

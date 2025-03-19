import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/api";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    if (bookingId) {
      axios.put(`/bookings/update-status/${bookingId}`, { status: "confirmed" })
        .then(() => console.log("Booking confirmed"))
        .catch((error) => console.error("Error updating booking:", error));
    }

    setTimeout(() => navigate("/"), 5000);
  }, [bookingId, navigate]);

  return (
    <div className="success-container">
      <h2>🎉 Payment Successful!</h2>
      <p>Your booking is now confirmed.</p>
      <button onClick={() => navigate("/my-bookings")}>View My Bookings</button>
    </div>
  );
};

export default Success;

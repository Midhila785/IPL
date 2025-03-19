import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/api";

const Cancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    if (bookingId) {
      axios.put(`/bookings/update-status/${bookingId}`, { status: "failed" })
        .then(() => console.log("Booking marked as failed"))
        .catch((error) => console.error("Error updating booking:", error));
    }

    setTimeout(() => navigate("/"), 5000);
  }, [bookingId, navigate]);

  return (
    <div className="cancel-container">
      <h2>❌ Payment Failed</h2>
      <p>Your booking could not be completed.</p>
      <button onClick={() => navigate("/")}>Go Back Home</button>
    </div>
  );
};

export default Cancel;

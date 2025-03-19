import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/api";  // Ensure correct API instance

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    country: "IN",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const ticketDetails = location.state?.ticket || {};
  const { matchId, seatType, seats, totalPrice } = ticketDetails;

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!name || !email || totalPrice === 0) return;

      try {
        const response = await axios.post("http://localhost:3001/api/checkout", {
          matchId,
          seatType,
          seats,
          totalPrice,
        });

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setMessage("Payment initiation failed. Try again.");
      }
    };

    createPaymentIntent();
  }, [name, email, totalPrice, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setMessage("Payment system is not ready.");
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name, email, address },
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("Payment successful! Booking confirmed.");
      setTimeout(() => navigate("/mybookings"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Ticket Checkout</h2>
      <p>Match ID: {matchId}</p>
      <p>Seat Type: {seatType}</p>
      <p>Seats: {seats}</p>
      <h3>Total: ₹{totalPrice.toFixed(2)}</h3>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Address</label>
        <input value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} required />

        <label>City</label>
        <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />

        <label>Pincode</label>
        <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} required />

        <label>Country</label>
        <input value="India" disabled />

        <label>Card Details</label>
        <div className="card-section">
          <CardElement options={{ hidePostalCode: true }} />
        </div>

        <button disabled={!stripe || loading || !clientSecret}>
          {loading ? "Processing..." : `Pay ₹${totalPrice.toFixed(2)}`}
        </button>
      </form>

      {message && <div>{message}</div>}
    </div>
  );
};

export default Checkout;

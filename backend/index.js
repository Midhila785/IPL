const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware for regular JSON parsing
app.use(express.json());

// ✅ CORS Configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ✅ Webhook route requires `express.raw()`
app.use("/api/checkout/webhook", express.raw({ type: "application/json" }));

// ✅ Register API Routes
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/venues", require("./routes/venueRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/checkout", require("./routes/checkoutRoutes"));

// ✅ Test API Endpoint
app.get("/", (req, res) => {
  res.send("✅ IPL Booking API is Running...");
});

// ✅ Start Server on Port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//
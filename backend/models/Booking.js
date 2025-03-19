const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }],
  seatType: { type: String, enum: ["vip", "regular"], required: true },
  seats: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["confirmed", "pending","failed"], default: "confirmed" },
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);

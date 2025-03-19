const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  matchNumber: { type: Number, unique: true, required: true },
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  date: { type: Date, required: true },
  time:{ type: String,required: true},
  ticketAvailability: {
    vip: { type: Number, required: true, min: 0 },
    regular: { type: Number, required: true, min: 0 },
  },
  ticketPrice: {
    vip: { type: Number, required: true, min: 0 },
    regular: { type: Number, required: true, min: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model("Match", MatchSchema);

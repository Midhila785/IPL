const express = require("express");
const Booking = require("../models/Booking");
const Match = require("../models/Match");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create a New Booking (Status Initially "Pending")
router.post("/", authMiddleware, async (req, res) => {
    const { matchId, seatType, seats } = req.body;

    try {
        const match = await Match.findById(matchId);
        if (!match) return res.status(404).json({ error: "Match not found" });

        if (match.ticketAvailability[seatType] < seats) {
            return res.status(400).json({ error: "Not enough tickets available" });
        }

        const totalPrice = match.ticketPrice[seatType] * seats;

        // 🔹 Booking is created with "pending" status before payment
        const booking = new Booking({
            user: req.user.id,
            match: matchId,
            venue: match.venue,
            teams: [match.teamA, match.teamB],
            seatType,
            seats,
            totalPrice,
            status: "pending", // 🔹 Mark as "pending" initially
        });

        await booking.save();

        res.status(201).json({ message: "Booking initiated!", booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/my", authMiddleware, async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.id })
        .populate("match")
        .populate("venue", "name")
        .populate("teams", "name");
        
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Error fetching bookings" });
    }
  });

// ✅ Update Booking Status After Payment
router.put("/update-status/:bookingId", authMiddleware, async (req, res) => {
    try {
        const { status } = req.body; // "confirmed" or "failed"
        const booking = await Booking.findById(req.params.bookingId);

        if (!booking) return res.status(404).json({ error: "Booking not found" });

        booking.status = status; // ✅ Update status based on payment result
        await booking.save();

        res.json({ message: `Booking ${status} successfully`, booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const express = require("express");
const Match = require("../models/Match");

const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("teamA", "name")  // Only fetch `name` from `teamA`
      .populate("teamB", "name")  // Only fetch `name` from `teamB`
      .populate("venue", "name"); // Fetch `name` from `venue`

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Get a Single Match by ID
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate("teamA teamB venue");
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ✅ Update All Matches to Ensure `ticketAvailability` & `ticketPrice`
router.put("/update-tickets", async (req, res) => {
  try {
    const result = await Match.updateMany({}, { 
      $set: { 
        "ticketAvailability.vip": 500, 
        "ticketAvailability.regular": 5000,
        "ticketPrice.vip": 2000,
        "ticketPrice.regular": 1000
      } 
    });

    res.json({ message: "All matches updated successfully!", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating matches", error: error.message });
  }
});


// ✅ Update a Specific Match by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedMatch) return res.status(404).json({ message: "Match not found" });

    res.json({ message: "Match updated successfully!", match: updatedMatch });
  } catch (error) {
    res.status(500).json({ message: "Error updating match", error: error.message });
  }
});

// ✅ Delete a Match by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);

    if (!deletedMatch) return res.status(404).json({ message: "Match not found" });

    res.json({ message: "Match deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting match", error: error.message });
  }
});

module.exports = router;

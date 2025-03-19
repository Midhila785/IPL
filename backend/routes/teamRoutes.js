const express = require("express");
const mongoose = require("mongoose");
const Team = require("../models/Team");
const Match = require("../models/Match");

const router = express.Router();

// ✅ Get All Teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Matches by Team ID
router.get("/:teamId/matches", async (req, res) => {
  try {
    const teamId = new mongoose.Types.ObjectId(req.params.teamId);

    const matches = await Match.find({
      $or: [{ teamA: teamId }, { teamB: teamId }]
    }).populate("teamA teamB venue");

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Invalid team ID or internal server error." });
  }
});

module.exports = router;

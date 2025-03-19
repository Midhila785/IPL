const express = require("express");
const Venue = require("../models/Venue");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
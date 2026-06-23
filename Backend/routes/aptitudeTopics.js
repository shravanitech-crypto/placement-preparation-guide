const express = require("express");
const router = express.Router();
const AptitudeTopic = require("../models/AptitudeTopic");

router.get("/", async (req, res) => {
  try {
    const topics = await AptitudeTopic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
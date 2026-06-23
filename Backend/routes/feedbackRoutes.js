const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {

try {

const { name, email, rating, message } = req.body;

const newFeedback = new Feedback({
name,
email,
rating,
message
});

await newFeedback.save();

res.json({ message: "Feedback submitted successfully" });

} catch (error) {
res.status(500).json({ message: "Server Error" });
}

});

module.exports = router;